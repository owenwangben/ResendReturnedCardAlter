import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { ErrorPageService, FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';
import { ApplicationStatusService } from "./application-status.services";
import { ApplicationStatusRequestModel, ApplicationStatusResult } from './application-status.models';

@Component({
	moduleId: module.id,
	selector: 'app-application-status-input',
	templateUrl: './application-status-input.component.html',
})

export class ApplicationStatusInputComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;

	public constructor(
		private route: ActivatedRoute,
		private progressService: ApplicationStatusService,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService) {
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
						Validators.pattern('(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])')
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

	ngOnInit() {
		this.route.data.subscribe(async (data) => {
			if (data.data) {
				const response = await this.progressService.getData({ ID: null, birthday: null, captcha: ''});
				if (this.errorPageService.validateResponse(response, { redirect: true })) {
					data.result = response.Result;
					this.wizardService.GoToNextStep();
				}
			}
		});
	}

	public async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		const model: ApplicationStatusRequestModel = {
			ID: this.form.value.idNumber,
			birthday: this.form.value.birthday,
			captcha: this.form.value.captcha
		};
		const response = await this.progressService.getData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.result = response.Result;
				data.result.PID = this.form.value.idNumber;
			});
			this.wizardService.GoToNextStep();
		}
	}
}


