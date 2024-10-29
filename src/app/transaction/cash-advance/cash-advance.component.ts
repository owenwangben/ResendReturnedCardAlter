import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { EditorComponent } from './components/editor/editor.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';

@Component({
	selector: 'app-cash-advance',
	templateUrl: './cash-advance.component.html'
})
export class CashAdvanceComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor(public pageinfo: PageInfoService) {}

	ngOnInit() {
		this.steps = [
			{ StepName: '填寫資料', Component: EditorComponent  },
			{ StepName: '再次確認', Component: ConfirmComponent  },
			{ StepName: '申請結果', Component: CompleteComponent  }
		];
	}

}
