import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { StagingSensorsTrack } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import { InstallmentService } from '../../services/installment.service';
import { ViewModels, TransactionDetail } from '../../services/typings';

@Component({
	selector: 'app-choose-transaction',
	templateUrl: './choose-transaction.component.html',
})
export class ChooseTransactionComponent implements OnInit {
	transactions: TransactionDetail[];
	transactionDetail: TransactionDetail = null;
	readonly isMobile = environment.IsMobile;

	constructor(
		private errorPageService: ErrorPageService,
		private route: ActivatedRoute,
		private service: InstallmentService,
		private wizardService: WizardService
	) {
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			const installment: ViewModels.InstallmentData = data.data;
			this.transactions = installment && installment.Transactions;
		});
	}

	async OnApply(transaction: TransactionDetail) {
		if (transaction && transaction.IsAlreadyInstallment) {
			this.errorPageService.display("此筆交易已分期", false);
			return;
		}
		const index: number = this.transactions.indexOf(transaction);
		const response = await this.service.InstallmentApplyCheck(transaction);

		//神策數據：事件追踪(信用卡分期)
		if(response.ResultCode == "00") {
			StagingSensorsTrack("InstallmentStart","單筆分期",true,"");
		}
		else {
			StagingSensorsTrack("InstallmentStart","單筆分期",false,response.ResultCode);
		}

		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const options = response.Result.Items.map(item => <ViewModels.InstallmentOption> {
				ProductCode: item.ProductCode,
				Period: item.Period,
				Rate: item.Rate,
				Fee: +item.FirstAmt,
				ProgramCode: item.ProgramCode,
				IsChecked: false
			});

			this.route.data.subscribe(data => {
				const installment: ViewModels.InstallmentData = data.data;
				installment.ApplyIndex = index;
				installment.InstallmentOptions = options;
				this.wizardService.GoToNextStep();
			});
		}
	}
}
