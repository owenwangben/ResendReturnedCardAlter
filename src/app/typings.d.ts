/** 基本的response result */
interface BaseResult {
	/** 是否成功 */
	Success?: boolean;
}

/** 帶有交易代碼的 response result 型別 */
interface TransactionResult extends BaseResult {
	/** 交易編號 */
	RefNo: string;
}

interface ItemsResult<T> {
	Items: T[];
}
