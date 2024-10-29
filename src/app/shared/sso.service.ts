import { BaseRequest, RequestHeader, WebApiInvoker, BaseResponse } from './webapi.invoker';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MemoryStorage } from './memory.storage';

@Injectable()
export class SsoService {
	private ssoUrl = 'api/security/sso';  // URL to web API
	private authUrl = 'api/security/auth';  // URL to web API

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage
	) { }

	public async getSsoCustId() {
		const result = await this.getSsoResult();
		return result && result.ID;
	}

	public async getAuthResult(): Promise<AuthResult> {
		const response = await this.getAuthData();
		if (response.ResultCode === "00") {
			return response.Result;
		}
		return null;
	}

	public async getSsoResult(): Promise<SsoResult> {
		const response = await this.getSsoData();
		if (response.ResultCode === "00") {
			return response.Result;
		}
		return null;
	}

	private async getSsoData(): Promise<BaseResponse<SsoResult>> {
		const body = new BaseRequest({}, new RequestHeader(this.storage));
		return await this.webapi.post(this.ssoUrl, body);
	}

	private async getAuthData(): Promise<BaseResponse<AuthResult>> {
		const body = new BaseRequest({}, new RequestHeader(this.storage));
		return await this.webapi.post(this.authUrl, body);
	}
}

export class SsoResult {
	public ID: string;
	public CookieValue?: string;
	public Token?: string;
	public SsoUserData: SsoUserData;
}

export class SsoUserData {
	public Header?: string;
	public Message?: string;
	public CPRTCD?: string;
	public USERID: string;
	public CUSTID: string;
	public T24SMS?: string;
	public EMAIL?: string;
}

export class AuthResult {
	public Auth2: AuthData;
	public Auth3: AuthData;
	public OTP: AuthData;
	public OTP2: AuthData;
	public AuthMMA: AuthData;
	public AuthCard: AuthData;
	public AuthAccount: AuthData;
	public AuthCARD_OR_BANK: AuthData;
	public AuthDAWHO: AuthData;
	public AuthQuickAccount: AuthData;
	public AuthOtherCard: AuthData;
	public AuthOtherBank: AuthData;
	public AuthMobileStatement: AuthData;
	public Auth1_1: AuthData;
	public Auth1_2: AuthData;
	public Auth1_3: AuthData;
	public Auth1_4: AuthData;
	public Auth1_5: AuthData;
	public Auth1_6: AuthData;
	public Auth1_7: AuthData;
	public Auth1_8: AuthData;
}

export class AuthData {
	ID: string;
	Token: string;
	Data;
}
