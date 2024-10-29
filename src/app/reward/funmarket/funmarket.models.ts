export class GetBonusRewardResultModel {
	UID: string; // (UID)
	Rs: boolean; // (`SP_WEB_KEEP_OTP` 是否成功)
	Desc: string; // (保留欄位)
	IsEmp: string; // (是否為員工)
	OTPKey: string; // (OTP Key)
	DisplayBonusPoint: number; // (顯示點數)
	LoginForBonusExternalUrl: string;
}
