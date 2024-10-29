import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';
import { GetECDataModel, ECDataResultModel, ApplyECModel, CalCycleFeeECModel, CalCycleFeeResultRecord } from "./easy-choice.model";

@Injectable()
export class EasyChoiceService {
	private getUrl = 'api/Finance/GetEasyChoiceData';
	private applyUrl = 'api/Finance/EasyChoiceApply';
	private calcCycleFeeUrl = 'api/Finance/EasyCashCalcCycleFee';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getEasyChoiceData(): Promise<BaseResponse<ECDataResultModel>> {
		const model: GetECDataModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ECDataResultModel>(
			() => this.webapi.post(this.getUrl, body)
		);
	}

	public async applyEasyChoice(model: ApplyECModel): Promise<BaseResponse<TransactionResult>> {
		model.CustID = this.storage.CustId;
		model.BankCode = model.BankCode + model.BranchCode;
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<TransactionResult>(
			() => this.webapi.post(this.applyUrl, body)
		);
	}

	public async calCycleFeeEasyCash(model: CalCycleFeeECModel): Promise<BaseResponse<ItemsResult<CalCycleFeeResultRecord>>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ItemsResult<CalCycleFeeResultRecord>>(
			() => this.webapi.post(this.calcCycleFeeUrl, body)
		);
	}

}
