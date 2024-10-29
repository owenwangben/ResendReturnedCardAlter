import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutomaticDebitService } from'../../automatic-debit.services';
import { applyinfoModel } from '../../automatic-debit.models';
import { MemoryStorage } from 'app/shared/memory.storage';
import { ErrorPageService, FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-set-payment02',
  templateUrl: './card-set-payment02.component.html'
})
export class CardSetPayment02Component implements OnInit {
	public accounts: string[];
	public FirstFlag: boolean;
	public form: FormGroup;
	private formValidator = new FormValidator();
	public controls: any;
	public secondapply : boolean;
	public TotalAmt: string;
	public MinAmt: string;
	public DueDate: string;
	public oldaccounts: string;
	public oldpaymenttype: string;
	public oldpaymenttypeview: string;
	public prestep: string;


  constructor(
	private AutomaticDebitService: AutomaticDebitService,
	private route: ActivatedRoute,
	private storage: MemoryStorage,
	private wizardService: WizardService,
	private errorPageService: ErrorPageService,
  ) {
	const controls: Array<MyFormControl> = [
		{
			Name: 'AccountNo',
			ErrMsg: '請選擇自動扣繳帳號',
			Control: new FormControl(undefined, Validators.required)
		},
		{
			Name: 'PaymentType',
			ErrMsg: '請選擇預計扣繳方式',
			Control: new FormControl(undefined, Validators.required)
		},
		{
			Name: 'AutoDeductAmt',
			ErrMsg: '很抱歉!請輸入本期扣繳金額!',
			Control: new FormControl(undefined, Validators.required)
		},
	];
	this.form = this.formValidator.MakeFormGroup(controls);
	this.controls = this.form.controls;
  }

  ngOnInit() {

	this.route.data.subscribe(
		async(data) => {
			if(data.applyinfo) {
				// 用來判斷使用者申請項目的依據，詳見applyinfoModel說明
				const applyinfo: applyinfoModel = data.applyinfo;
				this.FirstFlag = applyinfo.FirstFlag;
				this.secondapply = applyinfo.SecondApply;
				this.prestep = applyinfo.prestep;
				// 將自動扣繳資訊寫入變數用於顯示於頁面
				this.TotalAmt = applyinfo.TotalAmt;
				this.MinAmt = applyinfo.MinAmt;
				this.DueDate = applyinfo.DueDate;
				this.oldaccounts = applyinfo.OldAccount;
				this.oldpaymenttype = applyinfo.OldPaymentType
				this.oldpaymenttypeview = applyinfo.OldPaymentType ==="2" ? "當期應繳全額":"最低應繳金額";
				// 如果是執行上一步回到此頁，則對使用者所選的帳號進行顯示設定
				if (this.prestep === "1") {
					this.controls.PaymentType.setValue(applyinfo.NewPaymentType);
					this.controls.AccountNo.setValue(applyinfo.NewAccount);
				}
				// 新申請或變更扣繳方式，要去取的可選擇扣繳的帳號
				if(this.FirstFlag || !this.secondapply) {
					this.accounts = applyinfo.accounts;
				}
				// 新申請且非執行上一步動作回到此頁，要去預設自動扣繳帳號的預設值及扣繳方式
				if(this.FirstFlag && this.prestep === "2") {
					this.controls.AccountNo.setValue(applyinfo.accounts[0]);
					this.controls.PaymentType.setValue(2);
				}


				// 如果是設定變更扣繳方式，且非執行上一步動作回到此頁，則將帳號、預設扣繳設定，帶入原先留存設定
				if(!this.FirstFlag && !this.secondapply && this.prestep === "2") {
					this.controls.AccountNo.setValue(this.oldaccounts);
					this.controls.PaymentType.setValue(+this.oldpaymenttype);
				}
			}
		}
	)
  }

// 執行上一步動作依據不同申請條件回到不同頁面
  returnstep() {
	this.route.data.subscribe(
		async(data) => {
			if(data.applyinfo) {
				const applyinfo: applyinfoModel = data.applyinfo;
				if(applyinfo.FirstFlag) {
					this.wizardService.GoToStep(3);
				} else {
					this.wizardService.GoToStep(2);
				}
			}
		}
	)
  }
// 執行送出
  async submit() {
	// 欄位檢查，不符設定則中斷
	if (!this.formValidator.Validate()) { return; }

	// 如果是設定本期自動扣繳金額，則執行判斷條件
	if (!this.FirstFlag && this.secondapply) {
		// 取得日期
		const now = new Date();
		const timeNow  = new Date(now.getFullYear(),now.getMonth(),now.getDate());
		const timeLimit = new Date(this.DueDate);

		// 取得本期應繳最大最小值的完整數字
		const minamt = (this.MinAmt.split(",")).join("");
		const totalamt = (this.TotalAmt.split(",")).join("");

		// 設定之本期扣款金額不得大於本期帳單應繳金額且不得小於本期最低應繳金額
		if(+this.form.value.AutoDeductAmt < +minamt  || +this.form.value.AutoDeductAmt > +totalamt ) {
			this.errorPageService.display('您設定之本期扣款金額不得大於本期帳單應繳金額且不得小於本期最低應繳金額。', false);
			return;
		}
		// 不可於繳款截止日當天設定自動扣繳金額
		else if((timeNow.getTime() - timeLimit.getTime()) >= 0) {
			this.errorPageService.display('本期帳單設定時間已過，無法設定扣款金額，提醒您應於帳單繳款截止日之前一營業日下午5:00前設定始可變更。', false);
			return;
		}
	}

	// 如果是變更自扣帳號及方式，不可以沒有調整任何東西進到下一步
	if (!this.FirstFlag && !this.secondapply) {
		if ((+this.form.value.PaymentType === +this.oldpaymenttype)  && (this.form.value.AccountNo === this.oldaccounts)) {
			this.errorPageService.display('很抱歉!您並未變更任何設定，請選擇變更項目!', false);
			return;
		}
	}

	this.route.data.subscribe(
		async(data) => {
			if (data.applyinfo) {
			const applyinfo: applyinfoModel = data.applyinfo;
			applyinfo.NewAccount = this.form.value.AccountNo;
			applyinfo.NewPaymentType = this.form.value.PaymentType;
			applyinfo.AutoDeductAmt = this.form.value.AutoDeductAmt;
			// 將用來判斷是否執行上一步動作的參數復原
			applyinfo.prestep = "2";
			}
		}
	);
	this.wizardService.GoToStep(6);
  }

}
