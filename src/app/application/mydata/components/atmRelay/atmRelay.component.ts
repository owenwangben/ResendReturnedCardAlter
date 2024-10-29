import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyDataDoRequestModel, MyDataLoginRequestModel, MyDataLoginResponseModel, MyDataVerifyResultRequestModel, MyDataVerifyResultResponseModel } from 'app/shared/shared.models';
import { ErrorPageService } from 'app/shared/shared.module';
import { SharedService } from 'app/shared/shared.services';
import { GetMyDataLoginData, getMyDataLoginRequest } from 'app/shared/utilities';

@Component({
  selector: 'app-atmRelay',
  templateUrl: './atmRelay.component.html'
})
export class ATMRelayComponent implements OnInit {
  public mydataForm: MyDataLoginResponseModel = {} as MyDataLoginResponseModel;
  public txId:string;
  public portal:string;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private errorPageService: ErrorPageService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.txId = params.TXID;
      this.portal = params.Portal;
    })
  }
  async ngOnInit() {
    let mydataTempInfo = getMyDataLoginRequest();
    let verifyResult = await this.sharedService.myDataVerifyResult({
      TXID: this.txId
    } as MyDataVerifyResultRequestModel);

    if (verifyResult.ResultCode !== '00') {
      await this.errorPageService.display(verifyResult.Result.ErrMsg, true);
      return;
    }

    let loginResult = await this.sharedService.mydataLogin({
      ID: mydataTempInfo.ID,
      Birthday: verifyResult.Result.Birthday,
      Email: verifyResult.Result.Email,
      FunctionCode: verifyResult.Result.FunctionCode,
      IsMobile: mydataTempInfo.IsMobile,
      Mode: mydataTempInfo.Mode,
      TxID: this.txId
    } as MyDataLoginRequestModel);

    if (!(loginResult.ResultCode === "0000" || loginResult.ResultCode === "0")) {
      await this.errorPageService.display('系統整理中，請稍後再試', true);
      return;
    }

    this.mydataForm = loginResult.Result;
    await this.sharedService.mydataDo({
      VerifyNo: this.mydataForm.VerifyNo
    } as MyDataDoRequestModel);

    $("#mydata-form").attr("action", this.mydataForm.TwidPortalUrl + '/DO').submit();
  }

}
