import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { BaseResponse, ErrorPageService, FormValidator, MemoryStorage, MyFormControl, PageInfoService, SessionStorage, VcaptchaService } from 'app/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { SensorsTrack } from 'app/shared/utilities';
import { ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';

@Component({
	selector: 'app-auth-account',
	templateUrl: './account.component.html'
})
export class AuthAccountComponent implements OnInit {
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	public code: number; // 若為1要檢核全行IP
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private vcaptchaService: VcaptchaService,
		private authService: AuthService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
	) {
		this.route.queryParams.subscribe(params => this.returnUrl = params.return);
		this.route.params.subscribe(params => this.code = +params.code);

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
				Name: 'Account',
				ErrMsg: '永豐銀行存款帳號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
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

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	public async ngOnInit() {
		await this.changeVcaptcha();
	}

	public async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	public async submit() {
		if (!this.formValidator.Validate()) { return; }
		// 全行IP檢查 (線上辦卡)
		if (this.code === 1) {
			if (await this.checkMMALimitIntranetUsage(this.form.value.idNumber)){
				return;
			}
		}
		const value = this.form.value;
		const response = await this.authService.verifyAccount(value.ID, value.DOB, value.Account, false, value.Captcha);
		this.doSensorsTrack(response);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.session.SetValue({
				Auth1:"知識詢問+OTP",
				Auth2:"本行存戶"
			} as ApplyInfoLogRequestModel);
      sessionStorage.setItem("ApplyCardIntl.DOB", value.DOB);
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

	doSensorsTrack(response: BaseResponse<TransactionResult>) {
		if (this.storage.CardTitle) {
			const success = response.ResultCode === "00";
			const errMsg = success ? '' : response.ResultMessage;
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType,
				'', '永豐存款戶身分認證', success, errMsg, null);
		}
	}
}
