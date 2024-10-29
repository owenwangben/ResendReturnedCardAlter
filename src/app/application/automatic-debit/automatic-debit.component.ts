import { MemoryStorage } from './../../shared/memory.storage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorPageButton, ErrorPageService, PageInfoService, WizardStep } from 'app/shared/shared.module';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NoAccountComponent } from './components/no-account/no-account.component';
import { NoneCustomerComponent } from './components/none-customer/none-customer.component';
import { ApplyReviseComponent } from './components/apply-revise/apply-revise.component';
import { NewApplyComponent } from './components/new-apply/new-apply.component';
import { CardSetPayment01Component } from './components/card-set-payment01/card-set-payment01.component';
import { CardSetPayment02Component } from './components/card-set-payment02/card-set-payment02.component';
import { CardSetPayment03Component } from './components/card-set-payment03/card-set-payment03.component';
import { SuccessComponent } from './components/success/success.component';
import { AutomaticDebitService } from'./automatic-debit.services'
import { applyinfoModel } from './automatic-debit.models';

@Component({
  selector: 'app-automatic-debit',
  templateUrl: './automatic-debit.component.html'
})
export class AutomaticDebitComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	step: number;
	homeUrl: string;
	FirstFlag:boolean;

  constructor(
	public pageinfo: PageInfoService,
	private route: ActivatedRoute,
	private router: Router,
	private idle: Idle,
	private keepalive: Keepalive,
	private errorPageService: ErrorPageService,
	private AutomaticDebitService: AutomaticDebitService,
	private storage: MemoryStorage
  ) { }

ngOnInit() {
	this.route.data.subscribe(
		async(data) => {
			data.applyinfo = new applyinfoModel();
			// 取得使用者自動扣繳資訊
			this.checkDebitAccount(this.storage.CustId)
			this.getAuthAutoDeduct(this.storage.CustId);
		}
	)
	this.steps = [
		{ StepName: '未開戶', Component: NoAccountComponent, StepNo: 0},
		{ StepName: '非本行客戶', Component: NoneCustomerComponent, StepNo: 1},
		{ StepName: '已申請過重新設定', Component: ApplyReviseComponent, StepNo: 2},
		{ StepName: '未申請過', Component: NewApplyComponent, StepNo: 3},
		{ StepName: '申請頁面1', Component: CardSetPayment01Component, StepNo: 4},
		{ StepName: '申請頁面2', Component: CardSetPayment02Component, StepNo: 5},
		{ StepName: '申請頁面3', Component: CardSetPayment03Component, StepNo: 6},
		{ StepName: '申請完成', Component: SuccessComponent, StepNo: 7},
	];
	this.homeUrl = "/Application/AutomaticDebit";
  }
  /*
本自動扣繳頁面流程較複雜故增加此註解方便維護
依序判斷依據參數如下
1.FirstFlag - 用來判斷是否為新申請
2.FlagResponse - 用來判斷新申請者是否有設定他行自動扣繳
3.secondapply - 用來判斷非新申請的功能，true:設定本期扣款金額 false:扣繳方式變更設定
4.prestep - 用來判斷使用者是否按了"上一步"

流程圖解參考:https://www.figma.com/file/u1Me6DUFez2y0UTRQpOIPp/%E6%B0%B8%E8%B1%90%E8%87%AA%E6%89%A3?node-id=0%3A1
*/

  // 取得使用者自動扣繳資訊
  async checkDebitAccount(id:string) {
	const response = await this.AutomaticDebitService.GetAutoDeduct(id);
	this.route.data.subscribe(
		async(data) => {
			if(data.applyinfo) {
				// 將使用者原先扣繳資訊存入applyinfo用於傳遞
				const applyinfo: applyinfoModel = data.applyinfo;
				applyinfo.FlagResponse = response.Result.Flag === "Y" ? true:false;
				applyinfo.OldAccount = response.Result.Account;
				applyinfo.OldBankCode = response.Result.BankCode;
				applyinfo.OldPaymentType = response.Result.PaymentType;
				applyinfo.EffectDate = response.Result.EffectDate;
				applyinfo.TotalAmt = response.Result.TotalAmt;
				applyinfo.MinAmt = response.Result.MinAmt;
				applyinfo.DueDate = response.Result.DueDate;
			}
		}
	);
  }

  async getAuthAutoDeduct(id) {
	const response = await this.AutomaticDebitService.AuthAutoDeduct(id);

	if(response.ResultCode === "00") {
		//儲存是否為新申請判斷條件
		this.FirstFlag = response.Result.FirstFlag;
	};

	switch(response.ResultCode) {
		case "00":{
			this.route.data.subscribe(
				async(data) => {
					const applyinfo: applyinfoModel = data.applyinfo;
					applyinfo.FirstFlag = this.FirstFlag;
					applyinfo.prestep = "2"
				}
			)
			if(this.FirstFlag) {
				this.current = 3;
			}
			else {
				this.current = 2;
			}
			break
		}
		case "01":{
			this.current = 0;
			break;
		}
		case "02":{
			this.current = 1;
			break;
		}
		case "03":{
			this.current = 0;
			break;
		}
		default:{
			this.errorPageService.display("失敗 : "+response.ResultMessage, true);
			break;
		}
	}
  }
}
