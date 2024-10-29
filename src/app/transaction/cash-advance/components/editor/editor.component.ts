import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl, NgModel } from '@angular/forms/';
import { ErrorPageService, FormValidator, MyFormControl, WizardService, SharedService } from 'app/shared/shared.module';
import * as CashAdvance from '../../services/cash-advance.model';
import { templateJitUrl } from '@angular/compiler';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AuthService } from 'app/auth/services/auth.service';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-cash-advance-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
	/**mobile setup */
	public readonly isMobile = environment.IsMobile;
	private formValidator = new FormValidator();
	form: FormGroup;
	data: CashAdvance.CashAdvance;
	bankDisplayName: string;
	branchDisplayName: string;
	mobileNo: string;
	sessionKey: string;
	maskmobileNo: string;
	ShowPinType = true;
	FunctionName = 'cash';
	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private sharedService: SharedService,
		private authService: AuthService,
		private renderer: Renderer2,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'CardNo',
				ErrMsg: '請選擇信用卡',
				Control: new FormControl(
					undefined, Validators.compose([Validators.required])
				)
			},
			{
				Name: 'ExpiryDate',
				ErrMsg: '未選擇有效期限或有效期限不正確',
				Control: new FormControl(
					undefined, Validators.compose([Validators.required])
				)
			},
			{
				Name: 'Amount',
				ErrMsg: '請輸入正確借款金額',
				Control: new FormControl(
					undefined, Validators.compose([Validators.required, Validators.minLength(4)])
				)
			},
			{
				Name: 'TransBankAccount',
				ErrMsg: '轉入帳號資訊未填寫完整或帳號長度有誤',
				Control: new FormControl(
					{ bank: '', branch: '', account: '' }, Validators.compose([Validators.required])
				)
			},
			{
				Name: 'PinType',
				ErrMsg: '請選擇驗證方式',
				Control: new FormControl(
					undefined, Validators.compose([Validators.required])
				)
			},
		];
		this.form = this.formValidator.MakeFormGroup(controls, () => {
			if (this.form.value.Amount > this.data.CashAvailable) {
				this.form.controls['Amount'].setValue('');
				this.renderer.selectRootElement('#Amount').focus();
				errorPageService.display("借款金額不得逾預借現金額度，請重新輸入。", false);
				return false;
			}
			if (this.form.value.Amount > 40000) {
				this.form.controls['Amount'].setValue('');
				this.renderer.selectRootElement('#Amount').focus();
				errorPageService.display("每日上限不得逾40,000元，請重新輸入。", false);
				return false;
			}
			return true;
		});
	}

	async ngOnInit() {
		// get手機號碼
		const response = await this.authService.queryMobile();
		if (this.errorPageService.validateResponse(response)) {
			this.mobileNo = response.Result.Mobile;
			this.sessionKey = response.Result.SessionKey;
		}

		this.route.data.subscribe(data => {
			this.data = data.data;
			const formValue: CashAdvance.ApplyCashAdvanceViewModel = data.form;
			if (formValue) {
				this.form.controls.CardNo.setValue(formValue.CardNo);
				this.form.controls.ExpiryDate.setValue(formValue.ExpiryDate);
				this.form.controls.Amount.setValue(formValue.Amount);
				this.form.controls.TransBankAccount.setValue({
					bank: formValue.TransBankCode,
					branch: formValue.TransBranchCode,
					account: formValue.TransAccount
				});
				this.form.controls.PinType.setValue(formValue.PinType);
			}
			else {
				this.form.controls.CardNo.setValue(undefined);
			}

			this.bankDisplayName = data.bankDisplayName;
			this.branchDisplayName = data.branchDisplayName;

			// check手機號碼是否符合規定
			if (this.mobileNo == null || this.mobileNo.trim().length < 10 || this.data.IsChangeMobileNo) {
				this.ShowPinType = false;
			}
		});
	}

	async onSubmit($event: Event) {
		if (!this.formValidator.Validate()) { return; }

		if (this.form.value.PinType === 2) {
			this.errorPageService.display("<div style='text-align:left'>為使您順利取得簡訊動態密碼，請確認以下事項後再按確定"
				+ "<br>1.您設定接受簡訊動態密碼支手機號碼為" + this.maskMobileNo(this.mobileNo)
				+ "<br>2.目前手機為開機、可接收簡訊、簡訊內容量充足的狀態。</div>", false);
		}
		this.route.data.subscribe(data => {
			const controls = this.form.controls;
			const formValue: CashAdvance.ApplyCashAdvanceViewModel = {
				CardNo: controls.CardNo.value,
				ExpiryDate: controls.ExpiryDate.value,
				Amount: controls.Amount.value,
				TransAccount: controls.TransBankAccount.value.account,
				TransBranchCode: controls.TransBankAccount.value.branch,
				TransBankCode: controls.TransBankAccount.value.bank,
				PinType: controls.PinType.value,
				IsSinoPacAccountAvailable: controls.TransBankAccount.value.isSinoPacAccountAvailable
			};

			if (!this.ShowPinType) {
				formValue.PinType = 1;
			}
			data.form = formValue;
			data.MobileNo = this.mobileNo;
			data.SessionKey = this.sessionKey;
			data.bankDisplayName = this.bankDisplayName;
			data.branchDisplayName = formValue.TransBranchCode && this.branchDisplayName;
			this.wizardService.GoToNextStep();
		});
	}
	/**遮蓋手機號碼 */
	maskMobileNo(value: any, args?: any) {
			const pattern = /(\d{4})-?(\d{3})-?(\d{3})/;
			const replace = '$1xxx$3';
			return value ? value.replace(pattern, replace) : value;
	}
}
