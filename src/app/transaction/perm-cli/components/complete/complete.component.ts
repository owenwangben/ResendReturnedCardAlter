import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyDataLoginRequestModel, MyDataLoginResponseModel, MyDataDoRequestModel, MyDataSerialRequestModel, MyDataRegisterRequestModel, MyDataSerialResponseModel } from 'app/shared/shared.models';
import { IsAndroid, IsFromApp, IsFromIOS, OpenLightbox, StoreMyDataLoginData, objectToEncryptString, storeMyDataLoginRequest } from 'app/shared/utilities';
import { ErrorPageService, SharedService, MemoryStorage, BaseResponse } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';
import { ApplyCardService } from 'app/application/applycard/services/applycard.services';

@Component({
	selector: 'app-perm-cli-complete',
	templateUrl: './complete.component.html',
	styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit, OnDestroy {
	RefNo: string;
	FinancialProofType: number;
	mydataForm: MyDataLoginResponseModel;
	isMobile = environment.IsMobile;
	public isApp = IsFromApp();
	birthday: string;
	public personalDataTermsUrl = '';
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();
  public isAndroid = IsAndroid();
  public isFromIOS = IsFromIOS();

	constructor(
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private sharedService: SharedService,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private agreenregulationhandleservice: AgreenRegulationHandleService
	) {
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.RefNo = data.RefNo;
			this.FinancialProofType = data.data.FinancialProofType;
			this.birthday = data.data.Birthday;
		});
		this.getData();
		window['certCheck_mydata'] = this.applyCardService.certCheckCallback;
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
		if (this.isMobile) {
			this.OpenPopup('#statement');
		}
		else {
			this.openlbox('#gotoMydata');
		}

	}

	OpenPopup(objTarget: string) {
		$('body').append("<div id='overlay'></div>");
		$('html').css('overflow', 'hidden');
		$('#overlay').css({
			// 'opacity': 0,
			'z-index': '900'
		});
		$(objTarget).stop(false, true).fadeIn();
	}

	async getMyDataLoginToken(Mode: number) {
		const model = {
			ID: this.storage.CustId,
			Birthday: this.birthday,
			FunctionCode: 3,
			IsMobile: this.isMobile,
			Mode: Mode
		} as MyDataLoginRequestModel;
		localStorage.setItem('CustId', this.storage.CustId);
		localStorage.setItem('Birthday', this.birthday);
		const response = await this.sharedService.mydataLogin(model);
		if (response.ResultCode === "0000" || response.ResultCode === "0") {
			this.mydataForm = response.Result;
			StoreMyDataLoginData(this.mydataForm);
			return true;
		}
		return false;
	}

	async postMydata() {
		this.closelbox();
		const success = await this.getMyDataLoginToken(1);
		if (success) {
			await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
			if (this.isMobile) {
				$('#statement').fadeOut(400, function() {
					$('html').css('overflow', 'auto');
					$('body').find('#overlay').remove();
				});
			}

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
			const custID = this.storage.CustId.substring(0, 10);
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

    const custID = this.storage.CustId.substring(0, 10);
    let serialResult = await this.mydataSerial(custID);
    if (serialResult.ResultCode !== '00') {
      await this.errorPageService.display('系統整理中，請稍後再試', false);
      return;
    }
    // 儲存MydataLogin參數
    storeMyDataLoginRequest({
      ID: custID,
      Birthday: this.birthday,
      Email: '',
      FunctionCode: 3,
      IsMobile: this.isMobile,
      Mode: 3,
      TxID: serialResult.Result.TXID
    } as MyDataLoginRequestModel);

    let url = window['eweb_config'].url + '/Application/MyDataATMRelay';
    location.href = `sinopacaction:{nfc_verify}{permcli,${custID},${serialResult.Result.TXID},${serialResult.Result.BRANCH},${serialResult.Result.DEPT},${url}}`;
  }

  // 晶片金融卡驗證 - 大網驗證
  public async mydataCardVerifyByWeb() {
    this.errorPageService.MyDataCardVerifyConfirm(async (confirm) => {
      if (!confirm) return;
      this.closelbox();

      const custID = this.storage.CustId.substring(0, 10);
      let serialResult = await this.mydataSerial(custID);
      if (serialResult.ResultCode !== '00') {
        await this.errorPageService.display('系統整理中，請稍後再試', false);
        return;
      }

      let registerResult = await this.sharedService.myDataRegister({
        ID: custID,
        FunctionCode: 3,
        Birthday: this.birthday,
        Email: '',
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
        ID: custID,
        Birthday: this.birthday,
        Email: '',
        FunctionCode: 3,
        IsMobile: this.isMobile,
        Mode: 3,
        TxID: serialResult.Result.TXID
      } as MyDataLoginRequestModel);

      location.href = registerResult.Result.VerifyURL;
    });
  }

  // 晶片金融卡驗證 - 留存資料
  public async mydataSerial(custID: string):Promise<BaseResponse<MyDataSerialResponseModel>> {
    return await this.sharedService.myDataSerial({
      ID: custID,
      FunctionCode: 3,
      Birthday: this.birthday,
      Email: ''
    } as MyDataSerialRequestModel);
  }
}
