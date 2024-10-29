import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { ApplicationStatusRequestModel, ApplicationStatusResult } from "./application-status.models";

@Injectable()
export class ApplicationStatusService {
	private url = {
		QueryStatus: 'api/apply/querystatus',
		Workflow: 'api/apply/ApplicationStatusWorkflow'
	};  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(model: ApplicationStatusRequestModel): Promise<BaseResponse<ApplicationStatusResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ApplicationStatusResult>(
			() => this.webapi.post(this.url.QueryStatus, body, { 'Captcha': model.captcha })
		);
	}

	public async sendWorkflow(pid: string, desc: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest({ 'ID': pid, 'Description': desc }, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.url.Workflow, body)
		);
	}
}
