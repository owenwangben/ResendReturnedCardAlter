import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { ECDataResultModel, CalCycleFeeECModel, ApplyECModel } from "../../services/easy-choice.model";

@Component({
	selector: 'app-easy-choice-calculation',
	templateUrl: './calculation.component.html'
})
export class CalculationComponent implements OnInit {
	public easyChoiceDataResultModel: ECDataResultModel;
	public calCycleFeeECModel = new CalCycleFeeECModel();
	public referrer: string;

	public constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService
	) {
		this.route.data.subscribe(data => {
			this.route.queryParams.subscribe(params => {
				this.easyChoiceDataResultModel = data.data;
				this.easyChoiceDataResultModel.CrMaxLimit = '' + +this.easyChoiceDataResultModel.CrMaxLimit;
				this.referrer = params.Referrer;
				console.log("this.referrer= ", this.referrer);
			});
		});

		this.calCycleFeeECModel.LoanAmt = "";
	}

	public async ngOnInit() {
	}

	public setCalCycleFee(value) {
		const record = this.easyChoiceDataResultModel.Items.find(x => x.RateCycle === value);
		if (record) {
			this.calCycleFeeECModel.Period = value;
			this.calCycleFeeECModel.AnnRate = record.FeeRate;
			this.calCycleFeeECModel.ProcessFee = record.Fee;
		}
	}

	private formValidate(): Boolean {
		const loanAmt = +this.calCycleFeeECModel.LoanAmt;
		const maxAmt = +this.easyChoiceDataResultModel.CrMaxLimit;
		if (!loanAmt) {
			this.errorPageService.display("請輸入申請本金", false);
			return false;
		}
		else if (loanAmt % 1000) {
			this.errorPageService.display("申請本金需以仟元為單位", false);
			return false;
		}
		else if (loanAmt < 5000) {
			this.errorPageService.display("申貸本金至少必需為五仟元", false);
			return false;
		}
		else if (loanAmt > maxAmt) {
			this.errorPageService.display("本金輸入金額不得超過系統帶出之可申請「易通財」專案之最高金額", false);
			return false;
		}
		else if (!this.calCycleFeeECModel.AnnRate) {
			this.errorPageService.display("請選擇分期期數", false);
			return false;
		}
		return true;
	}

	public onSubmit() {
		if (!this.formValidate()) { return; }
		this.route.data.subscribe(data => {
			data.Email = this.easyChoiceDataResultModel.Email;
			data.applyECModel = new ApplyECModel();
			data.applyECModel.PCode = this.easyChoiceDataResultModel.PCode;
			data.applyECModel.Period = this.calCycleFeeECModel.Period;
			data.applyECModel.Amount = this.calCycleFeeECModel.LoanAmt;
			data.applyECModel.Referrer = this.referrer;
			data.calCycleFeeECModel = this.calCycleFeeECModel;
			this.wizardService.GoToNextStep();
		});
	}

}
