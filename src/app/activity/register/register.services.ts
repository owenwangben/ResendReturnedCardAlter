import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { CheckStatusResultModel, RegisterResultModel, InstallmentAgreementStatusModel, CheckVIPResponseModel } from './register.models';

@Injectable()
export class ActivityRegisterService {
	private readonly URL = {
		CheckStatus: 'api/Activity/CheckStatus',
		Register: 'api/Activity/SignActivity',
		AgreementStatus: 'api/Finance/GetInstallmentAgreementStatus',
		CheckVIP: 'api/Activity/VipValidation'
	};
	private readonly formName = 'Activity.Register.Form';

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async CheckStatus(code: string): Promise<BaseResponse<CheckStatusResultModel>> {
		const model = { Code: code };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<CheckStatusResultModel>(
			() => this.webapi.post(this.URL.CheckStatus, body)
		);
	}

	public async Register(code: string, id: string, captcha: string, hash?: string): Promise<BaseResponse<RegisterResultModel>> {
		const model = { Code: code, ID: id };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<RegisterResultModel>(
			() => this.webapi.post(this.URL.Register, body, { 'Captcha': captcha, 'CaptchaData': hash || '' })
		);
	}

	public async GetInstallmentAgreementStatus(id: string): Promise<BaseResponse<InstallmentAgreementStatusModel>> {
		const model = { ID: id, NewAgreementOnly: false };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<InstallmentAgreementStatusModel>(
			() => this.webapi.post(this.URL.AgreementStatus, body)
		);
	}

	public async CheckVIP(code: string, id: string, captcha: string, hash?: string): Promise<BaseResponse<CheckVIPResponseModel>> {
		const model = { Code: code, ID: id };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<CheckVIPResponseModel>(
			() => this.webapi.post(this.URL.CheckVIP, body, { 'Captcha': captcha, 'CaptchaData': hash || '' })
		);
	}

	public storeFormValue(value) {
		sessionStorage.setItem(this.formName, JSON.stringify(value));
	}

	public restoreFormValue() {
		const json = sessionStorage.getItem(this.formName);
		return json && JSON.parse(json);
	}

	public clearFormValue() {
		sessionStorage.removeItem(this.formName);
	}
}

