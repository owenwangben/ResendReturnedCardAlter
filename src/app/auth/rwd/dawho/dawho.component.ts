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
	selector: 'app-auth-dawho',
	templateUrl: './dawho.component.html'
})
export class AuthDawhoComponent implements OnInit {
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	public isMobile = environment.IsMobile;
	public cardface: string;
	public personalDataTermsUrl = '';
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
			this.returnUrl = params.return;
			this.cardface = GetQueryParam(this.returnUrl, "CardFace");
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
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.DAWHO身份認證, this.storage.ApplyCardSource);
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

		const response = await this.authService.verifyDawho(value.ID, value.DOB, false, value.Captcha, this.cardface);
		if (response.ResultCode === "00") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'DAWHO辦卡', true);
			this.session.SetValue({
				Auth1:"知識詢問+OTP",
				Auth2:"本行存戶",
			} as ApplyInfoLogRequestModel);
      sessionStorage.setItem("ApplyCardIntl.DOB", value.DOB);
			this.router.navigateByUrl(this.returnUrl);
		}
		else if (response.ResultCode === "01") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'DAWHO辦卡', false, '您尚未申辦數位帳戶');
			this.errorPageService.confirm("您尚未申辦數位帳戶喔!", "立即開戶", null, (ok) => {
				if (ok) {
					window.location.href = "https://dawho.tw/";
				}
			});
		}
		else if (response.ResultCode === "02") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'DAWHO辦卡', false, '您的數位帳戶未申辦成功');
			const dawhoApplyFailMsg = "您的數位帳戶未申辦成功，請洽銀行客服" +
				(this.isMobile ? "<a style='color: #004d99;' href='tel:0225059999'>02-2505-9999</a>" : "02-2505-9999") + "，謝謝!"
			this.errorPageService.confirm(dawhoApplyFailMsg, "確定", null, (ok) => {
				if (ok) {
					this.router.navigateByUrl("/Application/ApplyCard");
				}
			});
		}
		else if (response.ResultCode === "06") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'DAWHO辦卡', false, '您的帳戶已非數位帳戶噢！');
			this.errorPageService.confirm('您的帳戶已非數位帳戶噢！', "立即開戶", null, (ok) => {
				if (ok) {
					window.location.href = "https://dawho.tw/";
				}
			});
		}
		else {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'DAWHO辦卡', false, response.ResultMessage);
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
