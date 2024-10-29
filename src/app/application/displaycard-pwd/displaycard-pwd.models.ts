export class EditPwdRequestModel {
	/** 持卡人 ID */
	public ID: string;
	/** Display Card 卡號 */
	public CardNo: string;
	/** 新的驗證碼 */
	public NewPwd: string;
	/** 新的驗證碼(確認) */
	public NewPwdConfirm: string;
}

export class GetCardListModel {
	/** 持卡人 ID */
	public ID: string;
}

export class CardRecord {
	/** 卡號 */
	public CardNo: string;
}
