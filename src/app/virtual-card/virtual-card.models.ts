export class CardInfoInquiryViewModel {
	/** 所有的卡片資料 */
	public Cards: VirtualCard[];
	/** 所有的卡片資訊 */
	public CardInfos: VirtualCardInfo[];
	/** 選擇的卡片資訊 */
	public SelectedCardInfo: VirtualCardInfo;
	/** 選擇的卡號 */
	public SelectedCardNo: string;
	/** 是否藉由綠色通關(卡利達)進件的客戶 */
	public IsGreePassCustomer: boolean;
}

export class PermanentCreditViewModel {
	/** 卡片資料 */
	public Cards: VirtualCard[];
	public SelectedCard: VirtualCardInfo;
	/** 卡號 */
	public CardNo: string;
	public NewLine: string;
}

export class VirtualCard {
	/** 卡號 */
	public CardNo: string;
	/** 卡片名稱 */
	public Name: string;
	/** 主附卡代碼 */
	public CardTypeCode: string;
	/** 主卡或附卡 */
	public CardTypeDesc: string;
	public CardFace: string;
	/** 卡別 */
	public ProductCode: string;
	/** 有效期限 - 欄位格式【MMYY】 */
	public ExpDate: string;
}

/** 虛擬卡的卡片資訊 */
export class VirtualCardInfo {
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
}

/** 虛擬卡額度調整 - 回應結果 */
export class VirtualCardPermAdjApplyResult {
	/** 回覆碼 */
	public RESP_CODE: string;
	/** 卡號 */
	public CARD_NUM: string;
	/** 卡片額度 */
	public CR_LIMIT: number;
	/** 原卡片額度 */
	public LAST_CR_LIMIT: number;
}
