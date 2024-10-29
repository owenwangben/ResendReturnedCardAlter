import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';
import { CalCycleFeeECModel, ApplyECModel } from "../../services/easy-choice.model";

@Component({
	selector: 'app-easy-choice-editor',
	templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
	private formValidator = new FormValidator();
	form: FormGroup;
	calCycleFeeECModel: CalCycleFeeECModel;
	applyECModel: ApplyECModel;
	bankDisplayName: string;
	branchDisplayName: string;
	FunctionName = 'easy';

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private changeDetector: ChangeDetectorRef) {

		const controls: Array<MyFormControl> = [
			{
				Name: 'TransBankAccount',
				ErrMsg: '轉入帳號資訊未填寫完整或帳號長度有誤',
				Control: new FormControl(
					{
						bank: null,
						branch: null,
						account: null,
					},
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
		// [(bank)]="applyECModel.BankCode"
		// [(branch)]="applyECModel.BranchCode"
		// [(account)]="applyECModel.BankAccount">
		this.route.data.subscribe(data => {
			this.calCycleFeeECModel = data.calCycleFeeECModel;
			this.applyECModel = data.applyECModel;
			this.form.controls.TransBankAccount.setValue({
				bank: this.applyECModel.BankCode || '',
				branch: this.applyECModel.BranchCode || '',
				account: this.applyECModel.BankAccount || ''
			});
			this.bankDisplayName = data.bankDisplayName;
			this.branchDisplayName = data.branchDisplayName;
		});
	}

	onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		this.route.data.subscribe(data => {
			const TransBankAccount = this.form.controls.TransBankAccount.value;
			data.applyECModel.BankCode = TransBankAccount.bank;
			data.applyECModel.BranchCode = TransBankAccount.branch;
			data.applyECModel.BankAccount = TransBankAccount.account;
			data.bankDisplayName = this.bankDisplayName;
			data.branchDisplayName = this.branchDisplayName;
			this.wizardService.GoToNextStep();
		});
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}
}
