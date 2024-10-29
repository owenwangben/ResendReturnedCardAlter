import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageInfoService, FormValidator, WizardService, MyFormControl, ErrorPageService, MemoryStorage,
			CustomerInfoModel } from 'app/shared/shared.module';
import { SendApplyInfoRequestModel, CardInfo, AccountDetail } from '../../services/applycard.models';
import { OpenLightbox, ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';
import { ApplyCardService } from '../../services/applycard.services';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-applycard-agreement',
	templateUrl: './agreement.component.html'
})
export class AgreementComponent implements OnInit, OnDestroy {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardinfo: CardInfo;
	public cminfo: CustomerInfoModel;
	public IsEasternCard: boolean;
	public twdAccounts: AccountDetail[];
	public showTwdAuthDebitUI: boolean;
  public hasTwdAccounts: boolean;
	public flag: string;
	public authtype: boolean;
	public ciftype: string;
	public isShowShareHoldingTerm: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
		private applyCardService: ApplyCardService,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'AgreeTnC',
				ErrMsg: '請同意信用卡申請書同意條款暨約定事項',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'AgreeTwdAuthDebit',
				ErrMsg: '您的「永豐信用卡自動扣繳申請及注意事項」尚未選擇',
				Control: new FormControl(
					undefined, Validators.required
				)
			},
			{
				Name: 'TaiwanDepositAccount',
				ErrMsg: '您的「臺幣帳款自動扣繳帳號」尚未設定或格式有誤',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required, Validators.minLength(14)
					])
				)
			},
			{
				Name: 'TwdAuthDebitAmount',
				ErrMsg: '您的「授權扣繳金額」尚未選擇',
				Control: new FormControl(undefined, Validators.required)
			},
			{
				Name: 'AgreeDawhoAuthDebit',
				ErrMsg: '請同意DAWHO現金回饋信用卡自動扣繳注意事項',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'DawhoAuthDebitAmount',
				ErrMsg: '請選擇授權扣繳金額',
				Control: new FormControl(undefined, Validators.required)
			},
			{
				Name: 'AgreeVirtualCard',
				ErrMsg: '請同意虛擬卡約定條款同意事項',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'AgreePriorActivateCard',
				ErrMsg: '請同意優先啟用碼同意事項',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'AgreeBrandedCard',
				ErrMsg: '請同意聯名卡/認同機構之個人資料使用同意條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'ShareHoldingFlag',
				Control: new FormControl(undefined)
			},
			{
				Name: 'AgreeAllCompany',
				ErrMsg: '請選擇是否同意共同行銷/合作推廣個人資料',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'AgreeThirdParty',
				ErrMsg: '請選擇是否同意第三人行銷個人資料同意條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'MobileVerificationServices',
        Control: new FormControl(undefined)
			},
      {
				Name: 'AgreeTwdAuthDebitReserved',
				ErrMsg: '請選擇是否同意永豐信用卡自動扣繳預設申請及注意事項',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls, () => {
			// if (this.cardinfo.IsShopCard && !this.cardinfo.IsIpassCard) {
			// 	if (this.form.value.AgreeAllCompany !== false) {
			// 		errorPageService.display("需不同意共同行銷/合作推廣個人資料方可申請美安卡", false);
			// 		return false;
			// 	}
			// 	if (this.form.value.AgreeThirdParty !== true) {
			// 		errorPageService.display("需同意不提供個人資料予第三人行銷條款方可申請美安卡", false);
			// 		return false;
			// 	}
			// }
			return true;
		});
	}

	async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.同意條款, this.storage.ApplyCardSource);
		this.route.data.subscribe(async (data) => {
			this.cardinfo = data.cardinfo;
			this.cminfo = data.cminfo;
			this.authtype = this.checkauthtype(this.storage.AuthType);
			this.ciftype = this.storage.CifType;
			this.IsEasternCard = this.CheckEastern(this.cardinfo.CardFace);
			this.twdAccounts = await this.getBankAccounts(1);
			this.showTwdAuthDebitUI = this.checkTwdAuthDebit(this.cminfo, this.cardinfo);
      this.hasTwdAccounts = this.checkTwdAccounts();
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			this.flag = applyinfo.Flag as string;
			this.isShowShareHoldingTerm = data.isShowShareHoldingTerm;

      if(data.applyinfo.AgreeTwdAuthDebitReserved){
        applyinfo.AgreeTwdAuthDebitReserved = data.applyinfo.AgreeTwdAuthDebitReserved;
      }else if(this.showTwdAuthDebitUI){
        if(this.hasTwdAccounts){
          applyinfo.AgreeTwdAuthDebitReserved = "";
        }else if(this.cardinfo.CardFace === 428001 || this.cardinfo.CardFace === 428178){
          applyinfo.AgreeTwdAuthDebitReserved = "Y";
        }
      }

			this.form.patchValue({
				AgreeTnC: applyinfo.AgreeTnC,
				AgreeBrandedCard: applyinfo.AgreeBrandedCard,
				AgreeAllCompany: applyinfo.AgreeAllCompany,
				ShareHoldingFlag: applyinfo.ShareHoldingFlag,
				AgreeThirdParty: applyinfo.AgreeThirdParty,
        MobileVerificationServices: applyinfo.MobileVerificationServices,
				AgreeVirtualCard: applyinfo.AgreeVirtualCard,
				AgreePriorActivateCard: applyinfo.AgreePriorActivateCard,
				AgreeDawhoAuthDebit: applyinfo.AgreeDawhoAuthDebit,
				DawhoAuthDebitAmount: applyinfo.DawhoAuthDebitAmount,
				AgreeTwdAuthDebit: applyinfo.AgreeTwdAuthDebit,
				TaiwanDepositAccount: applyinfo.TaiwanDepositAccount,
				TwdAuthDebitAmount: applyinfo.TwdAuthDebitAmount,
        AgreeTwdAuthDebitReserved: applyinfo.AgreeTwdAuthDebitReserved
			});

		});
	};

	private checkauthtype(authtype): boolean {
		if( !authtype || authtype === "OtherCard" || authtype === "OtherBank" ) {
			return true;
		}
		else {
			return false;
		}
	}

	checkTwdAuthDebit(cminfo: CustomerInfoModel, cardinfo: CardInfo): boolean {
		return !cardinfo.ShowDawhoAuthDebitUI && !cardinfo.IsComboCard && !cardinfo.IsDualCurrencyCard && (this.ciftype != "5") &&
			(cminfo && !cminfo.IsCardMember && !cminfo.IsSinopacTwdAuthDebit);
	}

  checkTwdAccounts():boolean {
    return (this.twdAccounts != null && this.twdAccounts.length > 0);
  }

	async getBankAccounts(currencyType: number): Promise<AccountDetail[]> {
		const response = await this.applyCardService.getBankAccounts(currencyType);
		if (this.errorPageService.validateResponse(response, { showMessage: false })) {
			return response.Result.Accounts;
		}
		return [];
	}

	private CheckEastern(CardFace: number) {
		// 判斷是不是東森卡
		if ( CardFace === 207178 || CardFace === 206178 ) {
			return true;
		}
		return false;
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	submit() {
		if (!this.formValidator.Validate()) { return; }
		this.route.data.subscribe(data => {
			const value = this.form.value;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			applyinfo.AgreeTnC = value.AgreeTnC;
			applyinfo.AgreeBrandedCard = value.AgreeBrandedCard;
			applyinfo.ShareHoldingFlag = value.ShareHoldingFlag ? value.ShareHoldingFlag : (this.isShowShareHoldingTerm ? "N" : "");
			applyinfo.ShareHoldingVersion = applyinfo.ShareHoldingFlag ? data.ShareHoldingVersion : "";
			applyinfo.AgreeAllCompany = value.AgreeAllCompany;
			applyinfo.AgreeThirdParty = value.AgreeThirdParty;
      applyinfo.MobileVerificationServices = value.MobileVerificationServices;
			if (this.cardinfo.ProductType === 3 || this.cardinfo.IsVirtualCard) {
				applyinfo.AgreeVirtualCard = value.AgreeVirtualCard;
			}
			if ((this.flag === "01" && this.cardinfo.IsPriorActivateCard) || this.cardinfo.IsMitsuiOutletParkCard) {
				applyinfo.AgreePriorActivateCard = value.AgreePriorActivateCard;
			}
			applyinfo.AgreeDawhoAuthDebit = value.AgreeDawhoAuthDebit;
			applyinfo.DawhoAuthDebitAmount = value.DawhoAuthDebitAmount;
			if (this.showTwdAuthDebitUI) {
        if (this.hasTwdAccounts) {
          applyinfo.AgreeTwdAuthDebit = value.AgreeTwdAuthDebit;
          applyinfo.TaiwanDepositAccount = value.TaiwanDepositAccount;
          applyinfo.TwdAuthDebitAmount = value.TwdAuthDebitAmount;
          applyinfo.AgreeTwdAuthDebitReserved = "";
        }else if(this.cardinfo.CardFace === 428001 || this.cardinfo.CardFace === 428178) {
          applyinfo.TwdAuthDebitAmount = value.TwdAuthDebitAmount;
          applyinfo.AgreeTwdAuthDebitReserved = value.AgreeTwdAuthDebitReserved;
        }
			}
			SensorsTrackSubmit('CardApplicationCommonClausesSubmission', this.storage.CardTitle, this.storage.CardType,
				true, '', !!this.storage.UserId, !!this.cminfo,
				applyinfo.IsCardMember, applyinfo.IsOtherCardAuth, applyinfo.Source);

			this.wizardService.GoToNextStep();
		});
	}

	public getShareHoldingTermPDFUrl() {
		if(environment.IsMobile) {
			return "/m/SinoCard/api/Agreement/ShareHoldingTermPDF#open-browser";
		}
		else {
			return "/SinoCard/api/Agreement/ShareHoldingTermPDF#open-browser";
		}
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}
}
