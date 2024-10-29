import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SsoService } from 'app/shared/shared.module';
import { StagingSensorsTrack } from 'app/shared/utilities';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-complete',
	templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit {
	Result: TransactionResult;
	StmtRTE: boolean;
	sso = false;
	isMobile = environment.IsMobile;
	private referrer: string;
	private path: string;

	constructor(
		private route: ActivatedRoute,
		private ssoService: SsoService) {
		this.StmtRTE = this.route.snapshot.url[0].path.toUpperCase() !== 'RTE';
	}

	ngOnInit() {
		this.route.data.subscribe(async (data) => {
			this.Result = data.Result;
			this.sso = !!await this.ssoService.getSsoResult();
			this.route.queryParams.subscribe(params => {
				this.referrer = params.Referrer;
				this.path = this.route.snapshot.url[0].path.toUpperCase();
			StagingSensorsTrack("InstallmentResult",data.StagingType,true,"",data.data.InstallmentInfo.Period.toString(),
			data.data.InstallmentInfo.Rate/100,data.data.InstallmentInfo.Fee,undefined,data.data.InstallmentInfo.FirstPeriodAmt,
			data.data.InstallmentInfo.FirstInterest,data.data.InstallmentInfo.LoanAmt);
			});
		});
	}

	onSubmit() {
	}

	onCancel() {
	}

	goStart() {
		// 再做一筆
		const ref = this.referrer ? '?Referrer=' + this.referrer : '';
		if (this.path === "RTE") {
			window.location.href = this.isMobile ? '/m/SinoCard/Transaction/RTE' + ref : '/SinoCard/Transaction/RTE' + ref;
		}
		else {
			window.location.href = this.isMobile ? '/m/SinoCard/Transaction/RTEStmt' + ref : '/SinoCard/Transaction/RTEStmt' + ref;
		}

	}
}
