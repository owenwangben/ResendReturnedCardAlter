import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ErrorPageService, FormValidator, MyFormControl, WizardService, VcaptchaService } from 'app/shared/shared.module';
import { RedemptionService } from '../../../services/redemption.services';
import { SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-reward-redemption-verification',
	templateUrl: './verification.component.html'
})
export class VerificationComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;

	constructor(
		private route: ActivatedRoute,
		private vcaptchaService: VcaptchaService,
		private wizardService: WizardService,
		private redemptionService: RedemptionService,
		private errorPageService: ErrorPageService
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
				Name: 'birthday',
				ErrMsg: '出生年月日為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
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
		await this.changeVcaptcha();
	}

	async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
		// this.vcaptchaUrl = '/mma8/card/images/code.jpg';
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		const response = await this.redemptionService.RedeemRewardProducts(
			this.form.value.id, this.form.value.birthday, this.form.value.captcha, null
		);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.Result = response.Result;
				this.redemptionService.ClearCart();
				this.wizardService.GoToNextStep();
			});
		}
	}
}
