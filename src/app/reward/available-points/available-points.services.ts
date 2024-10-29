import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { RewardPoints } from "./available-points.models";

@Injectable()
export class AvailablePointsService {
	private apiUrl = 'api/Bonus/Point';  // URL to web API

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(): Promise<BaseResponse<RewardPoints>> {
		const body = new BaseRequest(
			new AvailablePointsRequestModel(this.storage.CustId),
			new RequestHeader(this.storage)
		);
		return await this.loader.run<RewardPoints>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

class AvailablePointsRequestModel {
	constructor(
		public ID: string
	) { }
}
