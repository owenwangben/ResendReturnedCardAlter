import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { WizardService, ErrorPageService, MemoryStorage, LoaderService, CustomerInfoModel, SharedService, SsoService, BaseResponse } from 'app/shared/shared.module';
import { ApplyCardService } from '../../services/applycard.services';
import { OpenLightbox, ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit, StoreMyDataLoginData, IsAndroid, storeMyDataLoginRequest, IsFromIOS, objectToEncryptString, encryptStringToObject } from 'app/shared/utilities';
import { SendApplyInfoRequestModel } from '../../services/applycard.models';
import { MyDataLoginRequestModel, MyDataLoginResponseModel, MyDataDoRequestModel, MyDataSerialRequestModel, MyDataRegisterRequestModel, MyDataSerialResponseModel } from 'app/shared/shared.models';
import { environment } from 'environments/environment';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';
import { IsFromApp } from 'app/shared/utilities';

@Component({
  selector: 'app-applycard-uploaddoc',
  templateUrl: './upload-doc.component.html'
})
export class UploadDocComponent implements OnInit, OnDestroy {
  private custId: string;
  private uType: number;
  public fileIds = new Array(12).fill(undefined);
  step: number;
  img_src: Array<string>;
  img_fname: Array<string>;
  fin_state_img_fname: Array<string> = new Array;
  uploaders = new Array<FileUploader>(3);
  isDawhoApplyCard = false;
  isQuickaccount: boolean;
  source = 0;
  uploadFileIds: string[] = new Array(2).fill(undefined);
  public applyinfo: SendApplyInfoRequestModel;
  public cminfo: CustomerInfoModel;
  public mydataForm: MyDataLoginResponseModel;
  public isMobile = environment.IsMobile;
  isocruploadsuccess = false;
  InsertAgreementRecordModel = new InsertAgreementRecordRequest();
  public personalDataTermsUrl = '';
  public sso = false;
  public type = '';

  public isApp = IsFromApp();
  public isAndroid = IsAndroid();
  public isFromIOS = IsFromIOS();
  //SinoPacICS = 'N';

  constructor(
    private route: ActivatedRoute,
    private storage: MemoryStorage,
    private applyCardService: ApplyCardService,
    private sharedService: SharedService,
    private errorPageService: ErrorPageService,
    private loader: LoaderService,
    private wizardService: WizardService,
    private ssoService: SsoService,
    private agreenregulationhandleservice: AgreenRegulationHandleService
  ) {
  }

