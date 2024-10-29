import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageInfoService, FormValidator, WizardService, MyFormControl, ErrorPageService, MemoryStorage,
			CustomerInfoModel, SharedService } from 'app/shared/shared.module';
import { ApplyCardService } from '../../services/applycard.services';
import { CardInfo, SendApplyInfoRequestModel, AccountDetail } from '../../services/applycard.models';
import { OpenLightbox, ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';
import * as moment from 'moment';

@Component({
	selector: 'app-applycard-fillout-table2',
	templateUrl: './fillout-table2.component.html'
})
export class FillOutTable2Component implements OnInit, OnDestroy {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardinfo: CardInfo;
	public cminfo: CustomerInfoModel;
	public twdAccounts: AccountDetail[];
	public fcAccounts: AccountDetail[];
	public reviewDates: string[] = Array.apply(null, { length: 10 }).map((item, idx) => moment().add(-5 - idx, "days").format('YYYY/MM/DD'));
	public fcAccountManualInput = false;
	public twAccountManualInput = false;
	public source: number;
	public quickaccount: boolean;

	public constructor(
		private route: ActivatedRoute,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private storage: MemoryStorage,
		private sharedService: SharedService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'IsAgreeForeignCurrencyAuthDebit',
				ErrMsg: '請同意永豐信用卡外幣自動扣繳',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'ForeignDepositAccount',
				ErrMsg: '永豐外幣存款帳號為空或格式有誤',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required, Validators.minLength(14)
					])
				)
			},
			{
				Name: 'ForeignAuthDebitAmount',
				ErrMsg: '請選擇授權扣繳金額',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'AgreedigitForeignAutoWithholding',
				ErrMsg: '請同意數位帳戶外幣帳款自動扣繳',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'AgreeTwdAuthDebit',
				ErrMsg: '您的「永豐信用卡臺幣自動扣繳」尚未選擇',
				Control: new FormControl(
					undefined, Validators.required
				)
			},
			{
				Name: 'AgreequickaccountForeignAutoWithholding',
				ErrMsg: '請同意雲端開戶外幣帳款自動扣繳',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'TaiwanDepositAccount',
				ErrMsg: '永豐臺幣存款帳號為空或格式有誤',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required, Validators.minLength(14)
					])
				)
			},
			{
				Name: 'AgreeTWAutoWithholding',
				ErrMsg: '請選擇數位帳戶臺幣帳款自動扣繳',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'AgreeQuickaccountTWAutoWithholding',
				ErrMsg: '請選擇雲端帳戶臺幣帳款自動扣繳',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'ComboDepositAccount',
				ErrMsg: '永豐臺幣存款帳號為空或格式有誤',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required, Validators.minLength(14)
					])
				)
			},
			{
				Name: 'IsAgreeAuthDebit',
				ErrMsg: '請同意自動扣繳及換匯扣款功能重要注意事項',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'ComboInternationalCardFeatures',	// 開啟國際金融卡功能
				Control: new FormControl(null)
			},
			{
				Name: 'ComboIsApplyDebitFunction',		// 開啟金融卡消費扣款功能
				Control: new FormControl(null)
			},
			{
				Name: 'ComboTransferFunction',			// 申請/變更帳號轉帳功能
				Control: new FormControl(null)
			},
			{
				Name: 'ReviewTime',
				ErrMsg: '請選擇審閱日期',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	public async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.辦卡流程step2, this.storage.ApplyCardSource);
		this.route.queryParams.subscribe(params => {
			this.source = +params.source;
		});
		if(this.source == 2 &&　+this.storage.CifType == 5){
			this.quickaccount = true;
		}else{
			this.quickaccount = false;
		}
		this.route.data.subscribe(async(data) => {
			this.cminfo = data.cminfo;
			this.cardinfo = data.cardinfo;
			if (data.cminfo) {
				this.twdAccounts = await this.getBankAccounts(1);
				if (this.cardinfo.IsDualCurrencyCard) {
					const fcallAccounts = await this.getBankAccounts(this.cardinfo.CurrencyType);
					if (this.cardinfo.IsComboCard) {
						this.twdAccounts = this.twdAccounts.filter(p => p.IsDigitalAccount === false);
						this.fcAccounts = fcallAccounts.filter(p => p.IsDigitalAccount === false);
					} else {
						this.fcAccounts = fcallAccounts;
					}
				}
			}
			if (this.cardinfo.IsComboCard) {
				if (this.cardinfo.IsDualCurrencyCard) {
					this.form.controls.ComboDepositAccount.clearValidators();
					this.form.controls.ComboDepositAccount.setErrors(null);
				}
				else {
					this.form.controls.TaiwanDepositAccount.clearValidators();
					this.form.controls.TaiwanDepositAccount.setErrors(null);
				}
			}
			else {
				this.form.controls.ComboDepositAccount.clearValidators();
				this.form.controls.ComboDepositAccount.setErrors(null);
			}

			// 一般申請有大戶帳號走大戶的流程
			if (this.cardinfo.IsDualCurrencyCard && this.source !== 1) {
				if ( this.fcAccounts.length === 0) {
					const IsDAWHOExist = await this.IsDAWHODigitAccountExist();
					if (IsDAWHOExist) {
						this.source = 1;
					}
				}
			}

			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			const controls = this.form.controls;
			if (applyinfo.ForeignDepositAccount) {
				controls.ForeignDepositAccount.setValue(applyinfo.ForeignDepositAccount);
			} else {
				if (this.cardinfo.IsDualCurrencyCard && this.source === 1) {
					// 幣倍卡且為大戶不自動綁定
				} else {
					const fcDigitalAccount = this.fcAccounts.find(item => item.IsDigitalAccount === true);
					if (fcDigitalAccount) {
						controls.ForeignDepositAccount.setValue(fcDigitalAccount.AccountNo);
					}
				}
			}
			if (applyinfo.ForeignAuthDebitAmount) {
				controls.ForeignAuthDebitAmount.setValue(applyinfo.ForeignAuthDebitAmount);
			}
			if (applyinfo.TaiwanDepositAccount) {
				controls.TaiwanDepositAccount.setValue(applyinfo.TaiwanDepositAccount);
			} else {
				if (this.cardinfo.IsDualCurrencyCard && this.source === 1) {
					// 幣倍卡且為大戶不自動綁定
				} else {
					const TWDigitalAccount = this.twdAccounts.find(item => item.IsDigitalAccount === true);
					if (TWDigitalAccount) {
						controls.TaiwanDepositAccount.setValue(TWDigitalAccount.AccountNo);
					}
				}
			}
			if (applyinfo.ComboDepositAccount) {
				controls.ComboDepositAccount.setValue(applyinfo.ComboDepositAccount);
			}
			if (applyinfo.IsAgreeAuthDebit) {
				controls.IsAgreeAuthDebit.setValue(applyinfo.IsAgreeAuthDebit);
				controls.IsAgreeForeignCurrencyAuthDebit.setValue(applyinfo.IsAgreeForeignCurrencyAuthDebit);
				controls.AgreeTwdAuthDebit.setValue(applyinfo.AgreeTwdAuthDebit);
			}
			if (applyinfo.ComboInternationalCardFeatures) {
				controls.ComboInternationalCardFeatures.setValue(applyinfo.ComboInternationalCardFeatures);
			}
			if (applyinfo.ComboIsApplyDebitFunction) {
				controls.ComboIsApplyDebitFunction.setValue(applyinfo.ComboIsApplyDebitFunction);
			}
			if (applyinfo.ComboTransferFunction) {
				controls.ComboTransferFunction.setValue(applyinfo.ComboTransferFunction);
			}
			if (applyinfo.ReviewTime) {
				controls.ReviewTime.setValue(applyinfo.ReviewTime);
			}

			if (applyinfo.AgreeForeignAutoWithholding === "1" &&　+this.storage.CifType === 5) {
				// 外幣自動扣款，前端判斷是否填寫需使用boolean值，後端判斷需使用"1"or"2",故作轉換,"1" = 同意,"2" = 不同意
				controls.AgreequickaccountForeignAutoWithholding.setValue(true);
			}
			else {
				controls.AgreedigitForeignAutoWithholding.setValue(applyinfo.AgreeForeignAutoWithholding);
			}

			if (applyinfo.AgreeTWAutoWithholding &&　+this.storage.CifType === 5) {
				controls.AgreeQuickaccountTWAutoWithholding.setValue(applyinfo.AgreeTWAutoWithholding);
			}
			else{
				controls.AgreeTWAutoWithholding.setValue(applyinfo.AgreeTWAutoWithholding);
			}
		});
	}

	private	async IsDAWHODigitAccountExist () {
		const DAWHOInfo = await this.sharedService.GetDAWHOInfo(false);
		if (DAWHOInfo.ResultCode === '00') {
			if (DAWHOInfo.Result.Status === "在途") {
				return true;
			}
		}
		return false;
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	private async getBankAccounts(currencyType: number): Promise<AccountDetail[]> {
		const response = await this.applyCardService.getBankAccounts(currencyType);
		if (this.errorPageService.validateResponse(response, { showMessage: false })) {
			return response.Result.Accounts;
		}
		return [];
	}

	public goPrev() {
		this.wizardService.GoToPrevStep();
	}

	public submit() {
		if (!this.formValidator.Validate()) { return; }
		this.route.data.subscribe(async (data) => {
			const value = this.form.value;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			applyinfo.ForeignDepositAccount = value.ForeignDepositAccount;
			applyinfo.ForeignAuthDebitAmount = value.ForeignAuthDebitAmount;
			applyinfo.TaiwanDepositAccount = value.TaiwanDepositAccount;
			applyinfo.ComboDepositAccount = value.ComboDepositAccount;
			applyinfo.IsAgreeAuthDebit = value.IsAgreeAuthDebit;
			applyinfo.ComboInternationalCardFeatures = value.ComboInternationalCardFeatures;
			applyinfo.ComboIsApplyDebitFunction = value.ComboIsApplyDebitFunction;
			applyinfo.ComboTransferFunction = value.ComboTransferFunction || 3;
			applyinfo.ReviewTime = value.ReviewTime;
			// 以下分別設定雲端開戶辦卡or其他辦卡的外幣自動扣繳
			if(+this.storage.CifType == 5){
				// 外幣自動扣款，前端判斷是否填寫需使用boolean值，後端判斷需使用"1"or"2",故作轉換"1" = 同意,"2" = 不同意
				value.AgreequickaccountForeignAutoWithholding = "1"
				applyinfo.AgreeForeignAutoWithholding = value.AgreequickaccountForeignAutoWithholding;
			}
			else if(+this.storage.CifType !== 5){
				applyinfo.AgreeForeignAutoWithholding = value.AgreedigitForeignAutoWithholding;
			}
			else{applyinfo.AgreeForeignAutoWithholding = null};
			// 以下分別設定雲端開戶辦卡or其他辦卡的台幣自動扣繳
			if(+this.storage.CifType == 5){
				applyinfo.AgreeTWAutoWithholding = value.AgreeQuickaccountTWAutoWithholding;
			}
			else if(+this.storage.CifType !== 5){
				applyinfo.AgreeTWAutoWithholding = value.AgreeTWAutoWithholding;
			}
			else{applyinfo.AgreeTWAutoWithholding = null}

			applyinfo.Source = this.source;
			applyinfo.AgreeTwdAuthDebit = value.AgreeTwdAuthDebit;
			applyinfo.IsAgreeForeignCurrencyAuthDebit = value.IsAgreeForeignCurrencyAuthDebit;

			SensorsTrackSubmit('CardApplicationExclusiveCardInformationSubmission',
				this.storage.CardTitle, this.storage.CardType, true, '', !!this.storage.UserId, !!this.cminfo,
				applyinfo.IsCardMember, applyinfo.IsOtherCardAuth, applyinfo.Source);

			if (this.cardinfo.IsDualCurrencyCard) {
				if (this.source !== 1 && !this.quickaccount && !(this.twdAccounts && this.twdAccounts.length > 0 )) {
					this.errorPageService.confirm('提醒您！完成設定【臺幣帳款自動轉帳扣繳】方能享有加碼優惠！若您尚未開立永豐臺幣存款帳戶，請於完成卡片申請後親臨各分行或於線上開立DAWHO數位帳戶，再來電本行客服設定扣繳。',
						"確定", null, (ok) => {
						if (ok) {
							this.wizardService.GoToNextStep();
						}
					});
				} else if (this.source !== 1 &&  !this.quickaccount && value.TaiwanDepositAccount &&
						await this.checkHasDawhoCard(applyinfo.IDNumber, value.TaiwanDepositAccount)) {
					this.errorPageService.confirm('提醒您另持有DAWHO現金回饋卡，【臺幣帳款自動轉帳扣繳】請綁定數位帳戶以保有加碼優惠。',
						"確定", null, (ok) => {
						if (ok) {
							this.wizardService.GoToNextStep();
						}
					});
				} else if ((this.source !== 1 && !value.AgreeTwdAuthDebit && !this.quickaccount) || (this.source === 1 && value.AgreeTWAutoWithholding === 2) ||
				(this.quickaccount && +applyinfo.AgreeTWAutoWithholding === 2)) {
					applyinfo.TaiwanDepositAccount = null;
					this.errorPageService.confirm('提醒您！同意綁定【臺幣帳款自動轉帳扣繳】始可享有回饋加碼！',
						"確定", null, (ok) => {
						if (ok) {
							this.wizardService.GoToNextStep();
						}
					});
				} else {
					this.wizardService.GoToNextStep();
				}
			} else {
				this.wizardService.GoToNextStep();
			}
		});
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	/** 檢核客戶是否持有DAWHO現金回饋卡 */
	async checkHasDawhoCard(pid: string, twdAccount: string): Promise<boolean> {
		let hasDawhoCard = false;

		if (this.twdAccounts && this.twdAccounts.length > 0) {
			const accItem = this.twdAccounts.filter(x => x.AccountNo === twdAccount)[0];
			if (accItem && !accItem.IsDigitalAccount) {
				// 若選擇台幣實體帳號，需檢核客戶是否持有DAWHO現金回饋卡
				const response = await this.applyCardService.DupCheck(pid, 426178, true);
				const response2 = await this.applyCardService.DupCheck(pid, 426090, true);
				hasDawhoCard = (response.ResultCode === "01" || response2.ResultCode === "01" );
			}
		}

		return hasDawhoCard;
	}
}
