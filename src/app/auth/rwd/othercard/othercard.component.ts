import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { SafeUrl } from '@angular/platform-browser';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService,
	VcaptchaService, SharedService, MemoryStorage, SessionStorage } from 'app/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { OpenLightbox, IsContainsFullWidthChar, IsValidId, ApplyCardPushGTM, ApplyCardPageName, SensorsTrack } from 'app/shared/utilities';
import { ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';
import * as moment from 'moment';
@Component({
	selector: 'app-auth-othercard',
	templateUrl: './othercard.component.html'
})
export class AuthOtherCardComponent implements OnInit {
	private returnUrl: string;
	private returnParams: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	readonly months: string[] = Array.apply(null, { length: 12 }).map((item, idx) => (idx >= 9 ? '' : '0') + (idx + 1));
	readonly thisYear: number = new Date().getFullYear();
	readonly years: number[] = Array.apply(null, { length: 12 }).map((item, idx) => this.thisYear + idx);
	private values = '';
	public bankServiceTermsUrl = '';
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
			this.returnParams = this.returnUrl && this.returnUrl.split('?')[1];
		});
		const controls: Array<MyFormControl> = [
			{
				Name: 'ID',
				ErrMsg: '身分證字號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10)
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
				Name: 'MobileNo',
				ErrMsg: '行動電話號碼為空或格式有誤',
				Control: new FormControl(
					"",
					Validators.compose([
						Validators.required, Validators.minLength(10)
					])
				)
			},
			{
				Name: 'cardNo',
				ErrMsg: '信用卡卡號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(16)
					])
				)
			},
			{
				Name: 'expireDateMM',
				ErrMsg: '請選擇卡片到期月份',
				Control: new FormControl(
					"",
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'expireDateYYYY',
				ErrMsg: '請選擇卡片到期年',
				Control: new FormControl(
					"",
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'captcha',
				ErrMsg: '驗證碼為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'PIIAgreement',
				ErrMsg: '請同意個人資料同意使用條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'IBankAgreement',
				ErrMsg: '請同意個人網路銀行服務條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'OtherCardAuthAgreement',
				ErrMsg: '請同意資料驗證作業',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	public async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.他行信用卡身份認證, this.storage.ApplyCardSource);
		await this.changeVcaptcha();
		const response = await this.sharedService.ApplyCardTermsUrl();
		if (response.ResultCode === "00") {
			this.bankServiceTermsUrl = response.Result.BankServiceTermsUrl;
			this.personalDataTermsUrl = response.Result.PersonalDataTermsUrl;
		};
		this.storage.AuthType = "OtherCard";
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
		if (IsContainsFullWidthChar(value.ID)) {
			this.errorPageService.display("身分證字號請勿輸入全形", false);
			return;
		}
		else if (!IsValidId(value.ID)) {
			this.errorPageService.display("身分證字號請輸入正確格式", false);
			return;
		}
		let sTime = moment().format("YYYYMMDDHHmmss");
		const response = await this.authService.verifyOtherCard(value.ID, value.DOB, value.MobileNo, value.cardNo,
			value.expireDateMM + value.expireDateYYYY.substr(-2), value.captcha );
		if (response.ResultCode === "01") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'他行臺幣帳戶驗證申請', false, '您已是永豐卡友');
			this.openlbox("#cardmember-lbox");
		}
		else if (response.ResultCode === "02") {
			const failure_reason = '驗證失敗，請確認卡片有效及資料正確並重新申請[02]';
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'他行信用卡驗證申請', false, failure_reason);
			this.errorPageService.display(failure_reason, false);
		}
		else if (this.errorPageService.validateResponse(response, { redirect: false })) {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'他行信用卡驗證申請', true, '');
			sessionStorage.setItem("ApplyCardIntl.DOB", value.DOB);
			let vTime = moment().format("YYYYMMDDHHmmss");
			this.session.SetValue({
				Auth1:"聯卡核驗平台+OTP",
				Auth2:"他行信用卡",
				OtherAuthQryDT:sTime,
				OtherAuthRcvDT:vTime
			} as ApplyInfoLogRequestModel);
			this.storage.MobileNo = value.MobileNo;
			this.storage.SessionKey = response.Result.SessionKey;
			this.router.navigateByUrl(this.returnUrl);
		}
	}

	public auth(auth_type: string) {
		let authentication_method = '本行信用卡卡友';
		SensorsTrack('CardApplicationReverificationOption', this.storage.CardTitle, this.storage.CardType, '',
			authentication_method , false, '已是本行卡友重新驗證選擇');
		this.closelbox();
		this.router.navigateByUrl('/Application/ApplyCard/' + auth_type + '?' + this.returnParams);
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

	private closelbox() {
		$('.lboxed').trigger('close');
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}
}