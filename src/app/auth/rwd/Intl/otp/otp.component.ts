import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetLanguage, LocaleMessages } from 'app/application/applycard-intl/shared/LocaleMessages';
import { ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';
import { ApplyCardService } from 'app/application/applycard/services/applycard.services';
import { AuthService } from 'app/auth/services/auth.service';
import { ErrorPageService, FormValidator, MemoryStorage, MyFormControl, PageInfoService, SessionStorage, SharedService, SsoService
} from 'app/shared/shared.module';
import { ApplyCardPageName, ApplyCardPushGTM, OpenLightbox, SensorsTrack, getCustomerAge } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Component({
	selector: 'app-applycard-intl-otp',
	templateUrl: './otp.component.html',
})
export class OtpIntlComponent implements OnInit, OnDestroy {
	private cardface: number;
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public IsMobile = environment.IsMobile;
	public code: number;
	public countdown = 0;
	public mobileNo: string;
	public sessionKey: string;
	public sso = false;
	language: string = GetLanguage();
	message = LocaleMessages[this.language].Otp;
	btnMessage = LocaleMessages[this.language].Button;
	MasterTitle = LocaleMessages[this.language].shard.Title.SMSOTPVer;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

	constructor(
		public pageinfo: PageInfoService,
		private applyCardService: ApplyCardService,
		private route: ActivatedRoute,
		private router: Router,
		private ssoService: SsoService,
		private authService: AuthService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
    private sharedService: SharedService,
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
		});
		this.route.params.subscribe(params => this.code = +params.code);
		const controls: Array<MyFormControl> = [
			{
				Name: 'OTP',
				ErrMsg: this.message.ErrMsg.OTPPinErr + '<br>驗證簡訊動態密碼為空或格式有誤',
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
		$('body').addClass('bilingual-version');
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.OTP驗證, this.storage.ApplyCardSource);
		this.sso = !!await this.ssoService.getSsoResult();
		this.cardface = +this.storage.CardFace;
		if (this.code === 1) {
			if (this.cardface === 293178 || this.cardface === 293179) {
				this.sportCardDupCheck(this.cardface.toString());
			}
			else if (!(await this.checkApplyCardGroup(this.cardface.toString()))) {
				this.errorPageService.display(`您已申辦過與${this.storage.CardTitle}同類型卡片，建議重新選擇其他卡片`, false,
				() => this.router.navigateByUrl('/Application/ApplyCard'));
			}
		}

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
			const response = await this.authService.queryMobile(0);
			if (this.errorPageService.validateResponse(response)) {
				this.mobileNo = response.Result.Mobile;
				this.sessionKey = response.Result.SessionKey;
			}
		}
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	async generateOTP() {
		let msg = '';
		if (!this.mobileNo) {
			const CErrMsg = "您在本行未留存手機號碼，無法驗證簡訊動態密碼!"
			msg = this.message.ErrMsg.NoMobileNum ? this.message.ErrMsg.NoMobileNum + '<br>' + CErrMsg : CErrMsg;
			this.trackGenerateOTP(false, msg);
			this.errorPageService.display(msg, false);
		}
		else if (this.countdown > 0) {
			const CErrMsg = "您剛剛傳送的簡訊密碼尚未失效!"
			msg = this.message.ErrMsg.NotExpYet ? this.message.ErrMsg.NotExpYet + '<br>' + CErrMsg : CErrMsg;
			this.trackGenerateOTP(false, msg);
			this.errorPageService.display(msg, false);
		}
		else {
			const response = await this.authService.generateOTP(this.mobileNo, this.code, this.sessionKey);
			const errMsg = this.message.GenerateOTPMessage[response.ResultCode] ?
				this.message.GenerateOTPMessage[response.ResultCode] + '<br>' + response.ResultMessage : response.ResultMessage;
			if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg })) {
				this.countdown = 120;
				this.storage.MobileNo = this.mobileNo;
				this.storage.SessionKey = this.sessionKey;
			}
			this.trackGenerateOTP(response.ResultCode === "00", response.ResultMessage);
		}
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		let sTime = moment().format("YYYYMMDDHHmmss");
		const response = await this.authService.verifyOTP(this.code, this.form.value.OTP);
		const errMsg = this.message.ResultMessage[response.ResultCode] ?
			response.ResultCode === '04' ?
				this.message.ResultMessage[response.ResultCode].replace('{0}', response.Result.VerifyFailCount) + '<br>' + response.ResultMessage
				: this.message.ResultMessage[response.ResultCode] + '<br>' + response.ResultMessage
			: response.ResultMessage;//ResultCode = 04 時，替換錯誤次數
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg })) {
			let vTime = moment().format("YYYYMMDDHHmmss");
			this.session.SetValue({
				OTP:this.form.value.OTP,
				OTPReqDT:sTime,
				OTPRespDT:vTime,
			} as ApplyInfoLogRequestModel);
			this.router.navigateByUrl(this.returnUrl);
		}
		this.trackSubmit(response.ResultCode === "00", response.ResultMessage);
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	trackGenerateOTP(success: boolean, msg: string) {
		if (this.code === 1 || this.code === 3 || this.code === 7 || this.code === 9 || this.code === 13) {
			const authType = this.getAuthTypeName();
			SensorsTrack('CardApplicationSMS', this.storage.CardTitle, this.storage.CardType, authType, '', success, success ? '' : msg);
		}
	}

	trackSubmit(success: boolean, msg: string) {
		if (this.code === 1 || this.code === 3 || this.code === 7 || this.code === 9 || this.code === 13) {
			const authType = this.getAuthTypeName();
			SensorsTrack('CardApplicationSMSVerification', this.storage.CardTitle, this.storage.CardType, authType, '', success, success ? '' : msg);
		}
	}

	public getAuthTypeName(): string {
		let authTypeName = '';
		if (this.sso) {
			authTypeName = 'MMA會員';
		}
		else if (this.code === 1 || this.code === 3 || this.code === 9) {
			authTypeName = '永豐卡友/存戶';
		}
		else if (this.code === 7) {
			authTypeName = '他行信用卡驗證申請';
		}

		return authTypeName;
	}

	async checkApplyCardGroup(cardface: string) {
		const response = await this.applyCardService.checkApplyCardGroup(cardface, "");
		return (response.ResultCode === "00");
	}

	// 運動卡(293178、293179)要檢查另一張+舊卡(293301)是否申請過
	async sportCardDupCheck(cardface: string) {
		const check = await this.checkApplyCardGroup(cardface);
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
      this.errorPageService.confirm("提醒您刷卡消費時請先規劃還款方式，若當期未能繳清款項，至少應繳交每月對帳單上之最低應繳金額，若發生延遲繳款除需負擔違約金及循環信用利息外，將對個人「信用紀錄」造成嚴重不良影響。", "我已了解", null, null, false, false, '<span style="font-size:29px">重要說明</span>');
    }else if(age >= 65){
      this.errorPageService.confirm("提醒您謹慎評估信用卡使用需求，請勿相信不實廣告或投資邀約，以免受騙而造成財物損失及影響您的生活品質。", "我已了解", null, null, false, false, '<span style="font-size:29px">重要說明</span>');
    }
  }
}
