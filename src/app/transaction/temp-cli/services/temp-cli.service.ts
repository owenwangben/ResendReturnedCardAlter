import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';

@Injectable()
export class TempCLIService {
	private applyUrl = 'api/Finance/ApplyTemporaryCredit';
	private getUrl = 'api/Finance/GetTemporaryCreditInfo';
	private checkHolidayUrl = 'api/Data/CheckIsHoliday';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	async checkHoliday(date: Date): Promise<BaseResponse<any>> {
		const model = { QueryDate: date };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.checkHolidayUrl, request)
		);
	}

	/** 取得空白的申請資料 */
	async getTemporaryCreditInfo(): Promise<BaseResponse<TemporaryCredit>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<TemporaryCredit>(
			() => this.webapi.post(this.getUrl, request)
		);
	}

	async postTemporaryCredit(model: TemporaryCreditViewModel): Promise<BaseResponse<TransactionResult>> {
		const cardList = model.ApplyCards
			.filter(item => item.IsChecked)
			.map(item => item.CardNo);

		const body: TemporaryCreditApply = {
			ID: this.storage.CustId,
			CardNoList: cardList,
			AdjutLimit: +model.OriginalCredit + +model.IncreaseCredit,
			RegionCode: 'B',
			ReasonCode: model.Reason,
			ReasonDesc: model.ReasonDesc,
			EffDate: model.ApplyPeriod.From,
			ExpDate: model.ApplyPeriod.To,
			Tel: model.IsContactByMobile ? model.ContactMobile : model.ContactType
		};
		const request = new BaseRequest(body, new RequestHeader(this.storage));
		return await this.loader.run<TransactionResult>(
			() => this.webapi.post(this.applyUrl, request)
		);
	}

	private dateToString(date: Date): string {
		if (typeof date === 'string') {
			date = new Date(date);
		}
		const dateConfig = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		};
		return date.toLocaleDateString('zh-TW', dateConfig).replace(/\//gi, '');
	}
}
