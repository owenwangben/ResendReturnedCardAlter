import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { ActivityAirportPickup } from "./airport-pickup.models";

@Injectable()
export class AirportPickupService {
	private apiUrl = 'api/Activity/QueryAirportPickup';  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(): Promise<BaseResponse<ActivityAirportPickup>> {
		const model: AirportPickupRequestModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ActivityAirportPickup>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

class AirportPickupRequestModel {
	public ID: string;
}
