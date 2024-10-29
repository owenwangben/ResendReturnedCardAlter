import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorPageService, WizardService, FormValidator, MyFormControl } from 'app/shared/shared.module';
import { CardInfoInquiryViewModel } from '../../../virtual-card.models';
import { getRandomInt } from 'app/shared/utilities';
import { VirtualCardService } from '../../../virtual-card-service';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styles: []
})
export class InputComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	data: CardInfoInquiryViewModel;
	questionNo: number;
	questions: string[] = ["新台幣帳單繳款方式是否為自動扣款?", "帳單寄送方式是否為電子帳單?", "您申辦卡別是否為VISA卡?"];
	question: string;

	constructor(
		private wizardService: WizardService,
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService,
		private dataService: VirtualCardService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'CardNo',
				ErrMsg: '請選擇卡號',
				Control: new FormControl(undefined, Validators.required)
			},
			{
				Name: 'Answer',
				ErrMsg: '請選擇知識性問答',
				Control: new FormControl(undefined, Validators.required)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
		this.questionNo = getRandomInt(2);
		this.route.data.subscribe(async(data) => {
			this.data = data.data;
			this.questionNo = this.data.IsGreePassCustomer ? 2 : this.questionNo;
		});
		this.question = this.questions[this.questionNo];
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }

		this.route.data.subscribe(async(data) => {
			const cardNos = this.data.Cards.map(it => it.CardNo);
			const response = await this.dataService.QueryVirtualCardInfo(cardNos, this.questionNo + 1, this.form.value.Answer);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.data.CardInfos = response.Result.Items;
				this.data.SelectedCardNo = this.form.value.CardNo;
				data.data = this.data;
				this.wizardService.GoToNextStep();
			}
		});
	}
}
