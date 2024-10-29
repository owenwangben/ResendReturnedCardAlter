import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { EditorComponent } from "./components/editor/editor.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { CompleteComponent } from "./components/complete/complete.component";

@Component({
	selector: 'app-debit-card-set-notify',
	templateUrl: './debit-card-set-notify.component.html'
})
export class DebitCardSetNotifyComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor(
		public pageinfo: PageInfoService) { }

	ngOnInit() {
		this.steps = [
			{ StepName: '設定資料', Component: EditorComponent, StepNo: 0 },
			{ StepName: '再次確認', Component: ConfirmComponent, StepNo: 1 },
			{ StepName: '設定結果', Component: CompleteComponent, StepNo: 2 }
		];
	}
}
