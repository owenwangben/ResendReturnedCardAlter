import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { FormValidator, MyFormControl, VcaptchaService, ErrorPageService } from 'app/shared/shared.module';
import { BonusService } from '../../services/bonus.services';

@Component({
	selector: 'app-reward-bonus2018q1-verification',
	templateUrl: './verification.component.html'
})
export class VerificationComponent implements OnInit {
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private vcaptchaService: VcaptchaService,
		private bonusService: BonusService,
		private errorPageService: ErrorPageService
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
		});

		const controls: Array<MyFormControl> = [
			{
				Name: 'idNumber',
				ErrMsg: '身分證字號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'birthday',
				ErrMsg: '生日為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required,
					])
				)
			},
			{
				Name: 'captcha',
				ErrMsg: '驗證碼為空或格式有誤',
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

	public async ngOnInit() {
		await this.changeVcaptcha();
	}

	async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		const value = this.form.value;
		const response = await this.bonusService.Verify(value.idNumber, value.birthday, value.captcha);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			sessionStorage.setItem("BONUS2018Q1.ID", value.idNumber);
			this.router.navigateByUrl(this.returnUrl);
		}
	}
}
