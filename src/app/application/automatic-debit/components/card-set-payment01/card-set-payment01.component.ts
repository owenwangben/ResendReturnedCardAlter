import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutomaticDebitService } from '../../automatic-debit.services';
import { ErrorPageService, MemoryStorage, WizardService } from 'app/shared/shared.module';
import { applyinfoModel } from '../../automatic-debit.models';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';

@Component({
	selector: 'app-card-set-payment01',
	templateUrl: './card-set-payment01.component.html'
})
export class CardSetPayment01Component implements OnInit {

	public FirstFlag: boolean;
	public secondapply: boolean;
	public prestep: string;
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();
	xmlString = "";

	constructor(
		private wizardService: WizardService,
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private agreenregulationhandleservice: AgreenRegulationHandleService,
		private AutomaticDebitService: AutomaticDebitService,
	) { }

	async ngOnInit() {
		this.route.data.subscribe(
			async (data) => {
				if (data.applyinfo) {
					// 用來判斷使用者申請項目的依據，詳見applyinfoModel說明
					const applyinfo: applyinfoModel = data.applyinfo;
					this.FirstFlag = applyinfo.FirstFlag;
					this.secondapply = applyinfo.SecondApply;
					this.prestep = applyinfo.prestep;
				}
			}
		)
		this.getData();
	}
	//取得條款版號，並於確認時回寫table
	async getData() {
		let model: GetAgreementDataRequest = { Title: "信用卡自動轉帳授權條款", Source: "EWEB" }
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.xmlString = response.Result.Content
			this.InsertAgreementRecordModel.ID = this.storage.CustId
			this.InsertAgreementRecordModel.Source = "EWEB"
			this.InsertAgreementRecordModel.Title = "信用卡自動轉帳授權條款"
			this.InsertAgreementRecordModel.Version = response.Result.Version
		}
	}

	async submit() {
		await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
		this.route.data.subscribe(
			async (data) => {
				if (data.applyinfo) {
					// 新申請或變更扣繳方式，要去取的可選擇扣繳的帳號
					// 為避免下一頁讀取時間過長，在這一頁先取
					if (this.FirstFlag || !this.secondapply) {
						const applyinfo: applyinfoModel = data.applyinfo;
						const response = await this.AutomaticDebitService.GetAutoDeductAccount(this.storage.CustId);
						applyinfo.accounts = response.Result.Accounts;
						this.wizardService.GoToStep(5);
					}
					else {
						this.wizardService.GoToStep(5);
					};
				};
			}
		);

	};

	returnstep() {
		this.route.data.subscribe(
			async (data) => {
				if (data.applyinfo) {
					const applyinfo: applyinfoModel = data.applyinfo;
					if (applyinfo.FirstFlag) {
						this.wizardService.GoToStep(3);
					} else {
						this.wizardService.GoToStep(2);
					};
				};
			}
		);
	};

}
