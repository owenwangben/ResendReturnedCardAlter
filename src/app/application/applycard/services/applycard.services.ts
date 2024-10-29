import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader,
	BaseResponse, SharedService, CustomerInfoModel, ErrorPageService, } from "app/shared/shared.module";
import { IsFromApp } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
import { GetAllCardInfoResultModel, CardInfo, CityAreaZipCode, GetBankAccountsResultModel,
	SendApplyInfoRequestModel, ApplyCardStepResultModel, ArcIsExpired, ArcInfoModel, ApplyInfoLogRequestModel, SendApplyInfoResponseModel,
	GetShareHoldingInfoResultModel} from './applycard.models';

@Injectable()
export class ApplyCardService {
	public legalAgeDate = 20230101; // 2023年1月1日民法成年人變更為18歲
	private readonly URL = {
		getAllCardInfo: 'api/ApplyCard/ApplicationCardInfo',
		getSingleCardInfo: 'api/ApplyCard/SingleCardInfo',
		getBankAccounts: 'api/ApplyCard/GetBankAccounts',
		sendApplyInfo: 'api/ApplyCard/SendApplyInfo',
		checkId: 'api/ApplyCard/UploadFileCheckID',
		webApply: 'api/ApplyCard/WebApply',
		completeUpload: 'api/ApplyCard/CompleteUploadFile',
		step: 'api/ApplyCard/Step',
		canApplyWealthUnlimiteCard: 'api/ApplyCard/CanApplyWealthUnlimiteCard',
		dupCheck: 'api/ApplyCard/DupCheck',
		dsQrCodeGenerator: 'api/ApplyCard/DsQrCodeGenerator',
		checkApplyCardGroup: 'api/ApplyCard/CheckApplyCardGroup',
		updateApplyStatus: 'api/ApplyCard/UpdateApplyStatus',
		checkToken: 'api/ApplyCard/CheckToken',
		applyInfoLog: 'api/ApplyCard/ApplyInfoLog',
		checkDawhoApply: 'api/ApplyCard/CheckDawhoApply',
		getShareHoldingInfo: 'api/ApplyCard/GetShareHoldingInfo',
	};
	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService,
		private errorPageService: ErrorPageService,
		private service: SharedService
	) { }

	public async getAllCardInfo(onlyVisible: boolean = true, isPreview: boolean = false): Promise<BaseResponse<GetAllCardInfoResultModel>> {
		const body = new BaseRequest({ OnlyVisible: onlyVisible, IsPreview: isPreview }, new RequestHeader(this.storage));
		return await this.loader.run<GetAllCardInfoResultModel>(
			() => this.webapi.post(this.URL.getAllCardInfo, body)
		);
	}

	public async getSingleCardInfo(cardId: number, onlyVisible: boolean = true): Promise<BaseResponse<CardInfo>> {
		const body = new BaseRequest({ CardId: cardId, OnlyVisible: onlyVisible }, new RequestHeader(this.storage));
		return await this.loader.run<CardInfo>(
			() => this.webapi.post(this.URL.getSingleCardInfo, body)
		);
	}

	public async getCustomerInfo(memberType: number, source?: number, productType?: number,cifType?: number ): Promise<BaseResponse<CustomerInfoModel>> {
		return await this.service.GetCustomerInfo(memberType, source, productType, cifType);
	}

	public async checkCardMember(custId?: string): Promise<BaseResponse<CustomerInfoModel>> {
		return await this.service.CheckCardMember(custId);
	}

	/** CurrencyType: 1:台幣; 2:美金; 3:日元; 4:歐元 */
	public async getBankAccounts(currencyType: number): Promise<BaseResponse<GetBankAccountsResultModel>> {
		const body = new BaseRequest({ ID: this.storage.CustId, CurrencyType: currencyType }, new RequestHeader(this.storage));
		return await this.loader.run<GetBankAccountsResultModel>(
			() => this.webapi.post(this.URL.getBankAccounts, body)
		);
	}

	public async sendApplyInfo(model: SendApplyInfoRequestModel): Promise<BaseResponse<SendApplyInfoResponseModel>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<SendApplyInfoResponseModel>(
			() => this.webapi.post(this.URL.sendApplyInfo, body)
		);
	}

	public async checkId(id: string, captcha: string): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest({ ID: id }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.checkId, body, { 'Captcha': captcha })
		);
	}

	public async clearAuth(): Promise<BaseResponse<any>> {
		return await this.service.ClearAuth();
	}

	public async KeepSessionAlive(): Promise<BaseResponse<any>> {
		return await this.service.KeepSessionAlive();
	}

	public async webApply(product: string, name: string, tel_Day: string,
		mobile: string, isCardMember: boolean): Promise<BaseResponse<any>> {
		const body = new BaseRequest({
			Product: product, Name: name, Tel_Day: tel_Day,
			Mobile: mobile, IsHaveCard: isCardMember
		}, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.webApply, body)
		);
	}

	public async completeUpload(id: string, fileIds: string[], source: number) {
		const body = new BaseRequest({ ID: id, FileIds: fileIds, Source: source }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.completeUpload, body)
		);
	}

	public async step(name: string, mobile: string, isCardMember: boolean, cardId: number, id: string): Promise<BaseResponse<ApplyCardStepResultModel>> {
		const body = new BaseRequest({ CName: name, Mobile: mobile, IsMemeber: isCardMember, CardId: cardId, ID: id
		}, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.step, body)
		);
	}

	public async CanApplyWealthUnlimiteCard(pid: string, cardFace: number): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest({ ID: pid, CardFace: cardFace }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.canApplyWealthUnlimiteCard, body)
		);
	}

	public async DupCheck(pid: string, cardFace: number, isTwoFactorAuth: boolean): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest({ ID: pid, CardFace: cardFace, IsTwoFactorAuth: isTwoFactorAuth }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.dupCheck, body)
		);
	}

	public async DsQrCodeGenerator(dsno: string, referrer: string, branchCode): Promise<BaseResponse<any>> {
		const body = new BaseRequest({ DsNo: dsno, Referrer: referrer, BranchCode: branchCode }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.dsQrCodeGenerator, body)
		);
	}

	public async checkApplyCardGroup(cardface: string, Data: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest({ ID: this.storage.CustId, cardface, Data }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.checkApplyCardGroup, body)
		);
	}

	public async checkARCId(id: string, captcha: string, type?: number): Promise<BaseResponse<ArcIsExpired>> {
		let rq = {};
		if (type == null) {
			rq = { ID: id};
		}
		else {
			rq = { ID: id, Type: type};
		}
		const body = new BaseRequest(rq, new RequestHeader(this.storage));
		return await this.loader.run<ArcIsExpired>(
			() => this.webapi.post(this.URL.checkId, body, { 'Captcha': captcha })
		);
	}

	public async completeARCUpload(id: string, fileIds: string[], source: number, type: number, ArcInfo?: ArcInfoModel) {
		let rq = {};
		if (type == 1) {
			rq = { ID: id, FileIds: fileIds, Source: source, ArcInfo };
		}
		else {
			rq = { ID: id, FileIds: fileIds, Source: source };
		}
		const body = new BaseRequest(rq, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.completeUpload, body)
		);
	}

	public async updateApplyStatus(cardface: string, Data: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest({ ID: this.storage.CustId, Cardface: cardface, Data }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.updateApplyStatus, body)
		);
	}

	public async checkToken(Cardface: string, Token: string, ID: string): Promise<BaseResponse<any>> {
		const body = new BaseRequest({ Cardface, Token, ID }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.checkToken, body)
		);
	}

	public async applyInfoLog(model: ApplyInfoLogRequestModel): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.applyInfoLog, body)
		);
	}

	certCheckCallback(suggestAction, selectCode){
		if ((suggestAction === "None" || suggestAction === "Renew") && selectCode === "SUCCESS") {
			if (IsFromApp() && environment.IsMobile) {
				const DoUrl = window['eweb_config'].soft_cert_url;
				location.href = "sinopacaction:{softcert_domydata}{" + DoUrl + "}";
			}
		}
		else {
			swal({
				html: '您尚未申請軟體憑證，請於申請/設定服務>憑證管理申請憑證，或選擇其他方式進行驗證。',
				confirmButtonText: "申請憑證",
				cancelButtonText: "確定",
				showCancelButton: true,
				reverseButtons: false
			}).catch(swal.noop).then( (ok) => {
				if (ok) {
					location.href = "sinopacaction:{softcertsetting}{}";
				}
			});
		}
	}

  public async checkDawhoApply(ID: string): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest({ ID }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.checkDawhoApply, body)
		);
	}

	/** 取得金控共享資訊 */
	public async getShareHoldingInfo(ID: string, Birthday: string): Promise<BaseResponse<GetShareHoldingInfoResultModel>> {
		const body = new BaseRequest({ ID: ID, Birthday: Birthday }, new RequestHeader(this.storage));
		return await this.webapi.post(this.URL.getShareHoldingInfo, body);
	}
}
