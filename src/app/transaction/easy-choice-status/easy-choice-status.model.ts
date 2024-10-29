export class ECStatusRequestModel {
	public ID: string;
	/** 查詢起日 */
	public StartDate: Date;
	/** 查詢迄日 */
	public EndDate: Date;
}

export class ECStatusResultRecord {
	/** 申請來源 */
	public ApplyChannel: string;
	/** 申請日期 */
	public ApplyDate: string;
	/** 處理進度 */
	public StatusDesc: string;
	/** 核可金額 */
	public ApproveAmount: string;
	/** 核可日期 */
	public ApproveDate: string;
}
