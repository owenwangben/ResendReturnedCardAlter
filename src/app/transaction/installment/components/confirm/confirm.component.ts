import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { ErrorPageService, WizardService, BaseResponse } from 'app/shared/shared.module';
import { InstallmentService } from '../../services/installment.service';
import { ViewModels } from '../../services/typings';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { StagingSensorsTrack } from 'app/shared/utilities';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
	private data: ViewModels.BaseInstallmentData;
	isMobile = environment.IsMobile;
	private referrer: string;
	StagingType:number;

	constructor(
		private errorPageService: ErrorPageService,
		private route: ActivatedRoute,
		private wizard: WizardService,
		private service: InstallmentService
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.route.queryParams.subscribe(params => {
				this.data = data.data;
				this.referrer = params.Referrer;
			});
		});
	}

	async onSubmit() {
		const factory = [
			async (data: ViewModels.StatementInstallmentData) => {
				return await this.service.ApplyStmtInstallment(
					data.Info.MFPCode,
					data.Info.BaseMFPcode,
					data.Info.StmtDate,
					data.Info.DueDate,
					data.Info.StmtAmt,
					data.Info.StmtMinAmt,
					data.InstallmentInfo.FirstPeriodAmt,
					data.InstallmentInfo.LoanAmt.toString(),
					data.InstallmentInfo.Period,
					data.InstallmentInfo.Rate,
					+data.TrialResult[0].IRR,
					data.InstallmentInfo.Fee,
					this.referrer);
			},
			async (data: ViewModels.InstallmentData) => {
				const transaction = data.Transactions[data.ApplyIndex];
				const info = data.InstallmentInfo;
				return await this.service.InstallmentApply(
					transaction.IsTCTD,
					+transaction.Amount,
					transaction.CardNumber,
					transaction.AuthCode,
					transaction.DeDate,
					transaction.Memo,
					transaction.TransactionDate,
					info.Period,
					info.ProductCode,
					info.ProgramCode,
					info.Rate,
					info.Fee,
					transaction.SalRef,
					this.referrer,
          transaction.MCC || '',
          transaction.TXCUR || '',
          transaction.MerchArea || ''
          );
			}
		];
		this.StagingType = +(this.route.snapshot.url[0].path.toUpperCase() === 'RTE')

		const method: (data: ViewModels.BaseInstallmentData) => Promise<BaseResponse<BaseResult>> =
			factory[this.StagingType];

		const response = await method(this.data);

		//神策數據：事件追踪(信用卡分期)
		if(response.ResultCode == "00") {
			StagingSensorsTrack("InstallmentDoubleCheck",this.StagingType === 0 ? "帳單分期" : "單筆分期",true,"",this.data.InstallmentInfo.Period.toString(),
				this.data.InstallmentInfo.Rate/100,this.data.InstallmentInfo.Fee,undefined,this.data.InstallmentInfo.FirstPeriodAmt,
				this.data.InstallmentInfo.FirstInterest,this.data.InstallmentInfo.LoanAmt);
		}
		else {
			StagingSensorsTrack("InstallmentDoubleCheck",this.StagingType === 0 ? "帳單分期" : "單筆分期",false,response.ResultCode,this.data.InstallmentInfo.Period.toString(),
			this.data.InstallmentInfo.Rate/100,this.data.InstallmentInfo.Fee,undefined,this.data.InstallmentInfo.FirstPeriodAmt,
			this.data.InstallmentInfo.FirstInterest,this.data.InstallmentInfo.LoanAmt);
		}

		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {data.Result = response.Result,data.StagingType = (this.StagingType === 0 ? "帳單分期" : "單筆分期")});
			this.wizard.GoToNextStep();
		}
	}

	ForStagingSensorsTrack() {

	}

	goPrev() {
		this.wizard.GoToPrevStep();
	}
}
