import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageButton, ErrorPageService, MemoryStorage, WizardService } from 'app/shared/shared.module';
import { ApplyAutoDeductRequestModel, applyinfoModel, SetAutoDeductAmtRequestModel, SetAutoDeductTypeRequestModel } from '../../automatic-debit.models';
import { AutomaticDebitService } from'../../automatic-debit.services';

@Component({
  selector: 'app-card-set-payment03',
  templateUrl: './card-set-payment03.component.html'
})
export class CardSetPayment03Component implements OnInit {
	public Account: string;
	public PaymentType: string;
	public PaymentTypeView: string;
	public FlagResponse: boolean;
	public OldAccount: string;
	public OldPaymentType: string;
	public OldPaymentTypeView: string;
	public OldBankCode: string;
	public FirstFlag: boolean;
	public EffectDate: string;
	public SecondApply: boolean;
	public AutoDeductAmt: string;
	public TotalAmt: string;
	public MinAmt: string;
	public DueDate: string;


  constructor(
	private route: ActivatedRoute,
	private wizardService: WizardService,
	private AutomaticDebitService: AutomaticDebitService,
	private storage: MemoryStorage,
	private errorPageService: ErrorPageService
  ) { }

  ngOnInit() {
	this.route.data.subscribe(
		async(data) => {
			//從applyinfoModel取出所需判斷及顯示的參數
			if(data.applyinfo) {
			const applyinfo: applyinfoModel = data.applyinfo;
				this.Account = applyinfo.NewAccount;
				this.PaymentType = applyinfo.NewPaymentType;
				this.FlagResponse = applyinfo.FlagResponse;
				this.OldAccount = applyinfo.OldAccount;
				this.OldBankCode = applyinfo.OldBankCode;
				this.OldPaymentType = applyinfo.OldPaymentType;
				this.FirstFlag = applyinfo.FirstFlag;
				this.EffectDate = applyinfo.EffectDate;
				this.SecondApply = applyinfo.SecondApply;
				this.AutoDeductAmt = applyinfo.AutoDeductAmt;
				this.TotalAmt = applyinfo.TotalAmt;
				this.MinAmt = applyinfo.MinAmt;
				this.DueDate = applyinfo.DueDate;
			}
		}
	)
//將新申請扣繳方式轉換為文字用來顯示
	if(+this.PaymentType === 2) {
		this.PaymentTypeView = "當期應繳全額"
	} else {
		this.PaymentTypeView = "最低應繳金額"
	}
//將原先扣繳方式轉換為文字用來顯示
	if(+this.OldPaymentType === 2) {
		this.OldPaymentTypeView = "當期應繳全額"
	} else {
		this.OldPaymentTypeView = "最低應繳金額"
	}
  }
//執行上一步動作
  prestep() {
	this.route.data.subscribe(
		async(data) => {
			if(data.applyinfo) {
			const applyinfo: applyinfoModel = data.applyinfo;
				//用來讓上一步頁面判斷是否執行上一步動作
				applyinfo.prestep = "1"
			}
		}
	)

	this.wizardService.GoToStep(5);
  }

  async submit( ) {
	//設定錯誤頁面的資訊
	const errorlink = "/Application/AutomaticDebit"
	const buttons: Array<ErrorPageButton> = [{ caption: '返回', href: undefined, link: errorlink }];
	  //新申請的資料送出
	  if(this.FirstFlag) {
		const model: ApplyAutoDeductRequestModel = {ID:this.storage.CustId, Flag:(this.FlagResponse ? "Y":"N"), BankCode:this.OldBankCode,
		Account:this.OldAccount, PaymentType:this.OldPaymentType,  NewBankCode:"807", NewAccount:this.Account, NewPaymentType:this.PaymentType}
		const response = await this.AutomaticDebitService.ApplyAutoDeduct(model);
		if(response.Result.Success) {
			this.wizardService.GoToStep(7);
		} else {
			this.errorPageService.display("失敗 : "+response.ResultMessage,true,null,buttons);
		}
	  }
	  //設定本期扣繳金額的資料送出
	  else if(!this.FirstFlag && this.SecondApply) {
		const model: SetAutoDeductAmtRequestModel = {ID:this.storage.CustId, Flag:(this.FlagResponse ? "Y":"N"), BankCode:this.OldBankCode, Account:this.OldAccount,
		PaymentType:this.OldPaymentType, DueDate:this.DueDate, AutoDeductAmt:this.AutoDeductAmt}
		const response = await this.AutomaticDebitService.SetAutoDeductAmt(model);
		if(response.Result.Success) {
			this.wizardService.GoToStep(7);
		} else {
			this.errorPageService.display("失敗 : "+response.ResultMessage,true,null,buttons);
		}
	  }
	  //變更自動扣繳設定的資料送出
	  else if(!this.FirstFlag && !this.SecondApply) {
			//僅變更扣繳方式的話打SetAutoDeductType API，其他就打ApplyAutoDeduct API
			if(this.Account === this.OldAccount){
				const model: SetAutoDeductTypeRequestModel = {ID:this.storage.CustId, Flag:(this.FlagResponse ? "Y":"N"), BankCode:this.OldBankCode, Account:this.OldAccount,
				PaymentType:this.OldPaymentType, NewPaymentType:this.PaymentType}
				const response = await this.AutomaticDebitService.SetAutoDeductType(model);
				if(response.Result.Success) {
					this.wizardService.GoToStep(7);
				} else {
					this.errorPageService.display("失敗 : "+response.ResultMessage,true,null,buttons);
				}
			}
			else {
				const model: ApplyAutoDeductRequestModel = {ID:this.storage.CustId, Flag:(this.FlagResponse ? "Y":"N"), BankCode:this.OldBankCode,
				Account:this.OldAccount, PaymentType:this.OldPaymentType,  NewBankCode:"807", NewAccount:this.Account, NewPaymentType:this.PaymentType}
				const response = await this.AutomaticDebitService.ApplyAutoDeduct(model);
				if(response.Result.Success) {
					this.wizardService.GoToStep(7);
				} else {
					this.errorPageService.display("失敗 : "+response.ResultMessage,true,null,buttons);
				}
			}
		}
	}
}
