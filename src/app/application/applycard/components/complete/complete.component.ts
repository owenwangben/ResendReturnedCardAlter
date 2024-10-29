import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SendApplyInfoRequestModel, CardInfo } from '../../services/applycard.models';
import { ApplyCardPushGTM, ApplyCardPageName, OpenLightbox, StoreMyDataLoginData, IsAndroid, IsFromApp, storeMyDataLoginRequest, IsFromIOS, objectToEncryptString } from 'app/shared/utilities';
import { MemoryStorage, SharedService, ErrorPageService, BaseResponse } from 'app/shared/shared.module';
import { MyDataLoginRequestModel, MyDataLoginResponseModel, MyDataDoRequestModel, CustomerInfoModel, MyDataRegisterRequestModel, MyDataSerialRequestModel, MyDataSerialResponseModel } from 'app/shared/shared.models';
import { environment } from 'environments/environment';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';

import { ApplyCardService } from '../../services/applycard.services';

@Component({
	selector: 'app-applycard-complete',
	templateUrl: './complete.component.html',
	styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit, OnDestroy {
	flag = 0;
	showMgmButton = false;
	applyFlag: String = "";
	source: number;
	isDawhoCard = false;
	cardinfo: CardInfo;
	cminfo: CustomerInfoModel;
	dsno: string;
	IDNumber: string;
	step: number;
	applyinfo: SendApplyInfoRequestModel;
	mydataForm: MyDataLoginResponseModel;
	isMobile = environment.IsMobile;
	noTwdAccount = true;
	applyDawhoUrl= 'https://applydawho.sinopac.com/OpenAccount/OpenAccount/WhichOne?_sasdk=dMTg1MmYzM2EwYzM0MjQtMDkzZDYyNDE5OTA5YzMtNzY0OTJlMjktMTA0OTA4OC0xODUyZjMzYTBjNGU2Nw&_ga=2.186412266.27651935.1672211641-1426767701.1672052280#';
	isSpecialCard = false;
	public personalDataTermsUrl = '';
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();
	isMitsuiOutletParkCard;
	public isApp = IsFromApp();
  public isAndroid = IsAndroid();
  public isFromIOS = IsFromIOS();
  public isShowDawhoAd: boolean = false;
  public isCardMember: boolean = false;
  public agreeTwdAuthDebitReserved: string;
  public completed: boolean;

	constructor(
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private sharedService: SharedService,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private agreenregulationhandleservice: AgreenRegulationHandleService
	) {
		this.route.data.subscribe(data => {
			this.route.queryParams.subscribe(params => {
				this.dsno = params.DsNo;
				this.step = data.step;
				if (data.step >= 0) {
          this.isShowDawhoAd = data.IsShowDawhoAd;
					this.cardinfo = data.cardinfo;
					this.isMitsuiOutletParkCard = !!this.cardinfo.IsMitsuiOutletParkCard;
					const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
					this.applyinfo = data.applyinfo;
          this.isCardMember = this.applyinfo.IsCardMember;
          this.agreeTwdAuthDebitReserved = this.applyinfo.AgreeTwdAuthDebitReserved;
					this.completed = data.completed;
					this.cminfo = data.cminfo;
					this.noTwdAccount = (this.cminfo.TwdAcconts == null || this.cminfo.TwdAcconts.length <= 0);
					this.isSpecialCard = this.CheckIsSpecialCard(this.cardinfo.CardFace); // 特選卡不顯示大戶/幣倍信用卡推薦訊息
					// 20230103 修改大附連結的URL 統一採用初始設定
					// this.applyDawhoUrl = `https://apply.sinopac.com/OpenAccount/OpenAccount/Login` +
					// 	`?${this.isSpecialCard ? 'ApplyCard=0&' : ''}` +
					// 	`utm_source=mma&utm_medium=links&utm_term=nonpaid&utm_content=na&utm_campaign=OnCard${this.cardinfo.CardFace}ToDW20201130#open-browser`;

					if (applyinfo.IsTwoFactorMember) {
						if (applyinfo.IsCardMember || this.completed) {
							this.flag = 1;		// 雙因 卡友或已上傳文件
						}
						else {
							this.flag = 2;		// 雙因 非卡友或未上傳文件
						}
					}
					else {
						if (applyinfo.IsCardMember || this.completed) {
							this.flag = 3;		// 非雙因 卡友或已上傳文件
						}
						else {
							this.flag = 4;		// 非雙因 非卡友或未上傳文件
						}
					}

					if ((applyinfo.ProductType === 1 || applyinfo.ProductType === 9 || applyinfo.ProductType === 10) && !this.dsno && this.cardinfo.CardFace !== 228188) {
						// 一般信用卡(非 DS 通路及國民旅遊卡)才顯示 MGM 按鈕
						this.showMgmButton = true;
					}
					if (applyinfo.AgreeVirtualCard) {
						this.flag = 5;          // 虛擬卡
						this.applyFlag = applyinfo.Flag;
					}
					this.source = applyinfo.Source;
					this.isDawhoCard = applyinfo.AgreeDawhoAuthDebit;
				}
				else {
					this.IDNumber = data.IDNumber;
				}
			});

		});
	}

	/** 導引DAWHO數位開戶: 檢查是否為特選卡片 */
	CheckIsSpecialCard(cardface: number): boolean {
		return cardface === 293301 || // 運動卡
			cardface === 425178 || // 現金回饋V
			cardface === 643088 || // 現金回饋J
			cardface === 283178 || // 台灣大車隊聯名卡
			cardface === 488178 || // 台灣大車隊聯名卡
			cardface === 206178 || // 東森網連通 (MasterCard悠遊世界卡)
			cardface === 207178 || // 東森網連通 (MasterCard悠遊鈦金商務卡)
			cardface === 641178 || // MITSUI OUTLET PARK聯名卡 台中港 JCB悠遊晶緻卡
			cardface === 436178 || // MITSUI OUTLET PARK聯名卡 台中港 VISA悠遊御璽卡
			cardface === 285178 || // MITSUI OUTLET PARK聯名卡 台中港 MasterCard悠遊鈦金商務卡
			cardface === 638178 || // MITSUI OUTLET PARK聯名卡 林口 JCB悠遊晶緻卡
			cardface === 484178 || // MITSUI OUTLET PARK聯名卡 林口 VISA悠遊御璽卡
			cardface === 284178 || // MITSUI OUTLET PARK聯名卡 林口 MasterCard悠遊鈦金商務卡
			cardface === 293001 || // SPORT卡 - 魔獸SPORT卡
			cardface === 293178 || // SPORT卡 - SPORT卡悠遊卡-汗水藍
			cardface === 293179 || // SPORT卡 - SPORT卡悠遊卡-奶油黃
			cardface === 228179 || // 美安聯名卡 MasterCard悠遊鈦金卡
			cardface === 476178 || // 美安聯名卡 VISA悠遊無限卡
			cardface === 289301;   // 美安運動卡 MasterCard一卡通鈦金商務卡
	}

	ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.申請結果頁, this.storage.ApplyCardSource);
		this.getData();
		window['certCheck_mydata'] = this.applyCardService.certCheckCallback;
    if ((this.cardinfo.CardFace === 428001 || this.cardinfo.CardFace === 428178) &&
        !this.isCardMember && this.agreeTwdAuthDebitReserved && this.agreeTwdAuthDebitReserved === 'Y' && this.isShowDawhoAd) {
      this.openlbox('#dawhoApplyRedirect');
    }
	}

	async getData () {
		let model: GetAgreementDataRequest ={Title: "MyData_永豐銀行個人資料蒐集、處理及利用告知義務內容", Source: "EWEB"}
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.personalDataTermsUrl = response.Result.Content;
			this.InsertAgreementRecordModel.ID = this.storage.CustId;
			this.InsertAgreementRecordModel.Source = "EWEB";
			this.InsertAgreementRecordModel.Title = "永豐銀行個人資料蒐集、處理及利用告知義務內容";
			this.InsertAgreementRecordModel.Version = response.Result.Version;
		};
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	closelbox() {
		$('.lboxed').trigger('close');
	}

	async DoMyData() {
		this.openlbox('#gotoMydata');

	}

	async getMyDataLoginToken(Mode: number) {
		const custId = this.step >= 0 ? (this.applyinfo ? this.applyinfo.IDNumber : "") : this.IDNumber;
		let birthday = this.applyinfo ? this.applyinfo.Birthday : "";
		const email = this.applyinfo ? this.applyinfo.Email : "";
		if (2 === Mode && (birthday === null || birthday === '')) {
			const birthResp = await this.sharedService.GetBirthdayById(custId);
			if (birthResp.ResultCode === "00") {
				birthday = birthResp.Result ? birthResp.Result.Birthday : "";
			}
		}
		localStorage.setItem('CustId', custId);
		localStorage.setItem('Birthday', birthday);
		localStorage.setItem('Email', email);

		if ((birthday !== null && birthday !== '') || 1 === Mode) {
			const model = {
				ID: custId,
				FunctionCode: this.step >= 0 ? 1 : 2,
				IsMobile: this.isMobile,
				Birthday: birthday,
				Email: email,
				Mode: Mode
			} as MyDataLoginRequestModel;
			const response = await this.sharedService.mydataLogin(model);
			if (response.ResultCode === "0000" || response.ResultCode === "0") {
				this.mydataForm = response.Result;
				StoreMyDataLoginData(this.mydataForm);
				return true;
			}
		}
		return false;
	}

	async postMydata() {
		this.closelbox();
		const success = await this.getMyDataLoginToken(1);
		if (success) {
			await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
			const model = {
				VerifyNo: this.mydataForm.VerifyNo
			} as MyDataDoRequestModel;
			await this.sharedService.mydataDo(model);
      if(this.isApp){
        let loginData = objectToEncryptString(this.mydataForm);
        location.href = `${window['eweb_config'].soft_cert_url}?do=${loginData}#open-browser`;
      }
      else
			  $("#mydata-form").attr("action", this.mydataForm.TwidPortalUrl + '/DO').submit();
		}
		else {
			this.errorPageService.display('系統整理中，請稍後再試', false);
		}
	}

	// 軟體憑證檢查
	async softCertCheck(){
		this.closelbox();
		const success = await this.getMyDataLoginToken(2);
		if (success) {
			await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
			const custID = this.step >= 0 ? (this.applyinfo ? this.applyinfo.IDNumber.substring(0, 10) : "") : this.IDNumber;
			if (this.isApp){
				//this.certCheckCallback("None")  //僅用於測試
				location.href = "sinopacaction:{softcert_check_mydata}{" + custID + "}";
			}
		}
		else {
			this.errorPageService.display('系統整理中，請稍後再試', false);
		}
	}

  // 晶片金融卡驗證
  public async mydataCardVerify() {
    if (this.isApp && this.isAndroid) {
      // APP
      this.mydataCardVerifyByApp();
    } else if (!this.isMobile) {
      // 大網
      this.mydataCardVerifyByWeb();
    }
  }

  // 晶片金融卡驗證 - APP驗證
  public async mydataCardVerifyByApp() {
    this.closelbox();
    let custId = this.applyinfo ? this.applyinfo.IDNumber : this.IDNumber;
    let functionCode = this.step >= 0 ? 1 : 2;
    let email = this.applyinfo ? this.applyinfo.Email : "";
    let birthday = this.applyinfo ? this.applyinfo.Birthday : "";
    if (birthday === null || birthday === '') {
      const birthResp = await this.sharedService.GetBirthdayById(custId);
      if (birthResp.ResultCode === "00") {
        birthday = birthResp.Result ? birthResp.Result.Birthday : "";
      }
    }

    let serialResult = await this.mydataSerial(custId,functionCode,email,birthday);
    if (serialResult.ResultCode !== '00') {
      await this.errorPageService.display('系統整理中，請稍後再試', false);
      return;
    }
    // 儲存MydataLogin參數
    storeMyDataLoginRequest({
      ID: custId,
      Birthday: birthday,
      Email: email,
      FunctionCode: functionCode,
      IsMobile: this.isMobile,
      Mode: 3,
      TxID: serialResult.Result.TXID
    } as MyDataLoginRequestModel);

    let url = window['eweb_config'].url + '/Application/MyDataATMRelay';
    location.href = `sinopacaction:{nfc_verify}{permcli,${custId},${serialResult.Result.TXID},${serialResult.Result.BRANCH},${serialResult.Result.DEPT},${url}}`;
  }

  // 晶片金融卡驗證 - 大網驗證
  public async mydataCardVerifyByWeb() {
    this.errorPageService.MyDataCardVerifyConfirm(async (confirm) => {
      if (!confirm) return;
      this.closelbox();

      let custId = this.applyinfo ? this.applyinfo.IDNumber : this.IDNumber;
      let functionCode = this.step >= 0 ? 1 : 2;
      let email = this.applyinfo ? this.applyinfo.Email : "";
      let birthday = this.applyinfo ? this.applyinfo.Birthday : "";
      if (2 === functionCode && (birthday === null || birthday === '')) {
        const birthResp = await this.sharedService.GetBirthdayById(custId);
        if (birthResp.ResultCode === "00") {
          birthday = birthResp.Result ? birthResp.Result.Birthday : "";
        }
      }

      let serialResult = await this.mydataSerial(custId,functionCode,email,birthday);
      if (serialResult.ResultCode !== '00') {
        await this.errorPageService.display('系統整理中，請稍後再試', false);
        return;
      }

      let registerResult = await this.sharedService.myDataRegister({
        ID: custId,
        FunctionCode: functionCode,
        Birthday: birthday,
        Email: email,
        IsMobile: this.isMobile,
        TXID: serialResult.Result.TXID
      } as MyDataRegisterRequestModel);

      if (registerResult.ResultCode !== '00'){
        await this.errorPageService.display('系統整理中，請稍後再試', false);
        return;
      }

      if(registerResult.Result.ErrCode !== '0000'){
        await this.errorPageService.display(`系統整理中，請稍後再試(${registerResult.Result.ErrCode})`, false);
        return;
      }
      // 儲存MydataLogin參數
      storeMyDataLoginRequest({
        ID: custId,
        Birthday: birthday,
        Email: email,
        FunctionCode: functionCode,
        IsMobile: this.isMobile,
        Mode: 3,
        TxID: serialResult.Result.TXID
      } as MyDataLoginRequestModel);

      location.href = registerResult.Result.VerifyURL;
    });
  }

  // 晶片金融卡驗證 - 留存資料
  public async mydataSerial(custId:string,functionCode:number,email:string,birthday:string):Promise<BaseResponse<MyDataSerialResponseModel>> {
    return await this.sharedService.myDataSerial({
      ID: custId,
      FunctionCode: functionCode,
      Birthday: birthday,
      Email: email
    } as MyDataSerialRequestModel);
  }
}
