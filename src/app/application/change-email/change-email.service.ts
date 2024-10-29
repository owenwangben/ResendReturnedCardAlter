import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseResponse, BaseRequest, RequestHeader } from 'app/shared/shared.module';

@Injectable()
export class ChangeEmailService {
	private QueryEMailUrl = 'api/Apply/QueryEMail';
	private UpdateEMailUrl = 'api/Apply/UpdateEMail';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async QueryEMail(): Promise<BaseResponse<BaseResult>> {
		const model = { PID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.QueryEMailUrl, body)
		);
	}

	public async UpdateEmail(model: UpdateEMailRequestModel): Promise<BaseResponse<BaseResult>> {
		model.PID = this.storage.CustId;
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.UpdateEMailUrl, body)
		);
	}
}

class UpdateEMailRequestModel {
	public PID: string;  // 身分證字號
	public Email: string;
}
