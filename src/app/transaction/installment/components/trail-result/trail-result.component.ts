import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';
import { StagingSensorsTrack } from 'app/shared/utilities';
import { InstallmentService } from '../../services/installment.service';
import { ViewModels, EasyCashCalcCycleFeeItem } from '../../services/typings';

@Component({
	selector: 'app-trail-result',
	templateUrl: './trail-result.component.html'
})
export class TrailResultComponent implements OnInit {
	StmtRTE: string;
	TrailResult: EasyCashCalcCycleFeeItem[];
	Info: ViewModels.InstallmentInfo;
	constructor(
		private route: ActivatedRoute,
		private wizard: WizardService
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			const info: ViewModels.BaseInstallmentData = data.data;
			this.TrailResult = info.TrialResult;
			this.Info = info.InstallmentInfo;
			this.StmtRTE = data.stmtrte;
		});
	}

	goPrev() {
		this.wizard.GoToPrevStep();
	}

	onSubmit() {
		//神策數據：事件追踪(信用卡分期)
		StagingSensorsTrack("InstallmentCalculationResult",this.StmtRTE,true,"",
			this.Info.Period.toString(),this.Info.Rate/100,this.Info.Fee,undefined,undefined,undefined,this.Info.LoanAmt);

		this.wizard.GoToNextStep();
	}
}
