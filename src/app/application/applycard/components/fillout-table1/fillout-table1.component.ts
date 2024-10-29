import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { WizardService, FormValidator, MyFormControl, ErrorPageService,
			CustomerInfoModel, MemoryStorage, SharedService, SessionStorage} from 'app/shared/shared.module';
import { CityAreaZipCode, CardInfo, SendApplyInfoRequestModel, AccountDetail, ApplyInfoLogRequestModel } from '../../services/applycard.models';
import { ApplyCardService } from '../../services/applycard.services';
import { OpenLightbox, IsContainsFullWidthChar, IsValidId, ApplyCardPushGTM,
	ApplyCardPageName, CnamePattern, SensorsTrackSubmit, ApplyCardSource, UuidCreator} from 'app/shared/utilities';
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-applycard-fillout-table1',
	templateUrl: './fillout-table1.component.html'
})
export class FillOutTable1Component implements OnInit, OnDestroy {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardinfo: CardInfo;
	public cminfo: CustomerInfoModel;
	private branch: string;
	public branchcode: string;
	public isOtherCardAuth: boolean;
	public isOtherBankAuth: boolean;
	public clickWebApply = false;
	private referrer: string;
	public flag: string;
	public source: number;
	public dsno: string;
	public cityAreaZip: CityAreaZipCode[];
	public cities: string[];
	public IsEasternCard: boolean;
	public twdAccounts: AccountDetail[];
	public showTwdAuthDebitUI: boolean;
	public hasTwdAccounts: boolean;
	public token: string;
	public ciftype: number;
	public IsFarmerCard: boolean;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);
	private WorkTXN:string;
	public showSinopacEmailErrMsg: boolean = false;
	public isShowShareHoldingTerm: boolean = false;
	public ShareHoldingVersion: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private sharedService: SharedService,
		private storage: MemoryStorage,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'HiCardChannel',
				ErrMsg: '請選擇任一 Hi Card 紅利點數 3 倍送之通路',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'NotAutoBonus',
				ErrMsg: '請選擇悠遊卡是否自動加值功能',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'CName',
				ErrMsg: '中文姓名為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(2), Validators.pattern(CnamePattern)
					])
				)
			},
			{
				Name: 'EName',
				ErrMsg: '英文姓名輸入有誤，僅能使用半形英文字及半形符號「,」、「.」、「-」或半形空白',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.pattern('^[A-Z ,.\-]*$')
					]),
				)
			},
			{
				Name: 'ID',
				ErrMsg: '身分證字號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10)
					])
				)
			},
			{
				Name: 'Mobile',
				ErrMsg: '行動電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^09[0-9]{8}$')
					])
				)
			},
			{
				Name: 'Email',
				ErrMsg: '電子信箱為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^([a-zA-Z0-9._+-]+@[a-zA-Z0-9_.-]+([.]{1,1}[a-zA-Z]{2,8})+)$')
					])
				)
			},
			{
				Name: 'StmtDeliverWay',
				ErrMsg: '您的帳單寄送方式尚未選擇',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Referrer',			// 推薦人
				Control: new FormControl(undefined)
			},
			{
				Name: 'ShopCardCustId',			// 美安優惠顧客編號
				ErrMsg: '美安優惠顧客編號為空或格式有誤',
				Control: new FormControl(undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[0-9]{7}$|^[0-9]{10}$')
					])
				)
			},
			{
				Name: 'FranchiseeId', // 加盟/實習店主代碼
				ErrMsg: '加盟/實習店主代碼為空或格式有誤',
				Control: new FormControl(undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[0-9]{9}$|^[0-9]{10}$')
					])
				)
			},
			{
				Name: 'ShopCardUnableIssue',			// 美安悠遊鈦金卡無法核發作業
				Control: new FormControl(undefined)
			},
			{
				Name: 'MctBrandedCardUnableIssue',			// 台綜保(軍)公教悠遊鈦金卡無法核發作業
				Control: new FormControl(undefined)
			},
			{
				Name: 'ReceiveAddressType',
				ErrMsg: '請選擇您的卡片寄送及通訊地址',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'ReceiveAddress',
				ErrMsg: '卡片寄送地址為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required,
						Validators.minLength(5)
					])
				)
			},
			{
				Name: 'IsElasticLimit',		// 我同意貴行開啟鈦豐金融信用卡彈性額度功能
				Control: new FormControl(undefined)
			},
			{
				Name: 'EmailSendContract',	// 我同意貴行以電子郵件寄送信用卡契約
				Control: new FormControl(undefined)
			},
			{
				Name: 'IBankAgreement',
				ErrMsg: '請同意個人網路銀行服務條款',
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
				Name: 'DeliverPassword',	// 我同意貴行核卡後主動寄發預借現金密碼函
				Control: new FormControl(undefined)
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
			// if (this.cminfo && this.cminfo.ID && this.cminfo.IsCardMember) {
			// 	if (this.cardinfo.IsShopCard && !this.cardinfo.IsIpassCard) {
			// 		if (this.form.value.AgreeAllCompany !== false) {
			// 			errorPageService.display("需不同意共同行銷/合作推廣個人資料方可申請美安卡", false);
			// 			return false;
			// 		}
			// 		if (this.form.value.AgreeThirdParty !== true) {
			// 			errorPageService.display("需同意不提供個人資料予第三人行銷條款方可申請美安卡", false);
			// 			return false;
			// 		}
			// 	}
			// }

			return true;
		});

		this.form.controls.ReceiveAddressType.valueChanges.subscribe(value => {
			if (this.cminfo) {
				const adderssChoice = {"1":"現居","2":"戶籍","3":"公司"};
				const errorMessage = '因你未留存'+adderssChoice[value]+'地址，請選擇其他地址寄送或請先致電客服中心(02)2528-7776更新完成後再行申辦'
				if (value == "1") {
					if(!this.cminfo.Address) {
						// 如果未留存現居地址則跳錯誤訊息
						this.errorPageService.display(errorMessage, false);
						this.form.controls.ReceiveAddressType.setValue(undefined);
						return;
					};
					this.form.controls.ReceiveAddress.setValue(this.cminfo.Address);
				}
				else if (value == "2") {
					if(!this.cminfo.ResidenceAddress) {
						// 如果未留存戶籍地址則跳錯誤訊息
						this.errorPageService.display(errorMessage, false);
						this.form.controls.ReceiveAddressType.setValue(undefined);
						return;
					};
					this.form.controls.ReceiveAddress.setValue(this.cminfo.ResidenceAddress);
				}
				else if (value == "3") {
					if(!this.cminfo.CompanyAddress) {
						// 如果未留存公司地址則跳錯誤訊息
						this.errorPageService.display(errorMessage, false);
						this.form.controls.ReceiveAddressType.setValue(undefined);
						return;
					};
					this.form.controls.ReceiveAddress.setValue(this.cminfo.CompanyAddress);
				}
				else {
					this.form.controls.ReceiveAddress.setValue(undefined);
				}
			}
		});
	}

	private patchFormValue(applyinfo: SendApplyInfoRequestModel) {
		this.form.patchValue({
			HiCardChannel: applyinfo.HiCardChannel,
			NotAutoBonus: applyinfo.NotAutoBonus,
			CName: applyinfo.Name,
			EName: applyinfo.EnglishName,
			ID: applyinfo.IDNumber,
			Mobile: applyinfo.Mobile,
			Email: applyinfo.Email,
			Referrer: applyinfo.Referrer,
			IsElasticLimit: applyinfo.IsElasticLimit,
			EmailSendContract: applyinfo.EmailSendContract,
			IBankAgreement: applyinfo.IBankAgreement,
			ShopCardCustId: applyinfo.ShopCardCustId,
			FranchiseeId: applyinfo.ShopCardCustId,
			ShopCardUnableIssue: applyinfo.ShopCardUnableIssue,
			MctBrandedCardUnableIssue: applyinfo.MctBrandedCardUnableIssue,
			StmtDeliverWay: applyinfo.StmtDeliverWay,
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
			ReceiveAddressType: applyinfo.ReceiveAddressType,
			ReceiveAddressCity: applyinfo.ReceiveAddressCity,
			ReceiveAddressArea: applyinfo.ReceiveAddressZipCodeId,
			ReceiveAddress: applyinfo.ReceiveAddress,
			AgreeTwdAuthDebit: applyinfo.AgreeTwdAuthDebit,
			TaiwanDepositAccount: applyinfo.TaiwanDepositAccount,
			TwdAuthDebitAmount: applyinfo.TwdAuthDebitAmount,
			ForeignDepositAccount: applyinfo.ForeignDepositAccount,
			DeliverPassword: applyinfo.DeliverPassword,
      AgreeTwdAuthDebitReserved: applyinfo.AgreeTwdAuthDebitReserved
		});
	}

	async ngOnInit() {
		await this.getZipCodeData();
		this.ciftype = +this.storage.CifType
		this.route.queryParams.subscribe(params => {
			this.branch = params.br;
			this.referrer = params.ref;
			this.flag = params.flag;
			this.source = +params.source;
			this.token = params.token;

			const dsno = params.DsNo;
			if (dsno && dsno.length === 6) {
				this.dsno = dsno;
			}
		});
		this.route.data.subscribe(async (data) => {
			this.cardinfo = data.cardinfo;
			this.cminfo = data.cminfo;
			if (this.storage.CardFace !== this.cardinfo.CardFace.toString()) {
				this.errorPageService.display("雙因驗證資訊與申辦卡片資料不一致，請重新選擇卡片", false, () => {
					this.router.navigateByUrl("/Application/ApplyCard");
				});
			}
			if(!this.storage.WorkTXN){
				this.WorkTXN = UuidCreator();
				this.storage.WorkTXN = this.WorkTXN;
				this.applyInfoLog(this.cminfo.ID,this.WorkTXN)
			}else{
				this.WorkTXN = this.storage.WorkTXN;
				this.session.RemoveSession();
			}
			this.IsEasternCard = this.CheckEastern(this.cardinfo.CardFace);
			this.twdAccounts = await this.getBankAccounts(1);
			this.cminfo.TwdAcconts = this.twdAccounts;
			this.showTwdAuthDebitUI = this.checkTwdAuthDebit(this.cminfo, this.cardinfo);
			this.hasTwdAccounts = this.checkTwdAccounts();
			this.storage.CardTitle = this.cardinfo ? this.cardinfo.Title : "";
			this.storage.CardType = this.cardinfo ? this.cardinfo.FullCardType : "";
			this.branchcode = this.cminfo.BranchCode;
			this.storage.ApplyCardSource = this.source === 1 ? ApplyCardSource[ApplyCardSource.DAWHO] : "";
			ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.辦卡流程step1, this.storage.ApplyCardSource);
			if (!data.applyinfo) {
				data.applyinfo = new SendApplyInfoRequestModel();
				data.applyinfo.Token = this.token;
				data.applyinfo.WorkTXN = this.WorkTXN
				const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
				applyinfo.MemberType = data.MemberType;
				applyinfo.ProductType = this.cardinfo.ProductType;
				applyinfo.ApplyCardCategory = this.cardinfo.Id;
				applyinfo.UploadFileIds = new Array(2).fill(undefined);
				applyinfo.ImageIds = new Array(2).fill(undefined);
				applyinfo.IsFarmerCard = this.CheckIsFarmerCard(this.cardinfo.CardFace);

        if(data.applyinfo.AgreeTwdAuthDebitReserved){
          applyinfo.AgreeTwdAuthDebitReserved = data.applyinfo.AgreeTwdAuthDebitReserved;
        }else if(this.showTwdAuthDebitUI){
          if(this.hasTwdAccounts){
            applyinfo.AgreeTwdAuthDebitReserved = "";
          }else if(this.cardinfo.CardFace === 428001 || this.cardinfo.CardFace === 428178){
            applyinfo.AgreeTwdAuthDebitReserved = "Y";
          }
        }

        if (this.dsno) {
					applyinfo.DsNo = this.dsno;
				}
				else {
					if (this.referrer) {
						applyinfo.IsMgmReferer = true;
					}
					applyinfo.Referrer = this.referrer;
				}

				if (this.cminfo) {
					applyinfo.IsCardMember = this.cminfo.IsCardMember;
					//IsILoanUser(是否為房貸戶)查詢耗時較久，故分開呼叫
					applyinfo.IsILoanUser = (await this.sharedService.IsILoanUser()).Result.IsILoanUser;
					applyinfo.IsTwoFactorMember = true;
					applyinfo.Name = this.cminfo.CName;
					applyinfo.IDNumber = this.cminfo.ID;
					applyinfo.Mobile = this.cminfo.Mobile;
					if (!applyinfo.IsCardMember) {
						applyinfo.Phone = this.cminfo.Phone || "";
						const phone = applyinfo.Phone.split("-");
						if (phone.length >= 2) {
							applyinfo.Phone_1 = phone[0];
							applyinfo.Phone_2 = phone[1];
						}
						else {
							applyinfo.Phone_2 = applyinfo.Phone;
						}
					}
					if (this.IsEasternCard) {
						applyinfo.ShopCardCustId = '';
					} else {
						applyinfo.ShopCardCustId = this.cminfo.ShopMemberNo && this.cminfo.ShopMemberNo.length > 1 ?
						this.cminfo.ShopMemberNo.substring(1) : "";
					}
					applyinfo.Email = this.cminfo.Email;
					applyinfo.EnglishName = this.cminfo.EName && this.cminfo.EName.toUpperCase();
					applyinfo.Birthday = this.cminfo.Birthday;
					if (!applyinfo.IsCardMember) {
						applyinfo.Address = this.cminfo.Address;
						applyinfo.ResidenceAddress = this.cminfo.ResidenceAddress;
						applyinfo.CompanyAddress = this.cminfo.CompanyAddress;
					}
					applyinfo.ResidencePhone = this.cminfo.ResidencePhone || "";
					const rphone = applyinfo.ResidencePhone.split("-");
					if (rphone.length >= 2) {
						applyinfo.ResidencePhone_1 = rphone[0];
						applyinfo.ResidencePhone_2 = rphone[1];
					}
					else {
						applyinfo.ResidencePhone_2 = applyinfo.ResidencePhone;
					}
					if (this.cardinfo.ProductType === 2 && !applyinfo.IsILoanUser) {
						this.openlbox("#error1-lbox");
					}
					if (applyinfo.IsCardMember) {
						applyinfo.EmailSendContract = true;
					}
					else {
						applyinfo.IdCardIssueDateYYY = this.cminfo.IdCardIssueDateYYY;
						applyinfo.IdCardIssueDateMM = this.cminfo.IdCardIssueDateMM;
						applyinfo.IdCardIssueDateDD = this.cminfo.IdCardIssueDateDD;
						applyinfo.IdCardIssueLocation = this.cminfo.IdCardIssueLocation;
						applyinfo.IdCardIssueType = this.cminfo.IdCardIssueType;
						applyinfo.JobCategory = this.cminfo.JobCategory;
						applyinfo.Education = this.cminfo.Education;
						applyinfo.Company = this.cminfo.Company;
						applyinfo.CompanyPhoneAreaCode = this.cminfo.CompanyPhoneAreaCode;
						applyinfo.CompanyPhone = this.cminfo.CompanyPhone;
						applyinfo.AnnualSalary = this.cminfo.AnnualSalary;
						applyinfo.JobCategoryCode = this.cminfo.JobCategoryCode;
						applyinfo.JobCategoryIndex = this.cminfo.JobCategoryIndex;
						applyinfo.JobTitle = this.cminfo.JobTitle;
					}
					if (!this.dsno && this.cminfo.Referrer) {
						applyinfo.Referrer = this.cminfo.Referrer;
					}
					applyinfo.TaiwanDepositAccount = this.cminfo.TaiwanDepositAccount;
					applyinfo.ForeignDepositAccount = this.cminfo.ForeignDepositAccount;
					if (!!this.cminfo.Address) {
						const ParsingResult = this.GetCityAreaFromAddress(this.cminfo.Address);
						this.cminfo.AddressCity = ParsingResult.CityArea.City;
						this.cminfo.ZipCodeId = ParsingResult.CityArea.Id;
					}
					if (!!this.cminfo.ResidenceAddress) {
						const ParsingResult = this.GetCityAreaFromAddress(this.cminfo.ResidenceAddress);
						this.cminfo.ResidenceAddressCity = ParsingResult.CityArea.City;
						this.cminfo.ResidenceZipCodeId = ParsingResult.CityArea.Id;
					}
					if (!!this.cminfo.CompanyAddress) {
						const ParsingResult = this.GetCityAreaFromAddress(this.cminfo.CompanyAddress);
						this.cminfo.CompanyAddressCity = ParsingResult.CityArea.City;
						this.cminfo.CompanyZipCodeId = ParsingResult.CityArea.Id;
					}
				}
				else {
					applyinfo.IsCardMember = false;
					applyinfo.IsTwoFactorMember = false;
				}

			}
			data.applyinfo.IsOtherCardAuth = this.isOtherCardAuth = data.MemberType === 10;
			data.applyinfo.isOtherBankAuth = this.isOtherBankAuth = data.MemberType === 11;
			this.patchFormValue(data.applyinfo);

			const Birthday = data.applyinfo.Birthday ? data.applyinfo.Birthday : sessionStorage.getItem("ApplyCardIntl.DOB")
			const resp = await this.applyCardService.getShareHoldingInfo(this.cminfo.ID, Birthday);
			if (this.errorPageService.validateResponse(resp, { showMessage: false })) {
				this.isShowShareHoldingTerm = data.isShowShareHoldingTerm = resp.Result.IsShowTerm;
				this.ShareHoldingVersion = data.ShareHoldingVersion = resp.Result.Version;
			}

			if (this.branch == "ECPAY01"  || this.branchcode == "ECPAY01") {
				$('#ForEcPay').attr("disabled",'disabled');
			}

		});
	}

	checkTwdAuthDebit(cminfo: CustomerInfoModel, cardinfo: CardInfo): boolean {
		if (cminfo && cardinfo) {
			return (cminfo.ID && cminfo.IsCardMember) &&
				!cardinfo.ShowDawhoAuthDebitUI && !cardinfo.IsComboCard && !cardinfo.IsDualCurrencyCard &&
				!cminfo.IsSinopacTwdAuthDebit;
		}
		else {
			return false;
		}
	}

  checkTwdAccounts():boolean {
    return (this.twdAccounts != null && this.twdAccounts.length > 0);
  }

	/**紀錄log */
	async applyInfoLog(id:string,txn:string){
		let date = moment().format("YYYYMMDDHHmmss");
		this.session.SetValue({
			ApplyDT1:date,
			STIME:date,
			WorkTXN:txn,
			ApplyFlag:"N",
			CustID:id,
			AppType:await this.checkCardMember(id) ? "卡友":"新戶",
			ContractVer:"2023.01",
		} as ApplyInfoLogRequestModel)
		let model = this.session.GetAllValue();
		let response = await this.applyCardService.applyInfoLog(model);
		if(this.errorPageService.validateResponse(response, { showMessage: false }))
			this.session.RemoveSession();
	}

	async getBankAccounts(currencyType: number): Promise<AccountDetail[]> {
		const response = await this.applyCardService.getBankAccounts(currencyType);
		if (this.errorPageService.validateResponse(response, { showMessage: false })) {
			return response.Result.Accounts;
		}
		return [];
	}

	/** 取得台灣城市及行政區含郵遞區號組合，設定在cityAreaZip，另設cities只有城市 */
	async getZipCodeData() {
		const response = await this.sharedService.getZip3Code();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.cityAreaZip = response.Result.Items.map((x, i) => {
				return {
					Id: i,
					City: x.City,
					Area: x.Area,
					ZipCode: x.ZipCode
				} as CityAreaZipCode;
			});

			this.cities = Array.from(new Set(this.cityAreaZip.map(item => item.City)));
		}
	}

	getAreas(city: string) {
		return this.cityAreaZip && this.cityAreaZip
			.filter(item => item.City === city)
			.map(item => item);
	}

	getArea(zipCodeId: number) {
		const areas = this.cityAreaZip && this.cityAreaZip
			.filter(item => item.Id === zipCodeId)
			.map(item => item.Area);
		return areas[0];
	}

	getZipCode(zipCodeId: number) {
		const data = this.cityAreaZip && this.cityAreaZip
			.filter(item => item.Id === zipCodeId)
			.map(item => item.ZipCode);

		if (data[0] == undefined) {
			return null;
		}
		else {
			return data[0];
		};
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	private GetCityAreaFromAddress(Address: string) {
		let Area ;
		let NewAddress = Address;
		const CityArea = new CityAreaZipCode();
		CityArea.City = this.cities && this.cities
			.find(item => Address.indexOf(item) !== -1);
		Area = CityArea.City && this.getAreas(CityArea.City)
			.find(item => Address.indexOf(item.Area) !== -1);
		CityArea.Id = Area && Area.Id;

		if (CityArea.City) {
			NewAddress = NewAddress.replace(CityArea.City, '');
			if (Area) {
				NewAddress = NewAddress.replace(Area.Area, '');
			}
		}
		return { CityArea : CityArea , NewAddress : NewAddress };
	}

	private async checkCardMember(id: string, applyinfo?: SendApplyInfoRequestModel) {
		let isCardMember = false;
		const response = await this.applyCardService.checkCardMember(id);
		if (response.ResultCode === "00" || response.ResultCode === "01") {
			isCardMember = response.Result.IsCardMember;
			if(applyinfo){
				applyinfo.IsCardMember = response.Result.IsCardMember;
				applyinfo.IsILoanUser = (await this.sharedService.IsILoanUser()).Result.IsILoanUser;
			}
		}
		return isCardMember;
	}
	/** 判斷是不是東森卡 */
	private CheckEastern(CardFace: number) {
		if ( CardFace === 207178 || CardFace === 206178 ) {
			return true;
		}
		return false;
	}
	/** 判斷是不是農騰卡 */
	private CheckIsFarmerCard(CardFace: number) {
		if ( CardFace === 239090) {
			this.IsFarmerCard = true;
			return true;
		}
		return false;
	}
	/** 新客戶(非雙因) or 是卡友就不需要上傳文件 */
	private removeUnnecessarySteps(applyinfo: SendApplyInfoRequestModel) {
		if (this.wizardService.GetSteps().length >= 9) {
			if (!this.cminfo || applyinfo.IsCardMember) {
				this.wizardService.RemoveStep(7); // 移除 "上傳文件" 步驟
			}
			if (this.cminfo && this.cminfo.ID && applyinfo.IsCardMember) {
				this.wizardService.RemoveStep(5); // 移除 "同意條款" 步驟
			}
			if (!this.cardinfo.IsComboCard && !this.cardinfo.IsDualCurrencyCard) {
				// 移除 "雙幣/金融卡資料" 步驟
				this.wizardService.RemoveStep(4);
			}
			if (applyinfo.IsCardMember) {
				this.wizardService.RemoveStep(3); // 移除 "填寫詳細資料" 步驟
			}
			if (!this.cminfo || applyinfo.IsCardMember ||
				(this.source === 1 && this.cardinfo.ShowDawhoAuthDebitUI || +this.storage.CifType == 5)) {
				// 新客戶(非雙因)或卡友或大戶卡或雲端開戶導線上辦卡：不提供 "身分證OCR" 功能
				this.wizardService.RemoveStep(2); // 移除 "身分證OCR" 步驟
			}
		}
	}

	async webApply() {
		if (!this.formValidator.Validate()) { return; }
		this.route.data.subscribe(async(data) => {
			if (!data.cminfo) {
				await this.checkCardMember(this.form.value.ID, data.applyinfo);
			}
			const value = this.form.value;
			const response = await this.applyCardService.webApply(
				'信用卡', value.CName, "", value.Mobile, data.applyinfo.IsCardMember
			);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.errorPageService.display("感謝您申請永豐信用卡，我們已經收到您的申請資料！服務人員將儘快與您聯絡，若有任何問題，請洽客服專線：02-2528-7776", false,
					() => {
						this.clickWebApply = true;
					}
				);
			}
		});
	}

	public auth(auth_type: string) {
		this.closelbox();
		if (this.cardinfo.ProductType === 2) { auth_type = auth_type + '2'; }

		this.router.navigate(["/Application/ApplyCard/" + auth_type], { queryParams: {
			id: this.cardinfo.Id, br: this.branch, ref: this.referrer, cardface: isNaN(this.cardinfo.CardFace) ? null : this.cardinfo.CardFace,
			flag: this.flag, source: (isNaN(this.source) ? null : this.source)
		} });
	}

	async submit() {
    if (this.validSinopacEmail(this.form.value.Email)){
      this.formValidator.SetFocus('Email');
      this.showSinopacEmailErrMsg = true;
			return;
    }else {
      this.showSinopacEmailErrMsg = false;
    }

		if (!this.formValidator.Validate()) { return; }

		if (IsContainsFullWidthChar(this.form.value.ID)) {
			this.errorPageService.display("身分證字號請勿輸入全形", false);
			return;
		}
		else if (!IsValidId(this.form.value.ID)) {
			this.errorPageService.display("身分證字號請輸入正確格式", false);
			return;
		}

		// 檢查是否重複辦卡
		const response = await this.applyCardService.DupCheck(
			this.form.value.ID, this.cardinfo.CardFace, (this.cminfo && this.cminfo.ID && this.cminfo.ID.length > 0)
		);
		if (response.ResultCode === "01") {
			this.errorPageService.confirm('您在本行已持有相同卡別或卡片仍在審核中，恕無法重覆申辦。如有申請文件需補上傳，請按下方連結。',
					"上傳缺補文件", null, (ok) => {
				if (ok) {
					this.router.navigateByUrl("/Application/ApplyCard/Upload");
				}
			});
			return;
		}



		if ((!this.isOtherCardAuth && !this.isOtherBankAuth && this.cminfo && this.form.value.CName !== this.cminfo.CName) || !!this.cminfo.EName && (this.cminfo.IsCardMember && (this.form.value.EName !== this.cminfo.EName && this.form.value.EName !== this.cminfo.EName.toUpperCase()))) {
			var text = "";
			var text2 = "";
			var text3 = "";
			var isNameRight = this.form.value.CName !== this.cminfo.CName;
			var isEnglishNameRight = !!this.cminfo.EName && (this.form.value.EName !== this.cminfo.EName && this.form.value.EName !== this.cminfo.EName.toUpperCase());
			if(isNameRight && isEnglishNameRight) {
				text = "中/英文"
				text3 = "CName"
			}
			else if (isNameRight && !isEnglishNameRight){
				text = "中文"
				text2 = this.cminfo.IsCardMember? "<br>*提醒:請同步確認您的英文姓名是否正確":""
				text3 = "CName"
			}
			else {
				text = "英文"
				text2 = "<br>*提醒:請同步確認您的中文姓名是否正確"
				text3 = "EName"
			}
			this.errorPageService.confirm("您填具的"+text+"姓名與本行資料不符，請再次確認"+text2, "確認無誤", "重新輸入", (ok) => {
				if (ok) {
					this.doSubmit();
				}
				else {
					this.formValidator.SetFocus(text3);
				}
			});
		}
		else {
			this.doSubmit();
		}
	}

	doSubmit() {
		this.route.data.subscribe(async(data) => {
			const value = this.form.value;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			// this.branch除用來一般辦卡綠界推薦代碼來源，也用於雲端開戶核身失敗導一般辦卡的PDF BANKQA註記，改邏輯時要注意!
			// data.cminfo.BranchCode用在綠界來源的雲端開戶
			applyinfo.BranchCode = !!data.cminfo.BranchCode? data.cminfo.BranchCode:this.branch;
			applyinfo.Flag = this.flag;
			applyinfo.Source = this.source;
			applyinfo.HiCardChannel = value.HiCardChannel;
			applyinfo.NotAutoBonus = value.NotAutoBonus;
			applyinfo.Name = value.CName;
			applyinfo.IDNumber = value.ID;
			applyinfo.Mobile = value.Mobile;
			applyinfo.Email = value.Email;
			applyinfo.Referrer = value.Referrer;
			applyinfo.IsElasticLimit = value.IsElasticLimit;
			applyinfo.EmailSendContract = value.EmailSendContract;
			applyinfo.IBankAgreement = value.IBankAgreement;
			if (!this.IsFarmerCard) {
				applyinfo.DeliverPassword = value.DeliverPassword;
			}
			if (this.cminfo && this.cminfo.ID && this.cminfo.IsCardMember) {
				applyinfo.AgreeTnC = value.AgreeTnC;
				applyinfo.AgreeBrandedCard = value.AgreeBrandedCard;
				applyinfo.ShareHoldingFlag = value.ShareHoldingFlag ? value.ShareHoldingFlag : (this.isShowShareHoldingTerm ? "N" : "");
				applyinfo.ShareHoldingVersion = applyinfo.ShareHoldingFlag ? this.ShareHoldingVersion : "";
				applyinfo.AgreeAllCompany = value.AgreeAllCompany;
				applyinfo.AgreeThirdParty = value.AgreeThirdParty;
				applyinfo.MobileVerificationServices = value.MobileVerificationServices;
				applyinfo.EnglishName= value.EName;
				if (this.cardinfo.ProductType === 3 || this.cardinfo.IsVirtualCard) {
					applyinfo.AgreeVirtualCard = value.AgreeVirtualCard;
				}
				if (this.flag === "01" && this.cardinfo.IsPriorActivateCard) {
					applyinfo.AgreePriorActivateCard = value.AgreePriorActivateCard;
				}
				if (this.cardinfo.ShowDawhoAuthDebitUI) {
					applyinfo.AgreeDawhoAuthDebit = value.AgreeDawhoAuthDebit;
					applyinfo.DawhoAuthDebitAmount = value.DawhoAuthDebitAmount;
				}
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
				applyinfo.ReceiveAddressType = value.ReceiveAddressType;
				applyinfo.ReceiveAddress = value.ReceiveAddress;

				if (applyinfo.ReceiveAddressType === 1) {
					applyinfo.ZipCode = this.getZipCode(this.cminfo.ZipCodeId)?this.getZipCode(this.cminfo.ZipCodeId):this.cminfo.ZipCode;
					applyinfo.Address = value.ReceiveAddress;
				}
				else if (applyinfo.ReceiveAddressType === 2) {
					applyinfo.ResidenceZipCode = this.getZipCode(this.cminfo.ResidenceZipCodeId)?this.getZipCode(this.cminfo.ResidenceZipCodeId):this.cminfo.ResidenceZipCode;
					applyinfo.ResidenceAddress = value.ReceiveAddress;
				}
				else if (applyinfo.ReceiveAddressType === 3) {
					applyinfo.CompanyZipCode = this.getZipCode(this.cminfo.CompanyZipCodeId)?this.getZipCode(this.cminfo.CompanyZipCodeId):this.cminfo.CompanyZipCode;
					applyinfo.CompanyAddress = value.ReceiveAddress;
				}
				else {
					this.form.controls.ReceiveAddressZipCode.setValue(undefined);
					this.form.controls.ReceiveAddress.setValue(undefined);
				}
			}
			applyinfo.ShopCardCustId = this.IsEasternCard ? value.FranchiseeId : value.ShopCardCustId;
			applyinfo.ShopCardUnableIssue = value.ShopCardUnableIssue;
			applyinfo.MctBrandedCardUnableIssue = value.MctBrandedCardUnableIssue;
			applyinfo.StmtDeliverWay = value.StmtDeliverWay;

			if (!applyinfo.IsCardMember || !data.cminfo) {
				await this.checkCardMember(value.ID, applyinfo);
			}
			const response = await this.applyCardService.step(
				value.CName, value.Mobile, applyinfo.IsCardMember, this.cardinfo.Id, applyinfo.IDNumber
			);
			if (response.ResultCode === "00") {
				applyinfo.StepRowId = response.Result.RowId;
			}
			this.removeUnnecessarySteps(applyinfo);

			SensorsTrackSubmit('CardApplicationFirstInformationSubmission', this.storage.CardTitle, this.storage.CardType,
				true, '', !!this.storage.UserId, !!this.cminfo,
				applyinfo.IsCardMember, applyinfo.IsOtherCardAuth, applyinfo.Source, this.isOtherBankAuth ? '他行臺幣存款帳戶驗證申請' : null);

			if (this.cardinfo.ProductType === 2 && !data.applyinfo.IsILoanUser) {
				this.openlbox("#error1-lbox");
			}
			else {
				if (!this.cminfo || !this.cminfo.ID || !this.cminfo.IsCardMember) {
					this.errorPageService.display("提醒您，若您透過網路辦卡，系統將預設為使用電子/行動帳單，不再寄送紙本帳單。若您需紙本帳單，請於核卡後透過客服專線申請。", false, () => {
						if (!data.cminfo && applyinfo.IsCardMember) {
							this.openlbox("#cardmember-lbox");
						}
						else{
							this.wizardService.GoToNextStep();
						}
					});
				}
				else {
					this.wizardService.GoToNextStep();
				}
			}
		});
	}

	public goNext() {
		this.closelbox();
		this.wizardService.GoToNextStep();
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	private closelbox() {
		$('.lboxed').trigger('close');
	}

	public getShareHoldingTermPDFUrl() {
		if(environment.IsMobile) {
			return "/m/SinoCard/api/Agreement/ShareHoldingTermPDF#open-browser";
		}
		else {
			return "/SinoCard/api/Agreement/ShareHoldingTermPDF#open-browser";
		}
	}

  public validSinopacEmail(email: string):boolean{
    return email.toLowerCase().includes('sinopac.com') && window['eweb_config'].validSinopacEmail;
  }
}
