import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader,
	BaseResponse, SharedService } from 'app/shared/shared.module';

@Injectable()
export class PermCLIService {
	private getInfoUrl = 'api/Finance/GetPermanentCreditInfo';
	private getInfo2Url = 'api/Finance/GetPermanentCreditInfo2';
	private uploadAttachmentUrl = 'api/Finance/UploadPermanentCreditAttachment';
	private uploadAttachment2Url = 'api/Finance/UploadPermanentCreditAttachment2';
	private applyUrl = 'api/Finance/PermanentAdjustApply';
	private apply2Url = 'api/Finance/HouseLoanCardPermAdjApply';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService,
		private service: SharedService
	) { }

	async isMortgageCustomer(): Promise<BaseResponse<any>> {
		return await this.service.IsILoanUser();
	}

	async getPermanentCreditInfo(smsType?: number): Promise<BaseResponse<PermanentCreditViewModel>> {
		const model = { ID: this.storage.CustId, SmsType: smsType };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<PermanentCreditViewModel>(
			() => this.webapi.post(this.getInfoUrl, request)
		);
	}

	async getPermanentCreditInfo2(smsType?: number): Promise<BaseResponse<PermanentCreditViewModel>> {
		const model = { ID: this.storage.CustId, SmsType: smsType };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<PermanentCreditViewModel>(
			() => this.webapi.post(this.getInfo2Url, request)
		);
	}

	async postPermanentCredit(model: PermanentCreditViewModel): Promise<BaseResponse<TransactionResult>> {
		const body: PermanentCreditApply = {
			ID: this.storage.CustId,
			CName: model.Name,
			OriginalCredit: model.OriginalCredit,
			AdjustLimit: +model.OriginalCredit + +model.IncreaseCredit,
			ReasonCode: model.Reason,
			ReasonDesc: model.ReasonDesc,
			Company: model.Company,
			IsFinancialCustomer: model.IsFinancialCustomer,
			AttachmentRefs: model.AttachmentRefs.map(item => item.ReferenceNo),
			SmsType: model.SmsType,
			FinancialProofType: model.FinancialProofType,
			LandRegisterAddressType: model.LandRegisterAddressType,
			LandRegisterAddress: model.LandRegisterAddress,
			OTPCellNo: model.OTPCellNo,
			OTPReqDT: model.OTPReqDT,
			OTPRespDT: model.OTPRespDT
		};
		const request = new BaseRequest(body, new RequestHeader(this.storage));
		return await this.loader.run<TransactionResult>(
			() => this.webapi.post(this.applyUrl, request)
		);
	}

	async postPermanentCredit2(model: PermanentCreditViewModel): Promise<BaseResponse<TransactionResult>> {
		const body = {
			ID: this.storage.CustId,
			Line: model.OriginalCredit,
			NewLine: +model.OriginalCredit + +model.IncreaseCredit,
			ReasonCode: model.Reason,
			ReasonDesc: model.ReasonDesc,
			Company: model.Company,
			IsFinancialCustomer: model.IsFinancialCustomer,
			AttachmentRefs: model.AttachmentRefs.map(item => item.ReferenceNo),
			OTPCellNo: model.OTPCellNo,
			OTPReqDT: model.OTPReqDT,
			OTPRespDT: model.OTPRespDT
		};
		const request = new BaseRequest(body, new RequestHeader(this.storage));
		return await this.loader.run<TransactionResult>(
			() => this.webapi.post(this.apply2Url, request)
		);
	}
}
