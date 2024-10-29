import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { Annualfee } from "./annualfee.models";

@Injectable()
export class AnnualfeeService {
	private apiUrl = 'api/activity/queryannualfee';  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(): Promise<BaseResponse<Annualfee>> {
		const model: AnnualfeeRequestModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<Annualfee>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

class AnnualfeeRequestModel {
	public ID: string;
}
