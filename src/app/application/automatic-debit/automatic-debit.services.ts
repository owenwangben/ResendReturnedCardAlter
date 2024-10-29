import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { ApplyAutoDeductRequestModel, ApplyAutoDeductResponseModel, AuthAutoDeductResponseModel, GetAutoDeductAccountResponseModel, GetAutoDeductResponseModel, SetAutoDeductAmtRequestModel, SetAutoDeductAmtResponseModel, SetAutoDeductTypeRequestModel, SetAutoDeductTypeResponseModel } from './automatic-debit.models';

@Injectable()
export class AutomaticDebitService {
	private AuthAutoDeductUrl = 'api/AutoDeduct/AuthAutoDeduct';
	private GetAutoDeductAccountUrl = 'api/AutoDeduct/GetAutoDeductAccount';
	private GetAutoDeductUrl = 'api/AutoDeduct/GetAutoDeduct';
	private ApplyAutoDeductUrl = 'api/AutoDeduct/ApplyAutoDeduct';
	private SetAutoDeductAmtUrl = 'api/AutoDeduct/SetAutoDeductAmt';
	private SetAutoDeductTypeUrl = 'api/AutoDeduct/SetAutoDeductType';
	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }
	/** 驗證是否為自動扣繳設定身份 */
	public async AuthAutoDeduct(id: string): Promise<BaseResponse<AuthAutoDeductResponseModel>> {
		const model = {ID: id}
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<AuthAutoDeductResponseModel>(
			() => this.webapi.post(this.AuthAutoDeductUrl, body)
		);
	}
	/** 取得可以自扣的帳號清單 */
	public async GetAutoDeductAccount(id: string): Promise<BaseResponse<GetAutoDeductAccountResponseModel>> {
		const model = {ID: id}
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<GetAutoDeductAccountResponseModel>(
			() => this.webapi.post(this.GetAutoDeductAccountUrl, body)
		);
	}
	/** 取得自動扣繳設定 */
	public async GetAutoDeduct(id: string): Promise<BaseResponse<GetAutoDeductResponseModel>> {
		const model = {ID: id}
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<GetAutoDeductResponseModel>(
			() => this.webapi.post(this.GetAutoDeductUrl, body)
		);
	}
	/** 申請設定自動扣繳設定 */
	public async ApplyAutoDeduct(model: ApplyAutoDeductRequestModel): Promise<BaseResponse<ApplyAutoDeductResponseModel>> {
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<ApplyAutoDeductResponseModel>(
			() => this.webapi.post(this.ApplyAutoDeductUrl, body)
		);
	}
	/** 設定自動扣繳金額 */
	public async SetAutoDeductAmt(model: SetAutoDeductAmtRequestModel): Promise<BaseResponse<SetAutoDeductAmtResponseModel>> {
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<SetAutoDeductAmtResponseModel>(
			() => this.webapi.post(this.SetAutoDeductAmtUrl, body)
		);
	}
	/** 設定自動扣繳方式 */
	public async SetAutoDeductType(model: SetAutoDeductTypeRequestModel): Promise<BaseResponse<SetAutoDeductTypeResponseModel>> {
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<SetAutoDeductTypeResponseModel>(
			() => this.webapi.post(this.SetAutoDeductTypeUrl, body)
		);
	}
}
