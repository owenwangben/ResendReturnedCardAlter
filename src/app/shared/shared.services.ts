import { Injectable } from '@angular/core';
import { WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from './webapi.invoker';
import { CustomerInfoModel, BankViewModel, BankBranchViewModel, TransferAccountViewModel, ApplyCardTermsUrlModel,
	DebitCardCheckApplyResultModel, DAWHOInfoModel, AuthOtherBankAccountRequestModel, MyDataLoginRequestModel, MyDataLoginResponseModel, MyDataDoRequestModel, AccountInformation, GetBirthdayByIdResponseModel, MyDataSerialResponseModel, MyDataSerialRequestModel, MyDataRegisterRequestModel, MyDataRegisterResponseModel, MyDataVerifyResultResponseModel, MyDataVerifyResultRequestModel} from './shared.models';
import { ReturnType } from './decorators/return-type.decorator';
import { MemoryStorage } from './memory.storage';
import { LoaderService } from './loader.service';
import { CityAreaZipCode } from '../application/applycard/services/applycard.models';

@Injectable()
export class SharedService {
	private readonly URL = {
		getCustomerInfo: 'api/ApplyCard/GetCustomerInfo',
		getDAWHOInfo: 'api/ApplyCard/GetDAWHOInfo',
		isILoanUser: 'api/Member/IsILoanUser',
		clearAuth: '/api/Security/ClearAuth',
		suspendCheck: '/api/Security/SuspendCheck',
		getBankListUrl: 'api/Finance/GetBankList',
		getBranchListUrl: 'api/Finance/GetBranchList',
		getTransferAccounts: 'api/Accounting/TransferAccounts',
		getZip3Code: 'api/Data/TWZip3Code',
		checkCardMember: 'api/ApplyCard/CheckCardMember',
		applyCardTermsUrl: 'api/ApplyCard/TermsUrl',
		keepSessionAlive: '/api/Security/KeepSessionAlive',
		canApplyVirtaulCard: 'api/ApplyCard/CanApplyVirtaulCard',
		checkVirtualCard: 'api/Apply/CheckVirtualCard',
		queryMMAUserStatus: 'api/Member/QueryMMAUserStatus',
		getBirthdayById: 'api/Member/GetBirthdayById',
		serverInfo: 'api/Utils/ServerInfo',
		checkDebitCardApply: 'api/DebitCard/CheckApply',
		checkCreditRefund: 'api/Apply/CreditRefundCheck',
		authOtherBankAccount: 'api/Member/AuthOtherBankAccount',
		mydataLogin: 'api/MyData/MyDataLogin',
		mydataDo: 'api/MyData/MyDataDo',
		myDataSerial: 'api/MyData/MyDataSerial',
		myDataRegister: 'api/MyData/MyDataRegister',
		myDataVerifyResult: 'api/MyData/MyDataVerifyResult'
	};
	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async GetCustomerInfo(memberType: number, source = 0, productType = 0, cifType?: number): Promise<BaseResponse<CustomerInfoModel>> {
		const request = new BaseRequest({ MemberType: memberType, ID: this.storage.CustId, Source: source, ProductType: productType, cifType }, new RequestHeader(this.storage));
		return await this.loader.run<CustomerInfoModel>(
			() => this.webapi.post(this.URL.getCustomerInfo, request)
		);
	}

	public async GetDAWHOInfo(IsRtnAcc = false): Promise<BaseResponse<DAWHOInfoModel>> {
		const request = new BaseRequest({ ID: this.storage.CustId, IsRetAcc: IsRtnAcc}, new RequestHeader(this.storage));
		return await this.loader.run<DAWHOInfoModel>(
			() => this.webapi.post(this.URL.getDAWHOInfo, request)
		);
	}

	public async IsILoanUser(): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.isILoanUser, request)
		);
	}

	public async CheckCardMember(custId?: string): Promise<BaseResponse<any>> {
		const model = { ID: custId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.checkCardMember, request)
		);
	}

	public async ApplyCardTermsUrl(lang?): Promise<BaseResponse<ApplyCardTermsUrlModel>> {
		const model = { Language: lang };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.applyCardTermsUrl, request)
		);
	}

	public async CanApplyVirtaulCard(cardtype?: string): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId, EMBOSSING_TYPE: cardtype };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.canApplyVirtaulCard, request)
		);
	}

	/** 檢查是否為「虛擬卡」核卡人 */
	public async CheckVirtualCard(): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.checkVirtualCard, request)
		);
	}

	public async QueryMMAUserStatus(): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.queryMMAUserStatus, request)
		);
	}

	public async ClearAuth(authKeys: string[] = null): Promise<BaseResponse<any>> {
		const request = new BaseRequest({ AuthKeys: authKeys}, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.clearAuth, request)
		);
	}

	public async SuspendCheck(url: string = null): Promise<BaseResponse<any>> {
		const request = new BaseRequest({ Url: url}, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.suspendCheck, request)
		);
	}

	public async KeepSessionAlive(): Promise<BaseResponse<any>> {
		const request = new BaseRequest({}, new RequestHeader(this.storage));
		return await this.webapi.post(this.URL.keepSessionAlive, request);
	}

	@ReturnType(BankViewModel)
	public async GetBankList(): Promise<BankViewModel[]> {
		const request = new BaseRequest({}, new RequestHeader(this.storage));
		const response: BaseResponse<ItemsResult<BankViewModel>> =
			await this.webapi.post(this.URL.getBankListUrl, request);
		if (response.ResultCode !== '00') {
			console.error(response.ResultMessage);
			return [];
		}
		return response.Result.Items;
	}

	@ReturnType(BankBranchViewModel)
	public async GetBranchList(BankCode: string): Promise<BankBranchViewModel[]> {
		if (!BankCode) { return []; }
		const request = new BaseRequest({ BankCode: BankCode }, new RequestHeader(this.storage));
		const response: BaseResponse<ItemsResult<BankBranchViewModel>> =
			await this.webapi.post(this.URL.getBranchListUrl, request);
		if (response.ResultCode !== '00') {
			console.error(response.ResultMessage);
			return [];
		}
		return response.Result.Items.map(item =>
			new BankBranchViewModel(
				BankCode,
				item.BranchCode,
				item.BranchCode + ' ' + item.FullName
			)
		);
	}

	/**
	 * get transfer accounts
	 * @return transfer accounts
	 */
	public async GetTransferAccounts(): Promise<TransferAccountViewModel[]> {
		const request = new BaseRequest({ ID: this.storage.CustId }, new RequestHeader(this.storage));
		const response: BaseResponse<ItemsResult<TransferAccountViewModel>> =
			await this.webapi.post(this.URL.getTransferAccounts, request);
		if (response.ResultCode !== '00') {
			console.error(response.ResultMessage);
			return [];
		}
		return response.Result.Items;
	}

	public async getZip3Code(): Promise<BaseResponse<ItemsResult<CityAreaZipCode>>> {
		const body = new BaseRequest({}, new RequestHeader(this.storage));
		return await this.loader.run<ItemsResult<CityAreaZipCode>>(
			() => this.webapi.post(this.URL.getZip3Code, body)
		);
	}

	/**
	 * 是否為MMA網銀會員
	 *
	 * @param {boolean} [bankOnly=false] 只檢查是否為存款戶(排除 6－僅可執行查詢交易會員身份)
	 */
	public async isMmaMember(bankOnly = false) {
		const queryMMAUserStatusResp = await this.QueryMMAUserStatus();
		const mmaMemberCodes = bankOnly ? ["1", "3"] : ["1", "3", "6", "8"];
		if (queryMMAUserStatusResp.ResultCode === "00" && queryMMAUserStatusResp.Result) {
			return mmaMemberCodes.indexOf(queryMMAUserStatusResp.Result.CPRTCD) !== -1;
		}

		return false;
	}

	public async getServerInfo(): Promise<BaseResponse<any>> {
		const model = { };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.serverInfo, request)
		);
	}

	public async GetBirthdayById(ID: string): Promise<BaseResponse<GetBirthdayByIdResponseModel>> {
		const model = { ID: ID };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.getBirthdayById, request)
		);
	}

	/**
	 * 檢核是否無有效的晶片金融卡(無卡、註銷、未開卡)，或已持有簽帳金融卡
	 */
	public async checkDebitCardApply(): Promise<BaseResponse<DebitCardCheckApplyResultModel<AccountInformation>>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.checkDebitCardApply, request)
		);
	}

	/**
	 * 檢核是否符合信用卡費溢繳退申請資格
	 */
	public async checkCreditRefund(): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.checkCreditRefund, request)
		);
	}

	/**
	 * 他行金融帳戶驗證
	 */
	public async authOtherBankAccount(model: AuthOtherBankAccountRequestModel): Promise<BaseResponse<any>> {
		model.ID = this.storage.CustId;
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.authOtherBankAccount, request)
		);
	}

	/**
	 * MyData Login
	 */
	public async mydataLogin(model: MyDataLoginRequestModel): Promise<BaseResponse<MyDataLoginResponseModel>> {
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.mydataLogin, request)
		);
	}

	/**
	 * MyData Do
	 */
	public async mydataDo(model: MyDataDoRequestModel): Promise<BaseResponse<any>> {
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.mydataDo, request)
		);
	}

  /**
	 * MyData Serial
	 */
	public async myDataSerial(model: MyDataSerialRequestModel): Promise<BaseResponse<MyDataSerialResponseModel>> {
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.myDataSerial, request)
		);
	}

  /**
	 * MyData Register
	 */
	public async myDataRegister(model: MyDataRegisterRequestModel): Promise<BaseResponse<MyDataRegisterResponseModel>> {
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.myDataRegister, request)
		);
	}

  /**
	 * MyData VerifyResult
	 */
	public async myDataVerifyResult(model: MyDataVerifyResultRequestModel): Promise<BaseResponse<MyDataVerifyResultResponseModel>> {
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.myDataVerifyResult, request)
		);
	}
}
