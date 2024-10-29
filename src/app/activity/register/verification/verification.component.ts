import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ErrorPageService, FormValidator, MyFormControl, VcaptchaService, WizardService } from 'app/shared/shared.module';
import { ActivityRegisterService } from '../register.services';
import { sha256 } from 'js-sha256';

@Component({
	selector: 'app-activity-register-verification',
	templateUrl: './verification.component.html'
})
export class VerificationComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public activityCode: string;
	public activityName: string;
	public registeredCount: number;
	public IsVipActivity: boolean;
	public IsInstallmentActivity: boolean;
	public vcaptchaUrl: SafeUrl | string;
	public formValue;
	private checkCaptchaHash: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private activityRegisterService: ActivityRegisterService,
		private vcaptchaService: VcaptchaService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'id',
				ErrMsg: '身分證字號為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10)
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
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		this.route.data.subscribe(data => {
			this.activityCode = data.data.Code;
			this.activityName = data.data.Name;
			this.registeredCount = data.data.Count;
			this.IsVipActivity = data.data.IsVipActivity;
			this.IsInstallmentActivity = data.data.IsInstallmentActivity;
			this.formValue = this.activityRegisterService.restoreFormValue();
			if (this.formValue) {
				this.activityRegisterService.clearFormValue();
				this.form.patchValue(this.formValue);
				// this.submit();
			}
		});
		await this.changeVcaptcha();
	}

	async changeVcaptcha() {
		const code = 1;
		const response = await this.vcaptchaService.getVcaptchaData(code);
		const hash = sha256("EaWZCMJ4b3wb6u2" + response.Header.ReferenceNo);
		this.checkCaptchaHash = sha256("2FGRvzFdbAPuM6U" + hash);

		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl(code, hash);
	}

	async hasAgreement() {
		const response = await this.activityRegisterService.GetInstallmentAgreementStatus(this.form.value.id);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			return response.Result.IsSigned;
		}
		return false;
	}

	async checkVIP() {
		const response = await this.activityRegisterService.CheckVIP(
			this.activityCode, this.form.value.id, this.form.value.captcha, this.checkCaptchaHash
		);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.form = this.form;
				// data.contentHtml = new Buffer(response.Result.Html, 'base64').toString('utf8');
				data.contentHtml = Buffer.from(response.Result.Html, "base64").toString("utf8");
				data.checkCaptchaHash = this.checkCaptchaHash;
			});
			this.wizardService.GoToNextStep();
		}
		else {
			await this.changeVcaptcha();
		}
	}

	async register() {
		const response = await this.activityRegisterService.Register(this.activityCode, this.form.value.id, this.form.value.captcha,
			this.checkCaptchaHash);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.seq = response.Result.Seq;
        data.isApplyElectronicBill = response.Result.IsApplyElectronicBill;
			});
			this.wizardService.GoToNextStep();
		}
		else {
			await this.changeVcaptcha();
		}
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }

		if (this.IsInstallmentActivity && !await this.hasAgreement()) {
			this.errorPageService.display("您未簽訂消費分期約定事項，請您立即詳閱「消費分期約定事項」，才能登錄此活動。", false, () => {
				this.activityRegisterService.storeFormValue({ id: this.form.value.id });
				this.router.navigate(["/Transaction/RTEAgreement"], { queryParams: { return: this.router.url } });
			});
			return;
		}

		if (this.IsVipActivity) {
			await this.checkVIP();
		}
		else {
			await this.register();
		}
	}
}
