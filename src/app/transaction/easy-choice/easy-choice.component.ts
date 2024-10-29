import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { CalculationComponent } from "./components/calculation/calculation.component";
import { CalResultComponent } from "./components/cal-result/cal-result.component";
import { AgreementComponent } from './components/agreement/agreement.component';
import { EditorComponent } from "./components/editor/editor.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { CompleteComponent } from "./components/complete/complete.component";

@Component({
	selector: 'app-easy-choice',
	templateUrl: './easy-choice.component.html'
})
export class EasyChoiceComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	IsMobile = environment.IsMobile;

	constructor(public pageinfo: PageInfoService) {
	}

	ngOnInit() {
		if (environment.IsMobile) {
			this.steps = [
				{ StepName: '', Component: CalculationComponent, StepNo: 0 },
				{ StepName: '', Component: CalResultComponent, StepNo: 0 },
				{ StepName: '', Component: AgreementComponent, StepNo: 0 },
				{ StepName: '填寫資料', Component: EditorComponent, StepNo: 0 },
				{ StepName: '再次確認', Component: ConfirmComponent, StepNo: 1 },
				{ StepName: '申請結果', Component: CompleteComponent, StepNo: 2 }
			];
		}
		else {
			this.steps = [
				{ StepName: '本息試算', Component: CalculationComponent },
				{ StepName: '試算結果', Component: CalResultComponent },
				{ StepName: '同意條款', Component: AgreementComponent },
				{ StepName: '填寫資料', Component: EditorComponent },
				{ StepName: '再次確認', Component: ConfirmComponent },
				{ StepName: '申請結果', Component: CompleteComponent }
			];
		}
	}
}
