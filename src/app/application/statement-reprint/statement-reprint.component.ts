import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StatementReprintRequestModel, StatementReprintInfoResultModel } from "./statement-reprint.models";
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService } from 'app/shared/shared.module';
import { StatementReprintService } from "./statement-reprint.services";

@Component({
	selector: 'app-statement-reprint',
	templateUrl: './statement-reprint.component.html'
})

export class StatementReprintComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public model: StatementReprintInfoResultModel;
	public billMonths: string[];

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private statementRemailService: StatementReprintService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'BillDate',
				ErrMsg: '請選擇帳單期別',
				Control: new FormControl(undefined, Validators.required)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async GetInfo(billDateYYYYMM: string) {
		this.model = null;
		const response = await this.statementRemailService.GetInfo(billDateYYYYMM);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.model = response.Result;
			if (billDateYYYYMM === "") {
				this.billMonths = this.model.BillMonthList;
				const billMonth = this.model.BillMonth.substring(0, 4) + "/" + this.model.BillMonth.substring(4, 6);
				this.form.controls.BillDate.setValue(billMonth);
			}
		}
	}

	async ngOnInit() {
		this.GetInfo("");
	}

	onChange($event) {
		this.GetInfo($event.target.value.replace("/", ""));
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		const response = await this.statementRemailService.Reprint(this.form.value.BillDate);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.errorPageService.display("補寄成功！", false);
		}
	}
}
