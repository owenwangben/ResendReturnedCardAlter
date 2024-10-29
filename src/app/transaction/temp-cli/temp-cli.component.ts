import { Component, OnInit } from '@angular/core';
import { WizardStep, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { EditorComponent } from './components/editor/editor.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';

@Component({
	selector: 'app-temp-cli',
	templateUrl: './temp-cli.component.html'
})
export class TempCLIComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	isMobile = environment.IsMobile;

	constructor(
		public pageinfo: PageInfoService
	) { }

	ngOnInit() {
		this.steps = [
			{ StepName: '填寫資料', Component: EditorComponent },
			{ StepName: '再次確認', Component: ConfirmComponent },
			{ StepName: '申請結果', Component: CompleteComponent }
		];
	}
}
