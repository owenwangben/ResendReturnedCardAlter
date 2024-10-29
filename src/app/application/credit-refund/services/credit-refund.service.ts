import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader,
	BaseResponse, SharedService, CustomerInfoModel, } from "app/shared/shared.module";
import { CreditRefundGetDataResultModel, CreditRefundApplyRequestModel } from '../credit-refund-models';

@Injectable()
export class CreditRefundService {
	private readonly URL = {
		getData: 'api/Apply/CreditRefundGetData',
		apply: 'api/Apply/CreditRefundApply'

	};
	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService,
		private service: SharedService
	) { }

	public async getData(): Promise<BaseResponse<CreditRefundGetDataResultModel>> {
		const model = { ID: this.storage.CustId};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<CreditRefundGetDataResultModel>(
			() => this.webapi.post(this.URL.getData, body)
		);
	}

	public async apply(model: CreditRefundApplyRequestModel): Promise<BaseResponse<any>> {
		model.ID = this.storage.CustId;
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.apply, body)
		);
	}
}
