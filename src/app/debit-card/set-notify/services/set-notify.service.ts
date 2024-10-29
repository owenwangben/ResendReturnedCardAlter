import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseResponse, BaseRequest, RequestHeader } from 'app/shared/shared.module';
import { SetNotifyRequestModel, GetSetNotifyInfoResultModel, GetSetNotifyInfoRequestModel } from './set-notify.model';

@Injectable()
export class SetNotifyService {
	private SetNotifyUrl = 'api/DebitCard/SetNotify';
	private GetInfoUrl = 'api/DebitCard/GetNotifyInfo';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async SetNotify(model: SetNotifyRequestModel): Promise<BaseResponse<BaseResult>> {
		model.ID = this.storage.CustId;
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.SetNotifyUrl, body)
		);
	}

	public async GetInfo(): Promise<BaseResponse<GetSetNotifyInfoResultModel>> {
		const model: GetSetNotifyInfoRequestModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<GetSetNotifyInfoResultModel>(
			() => this.webapi.post(this.GetInfoUrl, body)
		);
	}
}