  async ngOnInit() {
    this.sso = !!await this.ssoService.getSsoResult();
    ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.上傳資料, this.storage.ApplyCardSource);
    this.route.data.subscribe(data => {
      this.applyinfo = data.applyinfo;
      this.cminfo = data.cminfo;
      if (data.applyinfo) {
        this.isocruploadsuccess = this.applyinfo.IsOcrUploadSuccess;
        this.source = data.applyinfo.Source;
        this.isDawhoApplyCard = data.applyinfo.Source === 1 &&
          (data.cardinfo && data.cardinfo.ShowDawhoAuthDebitUI) &&
          (this.cminfo && !this.cminfo.DepositAccountHasDawhoFlag);
      }

      if (this.source == 2 && +this.storage.CifType == 5) {
        this.isQuickaccount = true;
      } else {
        this.isQuickaccount = false;
      }
      this.step = data.step;
      this.type = data.type;
      this.img_src = new Array(2).fill(undefined);
      this.img_fname = new Array(2).fill(undefined);
      if (this.step >= 0) {
        this.custId = data.applyinfo.IDNumber;
        this.uType = 2;
      }
      else {
        this.custId = data.IDNumber;
        this.uType = 2;
      }
      localStorage.setItem('CustId', this.custId);

      for (let i = 0; i < this.uploaders.length; i++) {
        this.uploaders[i] = new FileUploader({
          url: "api/ApplyCard/UploadFile",
          method: "POST",
          autoUpload: true,
          maxFileSize: 5 * 1024 * 1024,
          allowedMimeType: ['image/jpeg', 'image/tiff', 'image/png'],
          itemAlias: "File",
          additionalParameter: {
            ID: this.custId,
            Type: i + 1,
            UploadType: this.uType,
            FileIndex: i,
            ApplicationName: this.storage.ApplicationName
          }
        });
        this.uploaders[i].onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
        this.uploaders[i].onWhenAddingFileFailed = this.onWhenAddingFileFailed.bind(this);
        this.uploaders[i].onSuccessItem = this.onSuccessItem.bind(this, i);
      }
      // 財力證明攻略彈窗
      $('.fixed-icon').click(function () {
        goToByTop();
      });
      $('.js-handle-tab-click').click(function () {
        const clickValue = $(this).attr('data-tab');
        $('.js-handle-tab-click').removeClass('active');
        $(this).addClass('active');
        $('.js-tab-block').hide();
        $('.' + clickValue).show();
      });
      $('.tab-app').click(function () {
        const prodList = $('.js-step-list');
        prodList.owlCarousel({
          loop: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 2500,
          autoplayHoverPause: true,
          responsive: {
            0: {
              items: 1,
              margin: 20,
              dots: true,
            },
            415: {
              items: 2,
              margin: 20,
              dots: true,
            },
            768: {
              items: 4,
              margin: 20,
              dots: false,
              loop: false,
              autoplay: false,
            },
          },
        });
      });
      $('.nav-tab').click(function (e) {
        const tab_id = $(this).attr('data-tab');
        $('nav-tab').removeClass('nav-tab-active');
        $('.app-tab-content').removeClass('active');
        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
        $("#" + tab_id + " .js-handle-tab-click:first-child").trigger('click');
        goToByScroll($("#" + tab_id).find($('.file-area')));
        e.preventDefault();
      });
    });
    this.getData();
    window['certCheck_mydata'] = this.applyCardService.certCheckCallback;
  }

  async getData() {
    let model: GetAgreementDataRequest = { Title: "MyData_永豐銀行個人資料蒐集、處理及利用告知義務內容", Source: "EWEB" }
    const response = await this.agreenregulationhandleservice.GetAgreementData(model);
    if (this.errorPageService.validateResponse(response, { redirect: false })) {
      this.personalDataTermsUrl = response.Result.Content;
      this.InsertAgreementRecordModel.ID = this.custId;
      this.InsertAgreementRecordModel.Source = "EWEB";
      this.InsertAgreementRecordModel.Title = "永豐銀行個人資料蒐集、處理及利用告知義務內容";
      this.InsertAgreementRecordModel.Version = response.Result.Version;
    };
  }

  initFileUploader(type: number) {
    this.uploaders[2] = new FileUploader({
      url: "api/ApplyCard/UploadFile",
      method: "POST",
      autoUpload: true,
      maxFileSize: 5 * 1024 * 1024,
      allowedMimeType: ['image/jpeg', 'image/tiff', 'image/png'],
      itemAlias: "File",
      additionalParameter: {
        ID: this.custId,
        Type: type,
        UploadType: this.uType,
        FileIndex: 2,
        ApplicationName: this.storage.ApplicationName
      }
    });
    this.uploaders[2].onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
    this.uploaders[2].onWhenAddingFileFailed = this.onWhenAddingFileFailed.bind(this);
    this.uploaders[2].onSuccessItem = this.onSuccessItem.bind(this, 2);
  }

  onBeforeUploadItem(index: number, fileItem: FileItem): any {
    this.loader.display(true);
  }

  onWhenAddingFileFailed(index: number, item: FileLikeObject, filter: any, options: any) {
    this.errorPageService.display("檔案格式不允許或檔案超過5MB!", false);
  }

  onSuccessItem(index: number, item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.loader.display(false);
    const json = JSON.parse(response);
    if (this.errorPageService.validateResponse(json, { redirect: false })) {
      if (index != 2) {
        this.fileIds[json.Result.FileIndex] = json.Result.FileId;
      }
      else {
        this.fileIds[this.fin_state_img_fname.length + 1] = json.Result.FileId;
      }
    }
  }

  ngOnDestroy() {
    $('.lboxed').remove();
  }

  openlbox(lboxid) {
    if (lboxid === "#application") {
      openlbox(lboxid);     // 財力證明攻略彈窗
    }
    else {
      OpenLightbox(lboxid); // 舊的修改版(Angular)的彈窗
    }
  }

  closelbox() {
    $('.lboxed').trigger('close');
    $(".js_lb_overlay").last().remove();
  }

  readUrl($event, index: number, uploader: FileUploader) {
    if (uploader.isUploading && $event.target.files && $event.target.files[0]) {
      const fname: string = $event.target.files[0].name;
      const fext: string = fname.split('.').pop();
      if (index < 2) {
        this.img_src[index] = "";
        this.img_fname[index] = "";
        this.fileIds[index] = undefined;

        this.img_fname[index] = fname;
        const reader = new FileReader();
        reader.onload = (evt: any) => this.img_src[index] = evt.target.result;
        reader.readAsDataURL($event.target.files[0]);
      }
      if (index == 2) {
        if (0 <= this.fin_state_img_fname.length && this.fin_state_img_fname.length < 10) {
          this.fin_state_img_fname.push(fname);

        } else {
          this.fin_state_img_fname.splice(9, 1, fname);
        }
      }
    }
    $event.target.value = '';
  }

  removefilename(index: number) {
    if (index < 2) {
      this.img_src[index] = "";
      this.img_fname[index] = "";
      this.fileIds[index] = undefined;
    } else {
      this.fileIds.splice(index, 1, undefined);
      if (index < 12 && this.fileIds[index + 1]) {
        for (let idx = index; idx < this.fileIds.length; idx++) {
          this.fileIds.splice(idx, 1, this.fileIds[idx + 1]);
        }
        this.fileIds.splice(this.fileIds.length - 1, 1, undefined);
      }
      this.fin_state_img_fname.splice(index - 2, 1);
    }
  }

  imgExists(index: number) {
    if (index < 2) {
      return !!(this.img_src[index] || this.img_fname[index]);
    }
    else {
      return !!this.fin_state_img_fname.length;
    }
  }

  async submit(uploadNow: boolean, completed: boolean) {
    let result = false;
    let response: any
    this.closelbox();
    if (uploadNow && this.uType === 2) {
      if (this.imgExists(2) || this.imgExists(0) || this.imgExists(1)) {
        response = await this.applyCardService.completeUpload(this.custId, this.fileIds.filter(item => !!item),
          this.isDawhoApplyCard ? 1 : 0);

        if (this.applyinfo) {
          SensorsTrackSubmit('CardApplicationUploadDocuments', this.storage.CardTitle, this.storage.CardType,
            response.ResultCode === "00", response.ResultCode === "00" ? '' : response.ResultMessage,
            !!this.storage.UserId, !!this.cminfo,
            this.applyinfo.IsCardMember, this.applyinfo.IsOtherCardAuth, this.applyinfo.Source);
        }
        result = this.errorPageService.validateResponse(response, { redirect: false });
      }
    }
    if (result || (!this.imgExists(2) && !this.imgExists(0) && !this.imgExists(1))) {
      this.route.data.subscribe(async (data) => {
        data.completed = completed;
        this.wizardService.GoToNextStep();
      });
    }
  }

  async DoMyData() {
    this.openlbox('#gotoMydata');
  }

  async getToken(Mode: number) {
    let birthday = this.applyinfo ? this.applyinfo.Birthday : "";
    const email = this.applyinfo ? this.applyinfo.Email : "";
    if (2 === Mode && (birthday === null || birthday === '')) {
      const birthResp = await this.sharedService.GetBirthdayById(this.custId);
      if (birthResp.ResultCode === "00") {
        birthday = birthResp.Result ? birthResp.Result.Birthday : "";
      }
    }
    localStorage.setItem('Birthday', birthday);
    localStorage.setItem('Email', email);

    if ((birthday !== null && birthday !== '') || 1 === Mode) {
      const model = {
        ID: this.custId,
        FunctionCode: 2,
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
    const success = await this.getToken(1);
    if (success) {
      const model = {
        VerifyNo: this.mydataForm.VerifyNo
      } as MyDataDoRequestModel;
      await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
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

  checkstatement() {
    const statementRadio = $('input[name=statement]');
    const statementBtnUpload = $('#statementBtnUpload');
    if ($('input[name=statement]:checked').length > 0 && this.fin_state_img_fname.length < 10) {
      statementBtnUpload.show();
      statementRadio.off('change');
    } else {
      statementBtnUpload.hide();
    }
  }

  // 軟體憑證檢查
  async softCertCheck() {
    this.closelbox();
    const success = await this.getToken(2);
    if (success) {
      await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
      const custID = this.custId.substring(0, 10);
      if (this.isApp) {
        //this.certCheckCallback("None")  //僅用於測試
        location.href = "sinopacaction:{softcert_check_mydata}{" + custID + "}";
      }
    }
    else {
      this.errorPageService.display('系統整理中，請稍後再試', false);
    }
  }

  showC3Button() {
    return this.isApp && (this.type !== 'upload' || (this.type === 'upload' && this.sso));
  }

  showCardButton() {
    return !this.isMobile && this.sso && (!this.isFromIOS && !this.isAndroid) &&(this.type !== 'upload' || this.type === 'upload');
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
    let functionCode = this.type === 'upload' ? 2 : 1;
    let birthday = this.applyinfo ? this.applyinfo.Birthday : "";
    let email = this.applyinfo ? this.applyinfo.Email : "";
    if (2 === functionCode && (birthday === null || birthday === '')) {
      const birthResp = await this.sharedService.GetBirthdayById(this.custId);
      if (birthResp.ResultCode === "00") {
        birthday = birthResp.Result ? birthResp.Result.Birthday : "";
      }
    }
    let serialResult = await this.mydataSerial(functionCode, birthday, email);
    if (serialResult.ResultCode !== '00') {
      await this.errorPageService.display('系統整理中，請稍後再試', false);
      return;
    }
    // 儲存MydataLogin參數
    storeMyDataLoginRequest({
      ID: this.custId,
      Birthday: birthday,
      Email: email,
      FunctionCode: this.type === 'upload' ? 2 : 1,
      IsMobile: this.isMobile,
      Mode: 3,
      TxID: serialResult.Result.TXID
    } as MyDataLoginRequestModel);

    let url = window['eweb_config'].url + '/Application/MyDataATMRelay';
    location.href = `sinopacaction:{nfc_verify}{permcli,${this.custId},${serialResult.Result.TXID},${serialResult.Result.BRANCH},${serialResult.Result.DEPT},${url}}`;
  }

  // 晶片金融卡驗證 - 大網驗證
  public async mydataCardVerifyByWeb() {
    this.errorPageService.MyDataCardVerifyConfirm(async (confirm) => {
      if (!confirm) return;
      this.closelbox();

      let functionCode = this.type === 'upload' ? 2 : 1;
      let birthday = this.applyinfo ? this.applyinfo.Birthday : "";
      let email = this.applyinfo ? this.applyinfo.Email : "";
      if (2 === functionCode && (birthday === null || birthday === '')) {
        const birthResp = await this.sharedService.GetBirthdayById(this.custId);
        if (birthResp.ResultCode === "00") {
          birthday = birthResp.Result ? birthResp.Result.Birthday : "";
        }
      }

      let serialResult = await this.mydataSerial(functionCode, birthday, email);
      if (serialResult.ResultCode !== '00') {
        await this.errorPageService.display('系統整理中，請稍後再試', false);
        return;
      }

      let registerResult = await this.sharedService.myDataRegister({
        ID: this.custId,
        FunctionCode: this.type === 'upload' ? 2 : 1,
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
        ID: this.custId,
        Birthday: birthday,
        Email: email,
        FunctionCode: this.type === 'upload' ? 2 : 1,
        IsMobile: this.isMobile,
        Mode: 3,
        TxID: serialResult.Result.TXID
      } as MyDataLoginRequestModel);

      location.href = registerResult.Result.VerifyURL;
    });
  }

  // 晶片金融卡驗證 - 留存資料
  public async mydataSerial(functionCode: number, birthday: string, email: string):Promise<BaseResponse<MyDataSerialResponseModel>> {
    return await this.sharedService.myDataSerial({
      ID: this.custId,
      FunctionCode: functionCode,
      Birthday: birthday,
      Email: email
    } as MyDataSerialRequestModel);
  }
}

function openlbox($lboxid) {
  const src_top: any = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
  $('.lbox-block').find($lboxid).show().siblings().hide();

  if ($lboxid === '#application') {
    $('.lboxed').addClass('full-width');
    $('.lboxed').lightbox_me({
      centered: false,
      closeClick: false,
      modalCSS: { top: '0px' },
      onLoad: function () {
        scrollTo($('.lboxed').offset().top);
      },
      onClose: function () {
        scrollTo(src_top);
        $('.nav-tab:first-child').addClass('nav-tab-active').siblings().removeClass('nav-tab-active');
        $(".js_lb_overlay").last().remove();
        $('.lboxed').removeClass('full-width');
      },
      overlayCSS: {
        background: 'black', opacity: .3
      }
    });
    setTimeout(() => {
      // 因為第一次彈窗時，下方會有黑底，所以只好用此方法暫時解決
      $('.lboxed').css('top', '0px');
    }, 300);
  } else {
    $('.lboxed').lightbox_me({
      closeClick: false,
      centered: true,
      onLoad: function () {
        scrollTo($('.lboxed').offset().top);
      },
      onClose: function () {
        scrollTo(src_top);
      },
      overlayCSS: {
        background: 'black', opacity: .8
      }
    });

  }

}



function scrollTo(pos) {
  $('html, body').animate({
    scrollTop: pos
  }, 250);
}

function goToByScroll(id) {
  $('html,body').animate(
    {
      scrollTop: id.offset().top,
    },
    'slow'
  );
}

function goToByTop() {
  $('html,body').animate(
    {
      scrollTop: 0,
    },
    'slow'
  );
}
