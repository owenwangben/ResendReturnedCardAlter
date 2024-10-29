import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';
import { CardActivationService } from "./cardactivation.services";
import { ActivateCardRequestModel } from './cardactivation.models';
import * as moment from 'moment';

@Component({
	selector: 'app-cardactivation-input',
	templateUrl: './cardactivation-input.component.html'
})
export class CardActivationInputComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public expriedMonthList: string[] = [];
	public expriedYearList: string[] = [];
	public defDate: string;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private cardActivationService: CardActivationService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'cardNo',
				ErrMsg: '卡號為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(15)
					])
				)
			},
			{
				Name: 'expiryDate',
				ErrMsg: '請選擇有效期限',
				Control: new FormControl(
					undefined, Validators.compose([Validators.required])
				)
			},
			{
				Name: 'birthday',
				ErrMsg: '持卡人生日為空或格式錯誤',
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
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
		this.defDate = moment().add(-30, 'years').format('YYYYMMDD');
	}

	ngOnInit() {
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		const model: ActivateCardRequestModel = {
			CardNo: this.form.value.cardNo,
			ValidDate_MMYY: this.form.value.expiryDate,
			BOD_YYYYMMDD: this.form.value.birthday,
			captcha: this.form.value.captcha
		};
		const response = await this.cardActivationService.activateCard(model);
		// const errmsg = "開卡失敗 (提醒您，網路開卡操作錯誤，可洽客服由專人協助您開卡，客服專線(02)2528-7776。)，請檢查輸入的資料。"
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => data.result = response.Result);
			this.wizardService.GoToNextStep();
		}
	}
}
