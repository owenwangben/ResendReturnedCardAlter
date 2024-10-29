import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { DebitCardResendStatementRequestModel, DebitCardResendStatementInfoRequestModel,
	DebitCardResendStatementInfoResultModel } from "./debit-card-resend-statement.models";

@Injectable()
export class DebitCardResendStatementService {
	private resendEStmtUrl = 'api/DebitCard/ResendStatement';
	private getResendEStmtInfoUrl = 'api/DebitCard/GetResendStmtInfo';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async Resend(stmtDate: string): Promise<BaseResponse<BaseResult>> {
		const model: DebitCardResendStatementRequestModel = {
			ID: this.storage.CustId,
			DateYYYYMM: stmtDate
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.resendEStmtUrl, body)
		);
	}

	public async GetInfo(): Promise<BaseResponse<DebitCardResendStatementInfoResultModel>> {
		const model: DebitCardResendStatementInfoRequestModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<DebitCardResendStatementInfoResultModel>(
			() => this.webapi.post(this.getResendEStmtInfoUrl, body)
		);
	}
}
