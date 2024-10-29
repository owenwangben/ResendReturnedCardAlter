import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, VcaptchaService, MemoryStorage, SharedService, SessionStorage } from 'app/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { environment } from 'environments/environment';
import { ApplyCardPushGTM, ApplyCardPageName, SensorsTrack, GetQueryParam, IsValidRocId, OpenLightbox } from 'app/shared/utilities';
import { ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';

@Component({
  selector: 'app-quickaccount',
  templateUrl: './quickaccount.component.html'

})
export class AuthQuickaccountComponent implements OnInit {
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	public isMobile = environment.IsMobile;
	public cardface: string;
	public personalDataTermsUrl = '';
	public prodtype:　string;
	public id:　string;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private vcaptchaService: VcaptchaService,
		private authService: AuthService,
		private errorPageService: ErrorPageService,
		private sharedService: SharedService,
		private storage: MemoryStorage
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
			this.cardface = GetQueryParam(this.returnUrl, "CardFace");
			this.prodtype = GetQueryParam(this.returnUrl, "prodtype");
			this.id = GetQueryParam(this.returnUrl, "id");

			if (this.cardface === null) {
				this.cardface = this.storage.CardFace;
			};
		});

		const controls: Array<MyFormControl> = [
			{
				Name: 'ID',
				ErrMsg: '身分證字號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z]{1}[1-2]{1}[0-9]{8}$')
					])
				)
			},
			{
				Name: 'DOB',
				ErrMsg: '出生年月日為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'Captcha',
				ErrMsg: '驗證碼為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls, () => {
			this.form.controls.ID.setValue(this.form.value.ID.toUpperCase());
			if (!IsValidRocId(this.form.value.ID)) {
				this.errorPageService.display("身分證檢查碼有誤", false);
				return false;
			}

			return true;
		});
	}

	public async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.雲端開戶身分認證, this.storage.ApplyCardSource);
		const response = await this.sharedService.ApplyCardTermsUrl();
		if (response.ResultCode === "00") {
			this.personalDataTermsUrl = response.Result.PersonalDataTermsUrl;
		}
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
		const response = await this.authService.verifyQuickaccount( 2 ,value.ID, value.DOB, false, value.Captcha, this.cardface, +this.prodtype);
		if (response.ResultCode === "00" && (response.Result.CifType === 2 || response.Result.CifType === 3 )) {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'雲端開戶辦卡', true);
			this.storage.CifType = response.Result.CifType.toString();
			this.errorPageService.confirm("您已為永豐客戶，請至線上辦卡網頁申請辦卡", "立即申辦", null, async (ok) => {
				if (ok) {
					this.router.navigateByUrl("/Application/ApplyCard?Branch=BANKQA&CardFace="+this.cardface);
				}
			});
		}
		else if (response.ResultCode === "00" && response.Result.CifType == 5 ) {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'雲端開戶辦卡', true);
			this.storage.MobileNo = response.Result.Mobile;
			this.storage.SessionKey = response.Result.SessionKey;
			this.storage.CifType = response.Result.CifType.toString();
      sessionStorage.setItem("ApplyCardIntl.DOB", value.DOB);
			this.session.SetValue({
				Auth1:"知識詢問+OTP",
				Auth2:"本行存戶",
			} as ApplyInfoLogRequestModel);
			this.router.navigateByUrl(this.returnUrl);
		}
		else if (response.ResultCode === "U4") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'雲端開戶辦卡', false, '您尚未完成雲端開戶');
			this.errorPageService.confirm("此為雲端開戶專用網址，一般辦卡請點我", "線上辦卡", null, (ok) => {
				if (ok) {
					this.router.navigateByUrl("/Application/ApplyCard?Branch=BANKQA&CardFace="+this.cardface);
				}
			});
		}
		else {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'雲端開戶辦卡', false, response.ResultMessage);
			this.errorPageService.display(response.ResultMessage, false);
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

