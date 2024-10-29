import { Injectable } from '@angular/core';
import { LoaderService } from 'app/shared/loader.service';
import { MemoryStorage } from 'app/shared/memory.storage';
import { BaseRequest, BaseResponse, RequestHeader, WebApiInvoker } from 'app/shared/webapi.invoker';
import { BehaviorSubject } from 'rxjs';
import {
	CarbonCreatCrad,
	GetAgreementDataResultModel, getCarbonTrxResultModel,
	InsertAgreementRecordResultModel, IsEligibleCardResultModel
} from './carbon-inquiry-models';

@Injectable()
export class CarbonInquiryService {
	private isEligibleCard = 'api/Carbon/IsEligibleCard';
	private getAgreementData = 'api/Carbon/GetAgreementData';
	private insertAgreementRecord = 'api/Carbon/InsertAgreementRecord';
	private getCarbonTrx = 'api/Carbon/GetCarbonTrx';
	/**同意條款訂閱用同意時間 flag */
	agree$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	/** IsEligibleCard 的卡片資料 */
	_isEligibleCardData: CarbonCreatCrad[];
	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async IsEligibleCard(): Promise<BaseResponse<IsEligibleCardResultModel>> {
		const model = {
			ID: this.storage.CustId,
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<IsEligibleCardResultModel>(
			() => this.webapi.post(this.isEligibleCard, body)
		);
	}

	public async GetAgreementData(): Promise<BaseResponse<GetAgreementDataResultModel>> {
		const model = {};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<GetAgreementDataResultModel>(
			() => this.webapi.post(this.getAgreementData, body)
		);
	}

	public async InsertAgreementRecord(version: string): Promise<BaseResponse<InsertAgreementRecordResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Version: version
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<InsertAgreementRecordResultModel>(
			() => this.webapi.post(this.insertAgreementRecord, body)
		);
	}

	public async GetCarbonTrx(startDate: Date, endDate: Date, cardNo: string): Promise<BaseResponse<getCarbonTrxResultModel>> {
		// startDate: Date, endDate: Date
		const model = {
			ID: this.storage.CustId,
			// 查詢起年月，格式：YYYYMMDD
			StartDate: startDate,
			// 查詢迄年月，格式：YYYYMMDD
			EndDate: endDate,
			// 卡號，未填則查詢所有卡號
			CardNo: cardNo
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<getCarbonTrxResultModel>(
			() => this.webapi.post(this.getCarbonTrx, body)
		);
	}

	/** 儲存是否同意條約
	  * true:已同意，未開通碳足跡 --> 啟用成功
	  * false:未同意 --> 條約彈跳視窗
	*/
	public carbonStart(start: boolean) {
		this.agree$.next(start);
	}

	/** 儲存IsEligibleCard 的卡片資料 */
	public IsEligibleCardData(CardData: CarbonCreatCrad[]) {
		this._isEligibleCardData = CardData;
	}
}
