import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { EditPwdRequestModel, GetCardListModel, CardRecord } from "app/application/displaycard-pwd/displaycard-pwd.models";

@Injectable()
export class DisplayCardPwdService {
	private pwdUrl = 'api/Apply/DisplayCardPwd';
	private getCardListUrl = 'api/Apply/GetDisplayCardList';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async DisplayCardPwd(model: EditPwdRequestModel): Promise<BaseResponse<BaseResult>> {
		model.ID = this.storage.CustId;
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.pwdUrl, body)
		);
	}

	public async GetDisplayCardList(): Promise<BaseResponse<ItemsResult<CardRecord>>> {
		const model: GetCardListModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ItemsResult<CardRecord>>(
			() => this.webapi.post(this.getCardListUrl, body)
		);
	}
}
