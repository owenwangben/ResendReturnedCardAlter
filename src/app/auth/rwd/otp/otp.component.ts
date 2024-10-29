import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { setInterval } from 'timers';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, SharedService, MemoryStorage,
			SsoService,
			SessionStorage} from 'app/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { OpenLightbox, ApplyCardPushGTM, ApplyCardPageName, SensorsTrack, GetQueryParam, getCustomerAge } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import { ApplyCardService } from 'app/application/applycard/services/applycard.services';
import { AccountDetail, ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';
import * as moment from 'moment';
import { PermCLILogRequestModel } from 'app/transaction/perm-cli/services/perm-cli.models';
import swal from 'sweetalert2';

@Component({
	selector: 'app-auth-otp',
	templateUrl: './otp.component.html'
})
export class OTPComponent implements OnInit, OnDestroy {
	private source: number;
	private cardface: number;
	private returnUrl: string;
	private returnParams: string;
	private token: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public IsMobile = environment.IsMobile;
	/**
	 * 功能代碼
	 * - 1: 線上辦卡(雙因)
	 * - 2: 線上辦卡(非雙因) --> not used
	 * - 3: 線上申請好房卡(雙因)
	 * - 4: 臨調
	 * - 5: 永調
	 * - 6: 好房卡永調
	 * - 7: 線上辦卡(以卡辦卡)
	 * - 8: 變更電子郵件信箱
	 * - 9: 線上辦卡(虛擬卡)
	 * - 10: 虛擬卡卡號查詢
	 * - 11: 虛擬卡永調
	 * - 12: 線上預借現金申請
	 * - 13: 線上辦卡(數位帳戶)
	 * - 14: 行動/電子帳單設定
	 * - 15: 簽帳金融卡換發
	 * - 16: 信用卡費溢繳退回
	 * - 17: 預借現金卡友驗證
	 * - 18: 預借現金分期(易通財)卡友驗證
	 * - 19: 帳單分期卡友驗證
	 * - 20: 單筆消費分期卡友驗證
	 * - 21: 消費分期約定事項卡友驗證
	 * - 23: 雲端開戶導線上辦卡
	 */
	public code: number;
	public countdown = 0;
	public mobileNo: string;
	public sessionKey: string;
	public enableOTP = true;
	public sso = false;
	public notice = '';
	public isbankuser: boolean;
	public isdualcurrencycard: boolean;
	public authtype: boolean;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);
	private permCli = new SessionStorage<PermCLILogRequestModel>(PermCLILogRequestModel);

	public constructor(
		public pageinfo: PageInfoService,
		private applyCardService: ApplyCardService,
		private route: ActivatedRoute,
		private router: Router,
		private ssoService: SsoService,
		private authService: AuthService,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
	) {
		this.route.queryParams.subscribe(params => {
			const src = +params.source;
			this.source = !isNaN(src) ? src : 0;
			this.returnUrl = params.return;
			const returnPathQueryPair = this.returnUrl && this.returnUrl.split('?');
			this.returnParams = returnPathQueryPair && returnPathQueryPair[1];
			this.token = GetQueryParam(this.returnUrl, "token");
		});
		this.route.params.subscribe(params => this.code = +params.code);
		const controls: Array<MyFormControl> = [
			{
				Name: 'OTP',
				ErrMsg: '驗證簡訊動態密碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			}
		];
		this.form = this.formValidator.MakeFormGroup(controls);
	}

	public async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.OTP驗證, this.storage.ApplyCardSource);
		this.sso = !!await this.ssoService.getSsoResult();

		this.cardface = +this.storage.CardFace;
		this.isdualcurrencycard = this.IsDualCurrencyCard(this.cardface);
		this.isbankuser = this.storage.IsBankUser === 'true'? true:false;
		this.authtype = this.checkauthtype(this.storage.AuthType);

		if (this.code === 1) {
			if (this.cardface === 293178 || this.cardface === 293179) {
				this.sportCardDupCheck(this.cardface.toString(), this.token);
			}
			else if (!(await this.checkApplyCardGroup(this.cardface.toString(), this.token))) {
				this.errorPageService.display(`您已申辦過與${this.storage.CardTitle}同類型卡片，建議重新選擇其他卡片`, false,
				() => this.router.navigateByUrl('/Application/ApplyCard'));
			}
			else if ((this.IsDualCurrencyCard(this.cardface) || this.IsDualCurrencyComboCard(this.cardface)) && this.source !== 1 && this.source !== 2) {
				// 一般流程申請幣倍卡: 檢查是否可申辦幣倍卡
				await this.checkCurrencyCardApply();
			}
      else if (this.cardface === 426090){// 大戶金屬卡申辦資格檢核
        await this.dawhoMetalCheck();
      }
		}
		else if (this.code === 3 || this.code === 6) {
			const cminfo = await this.getCustomerInfo();
			// IsILoanUser:是否為房貸戶
			const IsILoanUser = (await this.sharedService.IsILoanUser()).Result.IsILoanUser;
			if (!cminfo.IsCardMember && this.code === 6) {
				this.errorPageService.display('您沒有任何有效卡，按下確定後將前往線上申辦好房卡。', false,
					() => this.router.navigateByUrl('/Application/ApplyCard?IsHouseLoanCard=true'));
			}
			else if (!IsILoanUser) {
				this.openlbox(`#error${this.code}-lbox`);
			}
		}
    else if (this.code === 7) { //線上辦卡(以卡辦卡)
      if (this.cardface === 426090){// 大戶金屬卡申辦資格檢核
        await this.dawhoMetalCheck();
      }
    }
		else if (this.code === 9) { // 線上辦卡(虛擬卡)
			let cardtype = "";
			const cardfaceKeyValue = this.returnParams && this.returnParams.split("&").filter(it => it.toLocaleLowerCase().startsWith("cardface"));
			if (cardfaceKeyValue && cardfaceKeyValue.length > 0) {
				const cardface = cardfaceKeyValue[0].split("=");
				if (cardface.length >= 2 && cardface[1].length >= 6) {
					cardtype = cardface[1].slice(0, 3);
				}
			}
			await this.canApplyVirtaulCard(cardtype);
		}
		else if (this.code === 10 || this.code === 11) {
			// 虛擬卡卡號查詢, 虛擬卡永調
			await this.checkIsVirtualCardMember();
		}
    else if (this.code === 13) { //線上辦卡(數位帳戶)
      if (this.cardface === 426090){// 大戶金屬卡申辦資格檢核
        await this.dawhoMetalCheck();
      }
    }
		else if (this.code === 15) {
			await this.checkDebitCardApply();
		}
		else if (this.code === 16) {
			this.notice = '，若您的手機門號有異動，請洽客服02-25287776。';
			await this.checkCreditRefund();
		}

    if(!swal.isVisible() && this.isApplyCardCode())
        await this.showCustomerAgeMessage();

		setInterval(() => {
			if (this.countdown > 0) {
				this.countdown--;
			}
		}, 1000);
		if ((this.code === 1 || this.code === 7) && this.storage.MobileNo) { // 他行臺幣存款帳戶驗證 / 他行信用卡驗證
			this.mobileNo = this.storage.MobileNo;
			this.sessionKey = this.storage.SessionKey;
		}
		else {
			const response = await this.authService.queryMobile(this.queryMobileType);
			if (this.errorPageService.validateResponse(response)) {
				this.mobileNo = response.Result.Mobile;
				this.sessionKey = response.Result.SessionKey;
			}
		}
	}

	get queryMobileType(): number {
		let queryMobileType = 0;

		if (this.code === 13) {
			queryMobileType = 1; // 數位帳戶(大戶卡)
		}
		else if (this.source === 1) {
			queryMobileType = 2; // 數位帳戶(運動卡)
		}
		else if (this.code === 16) {
			queryMobileType = 3; // 信用卡溢繳退款
		}
		return queryMobileType;
	}

	/**
	 * 簽帳金融卡換發：資格檢查
	 */
	async checkDebitCardApply() {
		try {
			// 檢核網銀客戶(會員身分 1、3)
			if (await this.sharedService.isMmaMember(true)) {
				// 檢核是否具有效的臺幣帳戶
				let resultCode = "XX";
				// 檢核是否無有效的晶片金融卡(無卡、註銷、未開卡)，或已持有簽帳金融卡
				const checkDebitCardApplyResp = await this.sharedService.checkDebitCardApply();
				resultCode = checkDebitCardApplyResp.ResultCode;
				const resultMessage = checkDebitCardApplyResp.ResultMessage;
				if (resultCode !== "00") {
					this.pageinfo.name = '簽帳金融卡換發';
					this.errorPageService.display(this.getCheckApplyMessage(resultCode, resultMessage), true);
				}
			}
			else {
				this.pageinfo.name = '簽帳金融卡換發';
				this.errorPageService.display('您尚未申請本項網路服務！如有需要，請您攜帶身分證件至任一分行辦理或洽24小時客服中心詢問。', true);
			}
		} catch (error) {
			console.log(error);
			this.pageinfo.name = '簽帳金融卡換發';
			this.errorPageService.display('系統維護中，請稍後再試', true);
		}
	}

	async checkIsVirtualCardMember() {
		const response = await this.sharedService.CheckVirtualCard();
		if (response.ResultCode !== "00") {
			this.enableOTP = false;
			if (this.code === 10) {
				this.pageinfo.name = "虛擬卡卡號查詢";
			}
			else if (this.code === 11) {
				this.pageinfo.name = "虛擬卡額度調整";
			}
			this.errorPageService.display(response.ResultMessage, true);
		}
	}

	// 檢查是否可申辦幣倍卡
	async checkCurrencyCardApply() {
		const CurrencyType = this.getCurrencyType(this.cardface);
		const BankAccounts = await this.getBankAccounts(CurrencyType);
		const NormalAccount = BankAccounts.filter( p => p.IsDigitalAccount === false);
		const DigitalAccount = BankAccounts.filter( p => p.IsDigitalAccount === true);
		if (BankAccounts.length === 0) {
			if (await this.IsDAWHODigitAccountExist() && this.IsDualCurrencyCard(this.cardface)) {
				// Continue CardApply
			} else {
				this.errorPageService.confirm("提醒您！您尚未開立本行外幣存款帳戶，建議重新選擇申請其他卡片，或可親臨永豐銀行各分行辦理開戶或直接線上開立DAWHO數位帳戶。", "重新選擇卡片", "DAWHO數位開戶", (ok) => {
					if (ok) {
						this.router.navigateByUrl('/Application/ApplyCard');
					}
					else {
						window.location.href = 'https://dawho.tw/' ;
					}
				});
			}
		} else {
			if (NormalAccount.length === 0 && this.IsDualCurrencyComboCard(this.cardface)) {
				this.errorPageService.confirm("提醒您！您尚未開立本行實體外幣存款帳戶，建議重新選擇申請其他卡片，或可親臨永豐銀行各分行辦理開戶。", "重新選擇卡片", "查詢分行", (ok) => {
					if (ok) {
						this.router.navigateByUrl('/Application/ApplyCard');
					}
					else {
						if (this.IsMobile) {
							window.location.href =
							'https://m.sinopac.com/m/bank/easy_index_preServiceNum/m_branches_nearby.aspx';
						}
						else {
							window.location.href =
							'https://bank.sinopac.com/MMA8/CustomerService/BranchService/branch.html';
						}
					}
				});
			}
		}
	}

	async IsDAWHODigitAccountExist() {
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

	async getCustomerInfo() {
		const response = await this.sharedService.GetCustomerInfo(1);
		if (this.errorPageService.validateResponse(response, { showMessage: false })) {
			return response.Result;
		}
		return null;
	}

	async canApplyVirtaulCard(cardtype?: string) {
		const response = await this.sharedService.CanApplyVirtaulCard(cardtype);
		if (response.ResultCode === "01") {
			this.errorPageService.display("您不符申辦資格，謝謝。", false, () => {
				this.router.navigateByUrl('/Application/ApplyCard');
			});
		}
		else if (response.ResultCode !== "00") {
			this.errorPageService.display(response.ResultMessage, false);
		}
		if (response.ResultCode !== "00") {
			this.enableOTP = false;
		}
	}

	async generateOTP() {
		let msg = '';
		if (!this.mobileNo) {
			msg = "您在本行未留存手機號碼，無法驗證簡訊動態密碼!";
			this.trackGenerateOTP(false, msg);
			this.errorPageService.display(msg, false);
		}
		else if (this.countdown > 0) {
			msg = "您剛剛傳送的簡訊密碼尚未失效!";
			this.trackGenerateOTP(false, msg);
			this.errorPageService.display(msg, false);
		}
		else {
			const response = await this.authService.generateOTP(this.mobileNo, this.code, this.sessionKey);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.countdown = 120;
				this.storage.MobileNo = this.mobileNo;
				this.storage.SessionKey = this.sessionKey;
			}
			this.trackGenerateOTP(response.ResultCode === "00", response.ResultMessage);
		}
	}

	routeToApplyCard() {
		this.router.navigateByUrl('/Application/ApplyCard/New?' + this.returnParams, { relativeTo: this.route });
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		let sTime = moment().format("YYYYMMDDHHmmss");
		const response = await this.authService.verifyOTP(this.code, this.form.value.OTP);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			let vTime = moment().format("YYYYMMDDHHmmss");
			await this.updateApplyStatus(this.cardface.toString(), this.token);
			this.session.SetValue({
				OTP: this.form.value.OTP,
				OTPReqDT: sTime,
				OTPRespDT: vTime,
			} as ApplyInfoLogRequestModel);
			this.permCli.SetValue({
				OTPCellNo: this.form.value.OTP,
				OTPReqDT: sTime,
				OTPRespDT: vTime,
			} as PermCLILogRequestModel);
			this.router.navigateByUrl(this.returnUrl);
		}
		this.trackSubmit(response.ResultCode === "00", response.ResultMessage);
	}

	async otherSubmit(auth_type: string) {
		this.closelbox();
		this.router.navigateByUrl('/Application/ApplyCard/'+auth_type+ '?' + this.returnParams);
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	public closelbox() {
		$('.lboxed').trigger('close');
	}

	trackGenerateOTP(success: boolean, msg: string) {
		if (this.code === 1 || this.code === 3 || this.code === 7 || this.code === 9 || this.code === 13) {
			const authType = this.getAuthTypeName();
			SensorsTrack('CardApplicationSMS', this.storage.CardTitle, this.storage.CardType, '', authType, success, success ? '' : msg);
		}
	}

	trackSubmit(success: boolean, msg: string) {
		if (this.code === 1 || this.code === 3 || this.code === 7 || this.code === 9 || this.code === 13) {
			const authType = this.getAuthTypeName();
			SensorsTrack('CardApplicationSMSVerification', this.storage.CardTitle, this.storage.CardType, '', authType, success, success ? '' : msg);
		}
	}

	public checkauthtype(authtype): boolean {
		if(authtype === "OtherCard" || authtype === "OtherBank" ) {
			return true;
		}
		else {
			return false;
		}
	}

	public getAuthTypeName(): string {
		let authTypeName = '';
		if (this.sso) {
			authTypeName = 'MMA會員';
		}
		else if (this.code === 13) {
			authTypeName = 'DAWHO辦卡';
		}
		else if (this.code === 1 || this.code === 3 || this.code === 9) {
			authTypeName = '永豐卡友/存戶';
		}
		else if (this.code === 7) {
			authTypeName = '他行信用卡驗證申請';
		}

		return authTypeName;
	}

	private async getBankAccounts(currencyType: number): Promise<AccountDetail[]> {
		const response = await this.applyCardService.getBankAccounts(currencyType);
		if (this.errorPageService.validateResponse(response, { showMessage: false })) {
			return response.Result.Accounts;
		}
		return [];
	}

	/**
	 * 由CardFace判斷是否為幣倍卡-信用卡
	 */
	public IsDualCurrencyCard(CardFace: number): boolean {
		// 幣倍卡 信用卡
		const DualCurrencyCardFace = [212392, 211840, 213978];
		const FilterResult = DualCurrencyCardFace.filter(p => p === CardFace);
		if (FilterResult && FilterResult.length > 0) {
			return true;
		}
		return false;
	}

	/**
	 * 由CardFace判斷是否為幣倍卡-信用卡&金融卡
	 */
	public IsDualCurrencyComboCard(CardFace: number): boolean {
		// 幣倍卡 金融卡
		const DualCurrencyComboCard = [237038, 247038, 238038];
		const FilterResult = DualCurrencyComboCard.filter(p => p === CardFace);
		if (FilterResult && FilterResult.length > 0) {
			return true;
		}
		return false;
	}

	/**
	 * 取得幣倍卡對應的幣別
	 */
	private getCurrencyType(CardFace: number): number {
		let type = 0;
		switch (CardFace) {
			case 212392:
			case 237038:
				type = 3;
				break;
			case 211840:
			case 247038:
				type = 2;
				break;
			case 213978:
			case 238038:
				type = 4;
				break;
		}
		return type;
	}

	/**
	 * 取得換發失敗訊息
	 */
	private getCheckApplyMessage(resultCode: string, resultMessage: string): string {
		switch (resultCode) {
			case "03":
				return '很抱歉，您已經申請換發簽帳金融卡，無法再次申請，若有任問題，請洽客服專線(02)2528-7776';
			case "04":
				return resultMessage;
			default:
				return '很抱歉，無法提供您換發簽帳金融卡服務，若有任何問題，請洽客服專線(02)2528-7776';
		}
	}

	async checkCreditRefund() {
		try {
			// 檢核是否符合信用卡費溢繳退申請資格(已登入MMA才會在這裡進行檢查)
			const response = await this.sharedService.checkCreditRefund();
			if (response.ResultCode !== "00") {
				this.pageinfo.name = '信用卡溢繳退款申請';
				this.errorPageService.display(response.ResultMessage, true);
			}
		} catch (error) {
			console.log(error);
			this.pageinfo.name = '信用卡溢繳退款申請';
			this.errorPageService.display('系統維護中，請稍後再試', true);
		}
	}

	async checkApplyCardGroup(cardface: string, Data: string) {
		const response = await this.applyCardService.checkApplyCardGroup(cardface, Data);
		return (response.ResultCode === "00");
	}

	async updateApplyStatus(cardface: string, Data: string) {
		const response = await this.applyCardService.updateApplyStatus(cardface, Data);
		return (response.ResultCode === "00");
	}

	// 運動卡(293178、293179)要檢查另一張+舊卡(293301)是否申請過
	async sportCardDupCheck(cardface: string, Data: string) {
		const check = await this.checkApplyCardGroup(cardface, Data);
		if (!check) {
			this.errorPageService.display(`您已申辦過與SPORT卡同類型卡片，請重新選擇其他卡片`, false,
				() => this.router.navigateByUrl('/Application/ApplyCard'));
		}
		else {
			const response = await this.applyCardService.DupCheck(
				this.storage.CustId, 293301, true
			);
			if (response.ResultCode === "01") {
				this.showSportCard30DaysError();
			}
		}
	}

	public showSportCard30DaysError(): void {
		this.errorPageService.display(`您現已持有SPORT卡，原卡戶正附卡<span style='color: red;font-weight: bold;'><u>將於新申辦SPORT卡核發後30天自動失效</u></span>，若原卡有設定扣繳款項，提醒您記得通知扣繳單位進行變更設定。`, false);
	}

  public async dawhoMetalCheck():Promise<void> {
    const response = await this.applyCardService.checkDawhoApply(this.storage.CustId);
    if(response.ResultCode != '00') {
      let message = '';
      switch(response.ResultCode){
        case '01':
          message = '您已申辦過與DAWHO現金回饋金屬卡同類型卡片，請重新選擇其他卡片';
          break;
        case '02':
          message = '感謝您的申請，您尚未符合DAWHO現金回饋卡【金屬限量版】卡面申請資格。';
          break;
        default:
          message = '系統整理中，請稍後再試。';
          break;
      }
      this.errorPageService.display(message, false, () => this.router.navigateByUrl('/Application/ApplyCard?CardFace=426090&mode=1&source=1'));
    }
  }

  public async showCustomerAgeMessage():Promise<void> {
    let birthday = '';
    if(this.sso) {
      const birthResp = await this.sharedService.GetBirthdayById(this.storage.CustId);
			if (birthResp.ResultCode === "00") {
				birthday = birthResp.Result ? birthResp.Result.Birthday : "";
			}
    }else{
      birthday = sessionStorage.getItem("ApplyCardIntl.DOB");
    }

    let age = getCustomerAge(birthday);
    if(age >= 18 && age <= 25){
      this.errorPageService.confirm("提醒您刷卡消費時請先規劃還款方式，若當期未能繳清款項，至少應繳交每月對帳單上之最低應繳金額，若發生延遲繳款除需負擔違約金及循環信用利息外，將對個人「信用紀錄」造成嚴重不良影響。", "我已了解", "", null, false, false, '<span style="font-size:29px">重要說明</span>');
    }else if(age >= 65){
      this.errorPageService.confirm("提醒您謹慎評估信用卡使用需求，請勿相信不實廣告或投資邀約，以免受騙而造成財物損失及影響您的生活品質。", "我已了解", "", null, false, false, '<span style="font-size:29px">重要說明</span>');
    }
  }

  public isApplyCardCode():boolean{
    return (this.code === 23 ||this.code === 13 || this.code === 9 || this.code === 7 || this.code === 6|| this.code === 3 || this.code === 1);
  }
}
