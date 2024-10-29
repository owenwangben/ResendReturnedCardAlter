import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { AuthByLast8CardNoRequestModel,	AuthByCardNoRequestModel, AuthByBirthdayRequestModel,
	ContactInfoModel, QueryMobileResultModel, GetEnd2EndCertResultModel, FirstFactorAuthResultModel } from './auth.models';

@Injectable()
export class AuthService {
	private readonly URL = {
		authByBirthday: '/api/Member/AuthByBirthday',
		authByCardNo: '/api/Member/AuthByCardNo',
		authByLast8CardNo: '/api/Member/AuthByLast8CardNo',
		getContactInfo: 'api/Member/GetContactInfo',
		queryMobile: 'api/Member/QueryMobile',
		generateOTP: 'api/Member/GenerateOTP',
		verifyOTP: 'api/Member/VerifyOTP',
		firstFactorAuth: 'api/ApplyCard/FirstFactorAuth',
		authOtherCard: 'api/ApplyCard/AuthOtherCardWithLimitedTimes',
		authOtherBank: 'api/ApplyCard/AuthOtherBankWithLimitedTimes',
		authMBill: 'api/Accounting/MobileStatementAuth',
		queryMMALimitIntranetUsage: 'api/Member/QueryMMALimitIntranetUsage',
		e2eGetCert: 'api/End2End/GetCert'
	};

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async authByBirthday(model: AuthByBirthdayRequestModel): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.authByBirthday, body, { 'Captcha': model.Captcha })
		);
	}

	public async authByCardNo(model: AuthByCardNoRequestModel): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.authByCardNo, body, { 'Captcha': model.Captcha })
		);
	}

	public async authByLast8CardNo(model: AuthByLast8CardNoRequestModel): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.authByLast8CardNo, body, { 'Captcha': model.Captcha })
		);
	}

	public async getContactInfo(): Promise<BaseResponse<ContactInfoModel>> {
		const body = new BaseRequest({ ID: this.storage.CustId }, new RequestHeader(this.storage));
		return await this.loader.run<ContactInfoModel>(
			() => this.webapi.post(this.URL.getContactInfo, body)
		);
	}

	public async queryMobile(type: number = 0): Promise<BaseResponse<QueryMobileResultModel>> {
		const body = new BaseRequest({ ID: this.storage.CustId, Type: type }, new RequestHeader(this.storage));
		return await this.loader.run<QueryMobileResultModel>(
			() => this.webapi.post(this.URL.queryMobile, body)
		);
	}

	public async generateOTP(mobile: string, funcCode: number, sessionKey: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest(
			{ ID: this.storage.CustId, Mobile: mobile, FunctionCode: funcCode, SessionKey: sessionKey },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.generateOTP, body)
		);
	}

	public async verifyOTP(funcCode: number, otp: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest(
			{ ID: this.storage.CustId, FunctionCode: funcCode, Otp: otp, AuthType: 1 },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.verifyOTP, body)
		);
	}

	public async verifyMMA(id: string, userId: string, password: string,
		isHouseLoanCard: boolean, captcha: string): Promise<BaseResponse<TransactionResult>> {
		const body = new BaseRequest(
			{ Type: 1, ID: id, UserId: userId, Password: password, IsHouseLoanCard: isHouseLoanCard },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.firstFactorAuth, body, { 'Captcha': captcha })
		);
	}

	public async verifyCard(id: string, birthday: string, cardNo: string, cvv2: string,
		isHouseLoanCard: boolean, captcha: string): Promise<BaseResponse<TransactionResult>> {
		const body = new BaseRequest(
			{ Type: 2, ID: id, Birthday: birthday, CardNo: cardNo, CVV2: cvv2, IsHouseLoanCard: isHouseLoanCard },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.firstFactorAuth, body, { 'Captcha': captcha })
		);
	}

	public async verifyAccount(id: string, birthday: string, account: string,
		isHouseLoanCard: boolean, captcha: string): Promise<BaseResponse<TransactionResult>> {
		const body = new BaseRequest(
			{ Type: 3, ID: id, Birthday: birthday, DepositAccount: account, IsHouseLoanCard: isHouseLoanCard },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.firstFactorAuth, body, { 'Captcha': captcha })
		);
	}

	public async verifyCardOrAccount(source = 0, prodtype = 0, id: string, birthday: string,
		isHouseLoanCard: boolean, captcha: string, Token?: string, cardface?: string): Promise<BaseResponse<FirstFactorAuthResultModel>> {
		const body = new BaseRequest(
			{ Type: 4, ID: id, Birthday: birthday, IsHouseLoanCard: isHouseLoanCard, Source: source, ProductType: prodtype, Token: Token, Cardface: cardface },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.firstFactorAuth, body, { 'Captcha': captcha })
		);
	}

	public async verifyDawho(id: string, birthday: string,
		isHouseLoanCard: boolean, captcha: string, cardface: string): Promise<BaseResponse<FirstFactorAuthResultModel>> {
		const body = new BaseRequest(
			{ Type: 5, ID: id, Birthday: birthday, IsHouseLoanCard: isHouseLoanCard, Cardface: cardface },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.firstFactorAuth, body, { 'Captcha': captcha })
		);
	}

	public async verifyQuickaccount(source: number,id: string, birthday: string,
		isHouseLoanCard: boolean, captcha: string, cardface: string, producttype: Number): Promise<BaseResponse<FirstFactorAuthResultModel>> {
		const body = new BaseRequest(
			{ Type: 6, ID: id, Birthday: birthday, IsHouseLoanCard: isHouseLoanCard,Source: source, Cardface: cardface, ProductType: producttype },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.firstFactorAuth, body, { 'Captcha': captcha })
		);
	}

	public async verifyOtherCard(id: string, birthday: string, mobile: string, cardNo: string, expireDate: string,
		captcha: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest(
			{ ID: id, Birthday: birthday, Mobile: mobile, CardNo: cardNo, ValidDate: expireDate },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.authOtherCard, body, { 'Captcha': captcha })
		);
	}

	public async verifyMBill(code: string, id: string, isAutoDebit: boolean, captcha: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest(
			{ Code: code, ID: id, IsAutoDebit: isAutoDebit },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.authMBill, body, { 'Captcha': captcha })
		);
	}

	public async e2eGetCert(): Promise<BaseResponse<GetEnd2EndCertResultModel>> {
		const body = new BaseRequest(
			{ },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.e2eGetCert, body)
		);
	}

	public async QueryMMALimitIntranetUsage(id: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest(
			{ ID: id },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.queryMMALimitIntranetUsage, body)
		);
	}

	public async verifyOtherBank(id: string, bankcode: string, account: string, birthday: string, mobile: string,
		captcha: string ): Promise<BaseResponse<any>> {
		const body = new BaseRequest(
			{ ID: id, BankCode: bankcode, Account: account, Birthday: birthday, MobileNo: mobile },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.authOtherBank, body, { 'Captcha': captcha })
		);
	}
}
