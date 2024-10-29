import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { EditorComponent } from "./components/editor/editor.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { CompleteComponent } from "./components/complete/complete.component";
import { AgreementComponent } from './components/agreement/agreement.component';

@Component({
	selector: 'app-estatement-change',
	templateUrl: './estatement-change.component.html'
})
export class EStatementChangeComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor(public pageinfo: PageInfoService) {}

	ngOnInit() {
		this.steps = [
			{ StepName: '設定資料', Component: EditorComponent, StepNo: 0 },
			{ StepName: '', Component: AgreementComponent, StepNo: 0 },
			{ StepName: '再次確認', Component: ConfirmComponent, StepNo: 1 },
			{ StepName: '設定結果', Component: CompleteComponent, StepNo: 2 }
		];
	}
}
