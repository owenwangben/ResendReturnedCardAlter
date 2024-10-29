import { SortType } from "../../account.models";

export class UnbilledTxRequestModel {
	public ID: string;
	public DateYYYYMMDD: string;
	public IsExcludePaidUp: boolean;
}

export class UnbilledTxResultModel {
	public IsCompanyUser: boolean; // 是否為公司戶
	public Detail: UnbilledTxRecord[];
	public SubTotal: OutstandingSubTotalRecord[];
}

export class UnbilledTxRecord {
	public CurrencyCode: string;
	public CurrencyName: string;
	public TXDATE: string;
	public DEDATE: string;
	public CardLast4: string;
	public MEMO: string;
	public TXCUR: string;
	public AMT: string;
	public TXAMT: string;
}

export class OutstandingSubTotalRecord {
	public CurrencyCode: string;
	public CurrencyName: string;
	public Count: number;
	public SubTotalAmt: string;
}

export class OutstandingDetailSort {
	public CurrencySortArray: Array<OutstandingDetailCurrencySort>;
}

export class OutstandingDetailCurrencySort {
	public TXDATESortType: SortType; // 交易日期排序方式
	public DEDATESortType: SortType; // 入帳日期排序方式
	public CardLast4SortType: SortType;  // 卡號末四碼排序方式
	public AMTSortType: SortType;  // 金額排序方式
	public SortIndex: number;  // DetailClassifyModel要排序的部分之Index
}
