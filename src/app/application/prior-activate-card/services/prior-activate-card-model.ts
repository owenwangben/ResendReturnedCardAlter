/** 虛實卡的卡片資訊 */
export class CardInfo {
	/** 核卡日 */
	public ApproveDate: string;
	/** 優先啟用碼失效日 */
	public PriorActivateExpDate: string;
	/** 卡片名稱 */
	public CardName: string;
	/** 國際組織/卡別 */
	public CardTypeName: string;
	/** 卡號 */
	public CardNo: string;
	/** 顯示的卡號 */
	public DisplayCardNo: string;
	/** 有效期限 - 欄位格式【MMYY】 */
	public ExpDate: string;
	/** 信用卡安全碼 */
	public CVV2: string;
	/** 中文姓名 */
	public CName: string;
	/** 英文姓名 */
	public EName: string;
	/** 卡人永久信用額度 */
	public PermanentCreditLimit: number;
	/** 卡片目前額度 */
	public CreditLimit: number;
	/** 是否已開卡 */
	public IsActived: boolean;
	/** 卡片可用餘額 */
	public CreditAvailable: number;
	/** 卡別 */
	public ProductCode: string;
	/** 卡面 */
	public CardFace: string;
	/** 是否已優先啟用 */
	public IsPriorActivated: boolean;
}
