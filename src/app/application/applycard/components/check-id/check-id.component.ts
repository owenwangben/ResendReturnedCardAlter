import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { FormValidator, WizardService, MyFormControl, VcaptchaService, ErrorPageService, SsoService } from 'app/shared/shared.module';
import { ApplyCardService } from '../../services/applycard.services';

@Component({
	selector: 'app-applycard-check-id',
	templateUrl: './check-id.component.html'
})
export class CheckIdComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;

	constructor(
		private route: ActivatedRoute,
		private vcaptchaService: VcaptchaService,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private ssoService: SsoService,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'IDNumber',
				ErrMsg: '申請人身分證字號為空或格式不正確',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10),
						Validators.required, Validators.pattern('^[a-zA-Z][a-dA-D0-9][0-9]{8}$')
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
		const idNumber = await this.ssoService.getSsoCustId();
		if (idNumber) {
			this.route.data.subscribe(data => {
				data.IDNumber = idNumber;
				this.wizardService.GoToNextStep();
			});
		}

		await this.changeVcaptcha();
	}

	public async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		const value = this.form.value;
		const response = await this.applyCardService.checkId(value.IDNumber, value.Captcha);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.IDNumber = value.IDNumber;
				this.wizardService.GoToNextStep();
			});
		}
	}
}
