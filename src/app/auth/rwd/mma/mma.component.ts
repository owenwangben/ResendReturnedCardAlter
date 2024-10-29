import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { SafeUrl } from '@angular/platform-browser';
import { BaseResponse, ErrorPageService, FormValidator, MemoryStorage, MyFormControl, PageInfoService, VcaptchaService } from 'app/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { SensorsTrack } from 'app/shared/utilities';

@Component({
	selector: 'app-auth-mma',
	templateUrl: './mma.component.html'
})
export class AuthMMAComponent implements OnInit {
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;

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
				Name: 'UserId',
				ErrMsg: '使用者代碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'UserPwd',
				ErrMsg: '網路密碼空或格式有誤',
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

	async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		const value = this.form.value;
		value.UserPwd = await this.getEncryptPwd(value.UserPwd);
		value.UserId = await this.getEncryptUserId(value.UserId);
		if (value.UserPwd && value.UserId) {
			const response = await this.authService.verifyMMA(value.ID, value.UserId, value.UserPwd, false, value.Captcha);
			this.doSensorsTrack(response);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.router.navigateByUrl(this.returnUrl);
			}
		}
	}

	doSensorsTrack(response: BaseResponse<TransactionResult>) {
		if (this.storage.CardTitle) {
			const success = response.ResultCode === "00";
			const errMsg = success ? '' : response.ResultMessage;
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType,
				'', '永豐 MMA 網銀會員身分認證', success, errMsg, null);
		}
	}

	async getEncryptPwd(UserPwd: string) {
		const response = await this.authService.e2eGetCert();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const cert = response.Result.Cert;
			const data = UserPwd + response.Result.Timestamp;
			const encryptPwd = CGJSCrypt.PKCS7Encrypt(cert, data, 0);
			return encryptPwd;
		}
		else {
			return null;
		}
	}

	async getEncryptUserId(UserId: string) {
		const response = await this.authService.e2eGetCert();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const cert = response.Result.Cert;
			const data = UserId + response.Result.Timestamp;
			const encryptPwd = CGJSCrypt.PKCS7Encrypt(cert, data, 0);
			return encryptPwd;
		}
		else {
			return null;
		}
	}
}

declare var CGJSCrypt: any;
