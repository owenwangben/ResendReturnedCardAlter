import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { GetLanguage, LocaleMessages } from "app/application/applycard-intl/shared/LocaleMessages";
import { ApplyInfoLogRequestModel } from "app/application/applycard/services/applycard.models";
import { AuthService } from "app/auth/services/auth.service";
import { ErrorPageService, FormValidator, MemoryStorage, MyFormControl, PageInfoService, SessionStorage, SharedService, VcaptchaService
} from "app/shared/shared.module";
import { ApplyCardPageName, ApplyCardPushGTM, OpenLightbox, SensorsTrack } from "app/shared/utilities";
import * as moment from 'moment';

@Component({
	selector: "app-applycard-intl-auth-card-or-account",
	templateUrl: "./card-or-account.component.html",
})
export class AuthCardOrAccountIntlComponent implements OnInit {
	private source: number;
	private prodtype: number;
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	public personalDataTermsUrl = '';
	language: string = GetLanguage();
	message = LocaleMessages[this.language].CardOrAccount;
	btnMessage = LocaleMessages[this.language].Button;
	MasterTitle = LocaleMessages[this.language].shard.Title.AccountVer;
	exceedDay = 180 ;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private vcaptchaService: VcaptchaService,
		private authService: AuthService,
		private errorPageService: ErrorPageService,
		private sharedService: SharedService,
		private storage: MemoryStorage,
		) {
			this.route.queryParams.subscribe(params => {
				const src = +params.source;
				this.source = !isNaN(src) ? src : 0;
				this.returnUrl = params.return;
				this.prodtype = 8;
			});
			const expDate = new Date(new Date().setDate(new Date().getDate() + this.exceedDay));
			const max_ed = expDate.getFullYear() * 10000 + (expDate.getMonth() + 1) * 100 + expDate.getDate();
			const controls: Array<MyFormControl> = [
				{
					Name: 'ID',
					ErrMsg: this.message.ErrMsg.ID + '<br>居留證統一證號為空或格式有誤',
					Control: new FormControl(
						undefined,
						Validators.compose([
							Validators.required, Validators.minLength(10)
						])
					)
				},
				{
					Name: 'DOB',
					ErrMsg: this.message.ErrMsg.DOB + '<br>出生年月日為空或格式有誤',
					Control: new FormControl(
						undefined,
						Validators.compose([
							Validators.required, Validators.minLength(8)
						])
					)
				},
				{
					Name: 'PeriodOfStay',
					ErrMsg: this.message.ErrMsg.Less180Day + '<br>您無法申辦因居留期限少於180天',
					Control: new FormControl(
						undefined,
						Validators.compose([
							Validators.required, Validators.minLength(8), Validators.min(max_ed)
						])
					),
					RedirectURL: 'https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/excellence-business-card-only-foreigner.html',
				},
				{
					Name: 'Captcha',
					ErrMsg: this.message.ErrMsg.VerError + '<br>驗證碼為空或格式錯誤',
					Control: new FormControl(
						undefined,
						Validators.compose([
							Validators.required, Validators.minLength(6)
						])
					)
				}
			];
			this.form = this.formValidator.MakeFormGroup(controls);
		}

	public async ngOnInit() {
		$('body').addClass('bilingual-version');

		this.route.params.subscribe(async params => {
			const response = await this.sharedService.ApplyCardTermsUrl(params.lang);
			if (response.ResultCode === "00") {
				this.personalDataTermsUrl = response.Result.PersonalDataTermsUrl;
			}
		});

		this.pageinfo.name = "永豐存戶身分認證";
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.卡友或存戶身份認證,
			this.storage.ApplyCardSource);

		await this.changeVcaptcha();
	}

	public async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	public async submit() {
		if (!this.formValidator.Validate()) { return; }
		if (await this.checkMMALimitIntranetUsage(this.form.value.ID.toUpperCase())) {
			return;
		}
		const value = this.form.value;
		const response = await this.authService.verifyCardOrAccount(this.source, this.prodtype, value.ID, value.DOB, false, value.Captcha);
		const errMsg = this.message.ResultMessage[response.ResultCode] ?
			this.message.ResultMessage[response.ResultCode] + '<br>' + response.ResultMessage : response.ResultMessage;
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg })) {
			sessionStorage.setItem("ApplyCardIntl.ArcExpireDate", value.PeriodOfStay);
			sessionStorage.setItem("ApplyCardIntl.DOB", value.DOB);
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType,
			'永豐卡友/存戶', '', true, '');
			this.session.SetValue({
				Auth1:"知識詢問+OTP",
				Auth2:response.Result.IsBankUser ? "本行存戶":"本行卡友"
			} as ApplyInfoLogRequestModel);
			this.router.navigateByUrl(this.returnUrl);
		}
	}

	async checkMMALimitIntranetUsage(id: string) {
		const auth = await this.authService.QueryMMALimitIntranetUsage(id);
		if (this.errorPageService.validateResponse(auth, { redirect: false })) {
			if (auth.Result.Status) {
				this.errorPageService.display("依行內政策禁止行員代理他人申辦", false);
				return true;
			}
			else {
				return false;
			}
		}
		return true;
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}
}
