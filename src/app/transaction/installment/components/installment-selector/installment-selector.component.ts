import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { StagingSensorsTrack } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import { InstallmentService } from '../../services/installment.service';
import { ViewModels } from '../../services/typings';

@Component({
	selector: 'app-installment-selector',
	templateUrl: './installment-selector.component.html'
})
export class InstallmentSelectorComponent implements OnInit {
	/** 本金 */
	@Input() LoanAmt: number;
	options: ViewModels.InstallmentOption[];
	form: FormGroup;
	isMobile: boolean = environment.IsMobile;
	StmtRTE: boolean;

	constructor(
		private errorPageService: ErrorPageService,
		private route: ActivatedRoute,
		private service: InstallmentService,
		private wizard: WizardService,
		private fb: FormBuilder
	) {
		this.StmtRTE = this.route.snapshot.url[0].path.toUpperCase() !== 'RTE';
		this.form = fb.group({
			SelectedInstallment: [null, Validators.required]
		});
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			const installment: ViewModels.BaseInstallmentData = data.data;
			this.options = installment.InstallmentOptions;
			data.stmtrte = this.StmtRTE ? "帳單分期":"單筆分期"
		});
	}

	async onSubmit($event: UIEvent) {
		if (this.form.invalid === true) {
			this.errorPageService.display("請選擇分期期數", false);
			return;
		}

		const checked: ViewModels.InstallmentOption = this.options[this.form.value.SelectedInstallment];
		this.options.forEach(item => { item.IsChecked = item === checked; });

		const response = await this.service.EasyCashCalcCycleFee(
			this.LoanAmt, checked.Period, checked.Rate, checked.Fee
		);

		//神策數據：事件追踪(信用卡分期)
		if(response.ResultCode == "00" && this.StmtRTE) {
			StagingSensorsTrack("InstallmentStart","帳單分期",true,"");
		}
		else if(response.ResultCode == "00" && !this.StmtRTE) {
			StagingSensorsTrack("InstallmentCalculation","單筆分期",true,"",checked.Period.toString(),checked.Rate/100,checked.Fee);
		}
		else if(response.ResultCode !== "00" && this.StmtRTE){
			StagingSensorsTrack("InstallmentStart","帳單分期",false,response.ResultCode);
		}
		else {
			StagingSensorsTrack("InstallmentCalculation","單筆分期",false,response.ResultCode,checked.Period.toString(),checked.Rate/100,checked.Fee);
		}

		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const items = response.Result.Items;
			this.route.data.subscribe(data => {
				const installment: ViewModels.BaseInstallmentData = data.data;
				installment.TrialResult = items;
				installment.InstallmentInfo = {
					LoanAmt: this.LoanAmt,
					ProgramCode: checked.ProgramCode,
					ProductCode: checked.ProductCode,
					Period: checked.Period,
					Rate: checked.Rate,
					Fee: checked.Fee,
					FirstInterest: +items[0].Interest,
					FirstPeriodAmt: +items[0].PrincipalAmount
				};
				this.wizard.GoToNextStep();
			});
		}
	}

	async onMobileApply(idx: number) {
		if (this.isMobile === false) {
			return;
		}
		this.form.setValue({ SelectedInstallment: idx });
		await this.onSubmit(null);
	}

	goPrev() {
		this.wizard.GoToPrevStep();
	}
}
