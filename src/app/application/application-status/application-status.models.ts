export class ApplicationStatusRequestModel {
	public ID: string;
	public birthday: string;
	public captcha: string;
}

export class ApplicationStatusResult {
	public PID: string;
	public CanApplyUrgentCase: boolean;
	public Items: ApplicationStatusData[];
}

export class ApplicationStatusData {
	public CARD_TYPE: string;
	public STATUS: string;
	public STATUS_DESC: string;
	public STATUS_DATE: string;
	public EBOSSING_TYPE: string;
	public BIRTHDAY: string;
	public CARD_FEE_DT: string;
	public CARD_DESC: string;

	/** 補件狀態 */
	public DOC_STATUS: string[];

	/** 客服訊息 */
	public ServiceMessages: string[];

	/** 缺補件訊息 */
	public UploadFileMessages: string[];

	/** 申請編號 */
	public APPLNO: string;

	public Memo: string;

	/** 下載聲明書訊息 */
	public DownloadFileMessages: string[];

	public LetterCode:string
}
