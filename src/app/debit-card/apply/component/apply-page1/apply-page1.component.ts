import { AccountInfo } from './../../../../account/account-info/account-info.models';
import { ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { WizardService, SharedService, ErrorPageService, MyFormControl, FormValidator, MemoryStorage } from 'app/shared/shared.module';
import { ApplyDebitCardRequestModel} from '../../apply.service';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-apply-page1',
	templateUrl: './apply-page1.component.html'
})
export class ApplyPage1Component implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public addrForm: FormGroup;
	public Address: string;
	public Accounts=[];
	public AccountTWInfo = [];
	public AccountForeignDigitInfo = [];
	public AccountForeignUnDigitInfo = [];
	public ApplyId: string;
	public CanActiveForeignAccount: boolean;
	public ForeignAccounts: string[] = []
	public Digit:boolean;
	isMobile = environment.IsMobile;
	custId = this.storage.CustId;

	constructor(
		private sharedService: SharedService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
		private wizardService: WizardService,
		private route: ActivatedRoute,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'AccountNo',
				ErrMsg: '請選永豐臺幣帳號',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'EnableMultiCurrencyFeature',
				ErrMsg: '請選擇是否啟用多幣別功能',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'ForeignAccountNo',
				ErrMsg: '請選永豐外幣帳號',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'EName',
				ErrMsg: '英文姓名為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required,
						Validators.pattern('^[a-zA-Z][a-zA-Z ,.\-]*[a-zA-Z]$')
					])
				)
			},
		];
		this.form = this.formValidator.MakeFormGroup(controls);
	};

	async ngOnInit() {
		await this.getAddress();
		await this.getAccounts();

		this.route.data.subscribe(async(data) => {
			if (data.applyinfo) {
				const applyinfo: ApplyDebitCardRequestModel = data.applyinfo;
				const controls = this.form.controls;
				if (applyinfo.AccountNo) {
					controls.AccountNo.setValue(applyinfo.AccountNo);
				}
				if (applyinfo.EnglishName) {
					controls.EName.setValue(applyinfo.EnglishName);
				}
				if (applyinfo.ForeignAccountNo) {
					controls.ForeignAccountNo.setValue(applyinfo.ForeignAccountNo);
				}
				this.Digit = applyinfo.digitmark
				this.Digit ? this.ForeignAccounts = this.AccountForeignDigitInfo : this.ForeignAccounts = this.AccountForeignUnDigitInfo;
				this.ForeignAccounts.length != 0? this.CanActiveForeignAccount = true : this.CanActiveForeignAccount = false;
			    controls.EnableMultiCurrencyFeature.setValue(applyinfo.EnableMultiCurrencyFeature);
			}
			else {
				data.applyinfo = new ApplyDebitCardRequestModel();
			}

		})


	}

	async getAddress() {
		const response = await this.sharedService.GetCustomerInfo(1, 99);
		if (this.errorPageService.validateResponse(response)) {
			const cminfo = response.Result;
			if (cminfo) {
				this.ApplyId = cminfo.ID;
				this.Address = cminfo.Address;
			}
		}
		return null;
	}

	async getAccounts() {
		try {
			let checkSuccess = false;
			const checkDebitCardApplyResp = await this.sharedService.checkDebitCardApply();

			checkSuccess = (checkDebitCardApplyResp.ResultCode === "00");
			if (checkSuccess) {
				this.AccountTWInfo =checkDebitCardApplyResp.Result.Accounts.filter((e)=>  !e.IsForeignAccount )
				this.AccountTWInfo.forEach(element => this.Accounts.push(element.AccountNo ))
				checkDebitCardApplyResp.Result.Accounts.filter((e)=> { if(e.IsForeignAccount && e.IsDigitalAccount) {this.AccountForeignDigitInfo.push(e.AccountNo )}} );
				checkDebitCardApplyResp.Result.Accounts.filter((e)=> { if(e.IsForeignAccount && !e.IsDigitalAccount) {this.AccountForeignUnDigitInfo.push(e.AccountNo )}} );
			}
			else if (checkDebitCardApplyResp.ResultCode === "04") {
				this.errorPageService.display(checkDebitCardApplyResp.ResultMessage, true);
			}
			else {
				this.errorPageService.display('很抱歉，無法提供您換發簽帳金融卡服務，若有任何問題，請洽客服專線(02)2528-7776', true);
			}
		} catch (error) {
			console.log(error);
			this.errorPageService.display('系統維護中，請稍後再試', true);
		}
	}

	CheckForeignAccount() {
		this.form.controls.EnableMultiCurrencyFeature.setValue(undefined);
		this.form.controls.ForeignAccountNo.setValue(null);
		this.ForeignAccounts = []
		this.AccountTWInfo.filter( (e)=> { if(e.AccountNo === this.form.value.AccountNo) { this.Digit = e.IsDigitalAccount}})
		this.Digit ? this.ForeignAccounts = this.AccountForeignDigitInfo : this.ForeignAccounts = this.AccountForeignUnDigitInfo;
		this.ForeignAccounts.length != 0? this.CanActiveForeignAccount = true : this.CanActiveForeignAccount = false;
	};

	clearForeignAccount() {
		this.form.controls.ForeignAccountNo.setValue(null);
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }

		this.route.data.subscribe(async (data) => {
			const applyinfo = data.applyinfo
			const value = this.form.value;
			applyinfo.ID = this.storage.CustId;
			applyinfo.AccountNo = value.AccountNo;
			applyinfo.EnglishName = value.EName;
			applyinfo.ForeignAccountNo = value.ForeignAccountNo;
			applyinfo.digitmark = this.Digit;
			applyinfo.EnableMultiCurrencyFeature = value.EnableMultiCurrencyFeature;
		});

		this.wizardService.GoToNextStep();
	}

	// 居留證檢查
	checkArcId(Id: string) {
		const reg = new RegExp('[A-Za-z]{1}[A-Za-z89]{1}[0-9]{8}');
		return reg.test(Id);
	}
}
