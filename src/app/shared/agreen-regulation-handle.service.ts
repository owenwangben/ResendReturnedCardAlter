import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { MemoryStorage } from './memory.storage';
import { BaseRequest, BaseResponse, RequestHeader, WebApiInvoker } from './webapi.invoker';

@Injectable()
export class AgreenRegulationHandleService {

	private URL = {
		GetAgreementDataUrl: 'api/Agreement/GetAgreementData',
		InsertAgreementRecordUrl: 'api/Agreement/InsertAgreementRecord'
	};

  	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

  	public async GetAgreementData(model:GetAgreementDataRequest): Promise<BaseResponse<GetAgreementDataResponse>> {
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<GetAgreementDataResponse>(
			() => this.webapi.post(this.URL.GetAgreementDataUrl, body)
		);
	}

	public async InsertAgreementRecord(model:InsertAgreementRecordRequest): Promise<BaseResponse<InsertAgreementRecordResponse>> {
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<InsertAgreementRecordResponse>(
			() => this.webapi.post(this.URL.InsertAgreementRecordUrl, body)
		);
	}

}

export class GetAgreementDataRequest {
	/** 條款名稱 */
	public Title: string;
	/** 來源程式名稱 */
	public Source: string;
}

export class GetAgreementDataResponse {
	/** 條款名稱 */
	public Title: string;
	/** 條款版本 */
	public Version: string;
	/** 條款類型 (1:Url, 2:內文) */
	public Type: number;
	/** 條款 Url / 內文 */
	public Content: string;
}

export class InsertAgreementRecordRequest {
	/** 身份證字號 */
	public ID: string;
	/** 條款名稱 */
	public Title: string;
	/** 條款版本 */
	public Version: string;
	/** 來源程式名稱 */
	public Source: string;
}

export class InsertAgreementRecordResponse {
	/** 是否新增成功 */
	public Success: boolean;
}
