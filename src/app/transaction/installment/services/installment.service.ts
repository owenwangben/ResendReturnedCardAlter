import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';
import * as Model from './typings';

@Injectable()
export class InstallmentService {
	private URL = {
		setAgreementStatus: 'api/Finance/SetInstallmentAgreement',
		getStmtInstallmentRecord: 'api/Finance/StmtInstallmentApplyRecord',
		getStmtInstallmentData: 'api/Finance/GetStmtInstallmentData',
		applyStmtInstallment: 'api/Finance/ApplyStmtInstallment',
		getInstallmentData: 'api/Finance/GetInstallmentData',
		installmentApplyCheck: 'api/Finance/InstallmentApplyCheck',
		easyCashCalcCycleFee: 'api/Finance/EasyCashCalcCycleFee',
		installmentApply: 'api/Finance/InstallmentApply',
		getInstallmentAgreementStatus: 'api/Finance/GetInstallmentAgreementStatus',
		cardsUrl: 'api/Member/Cards'
	};

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	/** 設定消費分期約定事項已讀 */
	async SetInstallmentAgreementStatus(): Promise<BaseResponse<BaseResult>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.setAgreementStatus, request)
		);
	}

	/** 分期試算
	 * @param {number} LoanAmt 申貸本金
	 * @param {number} Period 期數
	 * @param {number} AnnRate 年利率
	 * @param {number} ProcessFee 手續費
	 * @return {Model.EasyCashCalcCycleFeeItem[]} 試算結果
	*/
	async EasyCashCalcCycleFee(LoanAmt: number, Period: number, AnnRate: number, ProcessFee: number)
		: Promise<BaseResponse<Model.EasyCashCalcCycleFeeResult>> {
		const model: Model.EasyCashCalcCycleFeeRequestBody = {
			LoanAmt: LoanAmt,
			Period: Period,
			AnnRate: AnnRate,
			ProcessFee: ProcessFee
		};
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<Model.EasyCashCalcCycleFeeResult>(
			() => this.webapi.post(this.URL.easyCashCalcCycleFee, request)
		);
	}

	async CanApplyStmtRTE(): Promise<boolean> {
		const response = await this.GetStmtInstallmentData();
		return response.ResultCode === "00";
	}

	/** 取得帳單分期資料
	 * @return {Model.ViewModels.StatementInstallmentData}
	*/
	async GetStmtInstallmentData(): Promise<BaseResponse<Model.GetStmtInstallmentDataResult>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<Model.GetStmtInstallmentDataResult>(
			() => this.webapi.post(this.URL.getStmtInstallmentData, request)
		);
	}

	/** 申請帳單分期
	 * @param {string} MFPCode 符合名單
	 * @param {string} BaseMFPcode 符合BASE
	 * @param {Date} StmtDate 帳單日
	 * @param {Date} DueDate 繳款截止日
	 * @param {number} StmtAmt 當期應繳總金額
	 * @param {number} StmtMinAmt 當期最低應繳
	 * @param {number} FirstPeriodAmt 首期應繳金額 = 試算表中第一筆的「每月應付本息金額
	 * @param {string} InstallmentAmt 可分期金額
	 * @param {number} Period 期數
	 * @param {number} Rate 利率
	 * @param {number} IRR 總費用年百分率 = 試算表中第一筆的「總費用年百分率」
	 * @param {number} Fee 手續費
	 * @param {string} Referrer 推薦人員編
	*/
	async ApplyStmtInstallment(MFPCode: string, BaseMFPcode: string, StmtDate: Date,
		DueDate: Date, StmtAmt: number, StmtMinAmt: number, FirstPeriodAmt: number,
		InstallmentAmt: string,	Period: number,	Rate: number, IRR: number, Fee: number, Referrer: string)
			: Promise<BaseResponse<TransactionResult>> {
		const model: Model.ApplyStmtInstallmentRequestBody = {
			PID: this.storage.CustId,
			MFPCode: MFPCode,
			BaseMFPcode: BaseMFPcode,
			StmtDate: StmtDate,
			DueDate: DueDate,
			StmtAmt: StmtAmt,
			StmtMinAmt: StmtMinAmt,
			FirstPeriodAmt: FirstPeriodAmt,
			InstallmentAmt: InstallmentAmt,
			Period: Period,
			Rate: Rate,
			IRR: IRR,
			Fee: Fee,
			Referrer: Referrer,
      Verify_Method: this.storage.LoginType
		};
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<TransactionResult>(
			() => this.webapi.post(this.URL.applyStmtInstallment, request)
		);
	}

	/** 取得單比分期資料 */
	async GetInstallmentData(): Promise<BaseResponse<Model.GetInstallmentDataResult>> {
		const model: Model.GetInstallmentDataRequestBody = {
			ID: this.storage.CustId,
			TransactionType: 0
		};
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<Model.GetInstallmentDataResult>(
			() => this.webapi.post(this.URL.getInstallmentData, request)
		);
	}

	/** 驗證分期資料並取得各期利率資料
	 * @param {Model.TransactionDetail} tranaction 欲申請分期的交易
	 */
	async InstallmentApplyCheck(tranaction: Model.TransactionDetail)
		: Promise<BaseResponse<Model.InstallmentApplyCheckResult>> {
		const model: Model.InstallmentApplyCheckRequestBody = {
			ID: this.storage.CustId,
			Amount: tranaction.Amount,
			AuthCode: tranaction.AuthCode,
			CardNumber: tranaction.CardNumber,
			Memo: tranaction.Memo,
			DeDate: tranaction.DeDate,
			TxDate: tranaction.TransactionDate,
			MCC: tranaction.MCC,
			MerchantNo: tranaction.MerchNumber,
			FirstFlag: tranaction.FirstFlag,
			IsTCTD: tranaction.IsTCTD,
		};
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<Model.InstallmentApplyCheckResult>(
			() => this.webapi.post(this.URL.installmentApplyCheck, request)
		);
	}

	/**
	 * 申請分期
	 * @param {number} Amount 交易金額
	 * @param {string} CardNumber 卡號
	 * @param {string} AuthCode 授權碼
	 * @param {Date} DeDate 入帳日期 yyyyMMdd
	 * @param {string} Memo 交易明細
	 * @param {Date} TransactionDate 交易日期
	 * @param {number} Period 選擇的分期期數
	 * @param {string} ProductCode 選擇期數的分期產品代碼
	 * @param {string} Program 選擇期數的專案代碼
	 * @param {number} Rate 選擇期數的利率
	 * @param {string} FirstAmt 選擇期數的手續費
	 * @param {string} SalRef 簽單編號
	 * @param {string} Referrer 推薦人員編
	 */
	async InstallmentApply(IsTCTD: boolean, Amount: number, CardNumber: string,
		AuthCode: string, DeDate: Date, Memo: string, TransactionDate: Date,
		Period: number,	ProductCode: string, Program: string, Rate: number,
		FirstAmt: number, SalRef: string, Referrer: string, MCC: string, TXCUR: string, MerchArea: string): Promise<BaseResponse<BaseResult>> {

		const formatOptions: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		};
		const model: Model.InstallmentApplyRequestBody = {
			ID: this.storage.CustId,
			Amount: Amount,
			IsTCTD: IsTCTD,
			CardNumber: CardNumber,
			DeDate: DeDate,
			Memo: Memo,
			TransactionDate: TransactionDate,
			Period: Period,
			ProductCode: ProductCode,
			Program: Program,
			Rate: Rate,
			FirstAmt: '' + FirstAmt,
			AuthCode: AuthCode,
			SalRef: SalRef,
			Referrer: Referrer,
      Verify_Method: this.storage.LoginType,
      MCC: MCC,
      TXCUR: TXCUR,
      MerchArea: MerchArea
		};
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.URL.installmentApply, request)
		);
	}

	async GetStmtInstallmentApplyRecord(begin: Date, end: Date): Promise<BaseResponse<Model.StmtInstallmentApplyRecordResult>> {
		const model = { ID: this.storage.CustId, BeginDate: begin, EndDate: end };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<Model.StmtInstallmentApplyRecordResult>(
			() => this.webapi.post(this.URL.getStmtInstallmentRecord, request)
		);
	}

	async GetInstallmentAgreementStatus(): Promise<BaseResponse<Model.InstallmentAgreementStatus>> {
		const model = { ID: this.storage.CustId, NewAgreementOnly: true };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<Model.InstallmentAgreementStatus>(
			() => this.webapi.post(this.URL.getInstallmentAgreementStatus, request)
		);
	}

	public async getCards(): Promise<BaseResponse<any>> {
		const model = { UID: this.storage.CustId };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.cardsUrl, body)
		);
	}
}
