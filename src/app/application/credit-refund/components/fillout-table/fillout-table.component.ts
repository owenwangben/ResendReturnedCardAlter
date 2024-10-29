import { Component, OnInit } from '@angular/core';
import { WizardService, SharedService, MyFormControl, FormValidator, ErrorPageService } from 'app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { CreditRefundGetDataResultModel, CanRefundBanks, CreditRefundApplyRequestModel } from '../../credit-refund-models';
import { BankViewModel, BankBranchViewModel, AuthOtherBankAccountRequestModel } from 'app/shared/shared.models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-fillout-table',
	templateUrl: './fillout-table.component.html',
	styles: []
})
export class FilloutTableComponent implements OnInit {
	public model: CreditRefundGetDataResultModel;
	public accountType: number;
	public Banks: BankViewModel[];
	public Branches: BankBranchViewModel[] = [];
	public BankAccount: FormGroup;
	private isBranchListLoading = false;
	private formValidator = new FormValidator();
	public form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private sharedService: SharedService
	) {
		this.route.data.subscribe(data => {
			this.model = data.data;
			this.accountType = data.AccountType;

			const controls: Array<MyFormControl> = [
				{
					Name: 'bank',
					ErrMsg: '請選擇銀行',
					Control: new FormControl('',
						Validators.compose([
							Validators.required
						])
					)
				},
				{
					Name: 'branch',
					ErrMsg: '請選擇分行',
					Control: new FormControl('',
						Validators.compose([
							Validators.required
						])
					)
				},
				{
					Name: 'account',
					ErrMsg: '請輸入存款帳號',
					Control: new FormControl('',
						Validators.compose([
							Validators.required
						])
					)
				},
				{
					Name: 'agree',
					ErrMsg: '同意事項未勾選',
					Control: new FormControl('',
						Validators.compose([
							Validators.requiredTrue
						])
					)
				},
				{
					Name: 'agree2',
					ErrMsg: '同意事項未勾選',
					Control: new FormControl('',
						Validators.compose([
							Validators.requiredTrue
						])
					)
				}
			];
			this.form = this.formValidator.MakeFormGroup(controls, () => {
				if (this.form.value.bank) {
					const bank = this.Banks.find(item => item.BankCode === this.form.value.bank);
					const bankLong = bank.BankLong.split(',');
					for (const long of bankLong) {
						if (this.form.value.account.length === +long) {
							return true;
						}
					}
					this.errorPageService.display("轉入帳號長度有誤", false);
					return false;
				}
				return true;
			});
			this.form.controls.bank.valueChanges.subscribe($event => {
				this.bankChanged($event);
				this.form.controls.branch.setValue('');
			});
			this.form.controls.branch.valueChanges.subscribe($event => this.branchChanged($event));
		});
	}

	async ngOnInit() {
		this.route.data.subscribe(async data => {
			this.Banks = await this.sharedService.GetBankList();
			this.Banks = this.Banks.filter(x => CanRefundBanks.find(item => item === x.BankCode));
			this.form.controls.bank.setValue('');
			this.form.controls.branch.setValue('');
			if (data.applyinfo) {
				const applyinfo: CreditRefundApplyRequestModel = data.applyinfo;
				this.form.controls.bank.setValue(applyinfo.TransBankCode);
				this.form.controls.branch.setValue(applyinfo.TransBranchCode);
				this.form.controls.account.setValue(applyinfo.TransAccount);
			}
			else {
				this.form.controls.account.setValue('');
			}
		});
	}

	async bankChanged($event) {
		if ($event && (this.Branches.length === 0 || this.Branches[0].BankCode !== $event)) {
			if (this.isBranchListLoading) { return; }

			try {
				this.isBranchListLoading = true;
				this.Branches = [];
				this.Branches = await this.sharedService.GetBranchList($event);
			}
			finally {
				this.isBranchListLoading = false;
			}
		}
	}

	branchChanged($event) {
		// this.account = '';
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	submit() {
		if (!this.formValidator.Validate()) { return; }

		this.route.data.subscribe(async(data) => {
			const value = this.form.value;
			data.applyinfo = new CreditRefundApplyRequestModel();
			const applyinfo: CreditRefundApplyRequestModel = data.applyinfo;
			applyinfo.TransAccount = value.account;
			applyinfo.TransBankCode = value.bank;
			applyinfo.TransBranchCode = value.branch;
			applyinfo.Agree = value.aggree;

			if (data.AccountType == 1) {
				applyinfo.TransBankCode = "807";
				applyinfo.TransBankName = "807永豐商業銀行";
				applyinfo.TransBranchName = '';
				this.wizardService.GoToNextStep();
			}
			else {
				// 它行銀行帳號驗證
				const model = {
					Type: 1,
					BankCode: applyinfo.TransBankCode,
					Account: applyinfo.TransAccount
				} as AuthOtherBankAccountRequestModel;
				const response = await this.sharedService.authOtherBankAccount(model);
				if (response.ResultCode === "00") {
					const bank = this.Banks.find(x => x.BankCode === applyinfo.TransBankCode);
					if (bank) {
						applyinfo.TransBankName = bank.BankName;
					}

					const branch = this.Branches.find(x => x.BranchCode === applyinfo.TransBranchCode);
					if (branch) {
						applyinfo.TransBranchName = branch.FullName;
					}
					this.wizardService.GoToNextStep();
				}
				else if (response.ResultCode === "E0" || response.ResultCode === "U1") {
					this.errorPageService.display(response.ResultMessage, false);
				}
				else {
					this.errorPageService.display('很抱歉，您的帳號資訊有誤，請再次確認或洽客服電話02-25287776，由專人為您服務。', false);
				}
			}
		});
	}
}
