﻿export class EStatementGetInfoRequestModel {
	public PID: string;  // 身分證字號
}

export class EStatementGetInfoResultModel {
	public EmailPoolStatus: string;
	public Email: string;
	public Mobile: string;
	public IsApplyElectronicBill: number;    		// 0:實體帳單, 1:電子帳單, 2:行動帳單
	public IsApplyConsumerCollection: boolean;    	// 收到每日消費彙整通知
	public IsApplyEaper: boolean;    				// 收到永豐銀行信用卡電子活動通知
	public IsApplyPaymentNotify: boolean;			// 是否收到信用卡繳款入帳通知
	public IsRemindPaymentSMSNotify: boolean;       // 是否開啟信用卡繳款提醒簡訊通知
	public IsRemindPaymentEmailNotify: boolean;     // 是否開啟信用卡繳款提醒EMAIL通知
}

export class EStatementChangeRequestModel {
	public PID: string;  							// 身分證字號
	public Email: string;
	public IsApplyElectronicBill: boolean;    		// 收到永豐銀行信用卡電子帳單通知，並同意停止實體帳單寄送
	public IsApplyConsumerCollection: boolean;    	// 收到每日消費彙整通知
	public IsApplyEaper: boolean;    				// 收到永豐銀行信用卡電子活動通知
	public IsApplyPaymentNotify: boolean;			// 是否收到信用卡繳款入帳通知
	public IsRemindPaymentNotify: boolean;          // 是否開啟信用卡繳款提醒通知
}

export class EStatementChangeInfoRequestModel {
	public PID: string;  							// 身分證字號
}

export class ModifyEmailModel {
	public Email: string;
	public EmailConfirm: string;
}
