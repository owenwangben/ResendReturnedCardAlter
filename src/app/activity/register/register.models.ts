export interface CheckStatusResultModel {
	Code: string;					// (活動登錄代碼)
	Name: string;					// (活動名稱)
	IsActive: boolean;				// (是否為啟用中的活動，若為 false 表示活動已結束、查無活動、活動關閉)
	Count: number;					// (已登錄人數)
	CanSign: boolean; 				// (是否可登錄，true 表示可登錄；false 表示 登錄已達上限)
	IsVipActivity: boolean;			// (是否為VIP活動)
	IsInstallmentActivity: boolean; 	// (是否為分期活動)
}

export interface RegisterResultModel {
	Seq: string;						// (登錄序號)
  IsApplyElectronicBill: number; // 帳單類別。(0:實體帳單, 1:電子帳單, 2:行動帳單)
}

export interface InstallmentAgreementStatusModel {
	ApplyDate: Date;					// (分期約定事項的簽訂日期)
	IsSigned: boolean;				// (是否已簽訂分期約定事項)
}

export interface CheckVIPResponseModel extends BaseResult {
	Code: string;
	Html: string;
}
