import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { CompleteComponent } from './components/complete/complete.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { FilloutTableComponent } from './components/fillout-table/fillout-table.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@Component({
	selector: 'app-credit-refund',
	templateUrl: './credit-refund.component.html',
	styles: []
})
export class CreditRefundComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	step: number = this.current;

	constructor(public pageinfo: PageInfoService) { }

	ngOnInit() {
		this.steps = [
			{ StepName: '選擇退回帳戶', Component: SelectAccountComponent, StepNo: 0 },
			{ StepName: '填寫資料', Component: FilloutTableComponent, StepNo: 1 },
			{ StepName: '再次確認', Component: ConfirmComponent, StepNo: 2 },
			{ StepName: '申請結果', Component: CompleteComponent, StepNo: 3 }
		];
	}

	onWizardCurrentChange(step: number) {
		this.step = step;
	}
}
