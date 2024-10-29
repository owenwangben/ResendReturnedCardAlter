import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class LeaveMessageService {
	private readonly url = 'api/ApplyCard/CustomerServiceTelApply';
	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async apply(product: string,cardname: string, name: string, tel: string, mobile: string,
		cardHolder: boolean, captcha: string): Promise<BaseResponse<any>> {
		const model = {
			Product: product,
			Card_Name: cardname,
			Name: name,
			Tel_Day: tel,
			Mobile: mobile,
			IsHaveCard: cardHolder
		};
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.url, request, { Captcha: captcha})
		);
	}
}
