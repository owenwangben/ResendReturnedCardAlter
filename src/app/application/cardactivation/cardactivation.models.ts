export class ActivateCardRequestModel {
	public CardNo: string;
	public BOD_YYYYMMDD: string;
	public ValidDate_MMYY: string;
	public captcha: string;
}

export class ActivateCardResponseModel {
	/** 卡號 */
	public CardNo: string;
	/** 交易編號 */
	public RefNo: string;
	/** 回覆碼 */
	public RE_CODE: string;
	/** 是否為MMA網銀會員 */
	public IsMmaMember: boolean;
  /** 帳單類別。(0:實體帳單, 1:電子帳單, 2:行動帳單) */
  public IsApplyElectronicBill: number;
  /** TypeFace */
  public TypeFace: string;
}
