import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { ActivityRegisteredInquiryService } from "../registered-inquiry.services";

@Component({
	selector: 'app-registered-inquiry-input',
	templateUrl: './input.component.html',
})

export class InputComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	IsMobile = environment.IsMobile;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private registeredInquiryService: ActivityRegisteredInquiryService,
		private errorPageService: ErrorPageService
	) {
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
				Name: 'captcha',
				ErrMsg: '驗證碼為空或格式有誤',
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

	ngOnInit() {
		this.route.data.subscribe(async data => {
			if (data.data) {
				const response = await this.registeredInquiryService.getData(null, '');
				if (this.errorPageService.validateResponse(response, { redirect: true })) {
					data.data = response.Result;
					this.wizardService.GoToNextStep();
				}
			}
		});
	}

	onClear() {
		this.form.reset();
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		const response = await this.registeredInquiryService.getData(
			this.form.value.idNumber, this.form.value.captcha
		);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => data.data = response.Result);
			this.wizardService.GoToNextStep();
		}
	}
}
