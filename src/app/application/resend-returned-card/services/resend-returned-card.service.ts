import { Injectable } from '@angular/core';
import { LoaderService,MemoryStorage,WebApiInvoker,BaseRequest,RequestHeader,BaseResponse,SharedService, } from 'app/shared/shared.module';
import { ResendReturnedCardGetDataResultModel,ResendReturnedCardApplyRequestModel } from '../resend-returned-card-models';

@Injectable()
export class ResendReturnedCardService {

  private readonly URL = {
    getData:'api/Apply/QueryReturnedCardInfo',//獲取資料
    apply:'api/Apply/ResendReturnedCard'//提交申請
  };

  constructor(
    private webapi:WebApiInvoker,
    private storage:MemoryStorage,
    private loader:LoaderService,
    private service:SharedService
  ) { }

  public async getData():Promise<BaseResponse<ResendReturnedCardGetDataResultModel>>{
    const model = { ID:this.storage.CustId };
    const body = new BaseRequest(model,new RequestHeader(this.storage));
    return await this.loader.run<ResendReturnedCardGetDataResultModel>(
      () => this.webapi.post(this.URL.getData,body)
    );
  }

  public async apply( model : ResendReturnedCardApplyRequestModel):Promise<BaseResponse<any>>{
    model.ID = this.storage.CustId;
    const body = new BaseRequest( model, new RequestHeader(this.storage));
    return await this.loader.run<any>(
      () => this.webapi.post(this.URL.apply, body)
    );
  }

}
