﻿export class GetSetNotifyInfoRequestModel {
	public ID: string;  // 身分證字號
}

export class GetSetNotifyInfoResultModel {
	public Email: string;
	public IsApplyConsumerCollection: boolean;    // 收取消費通知
	public IsApplyEaper: boolean;                 // 收取Debit卡電子活動通知
}

export class SetNotifyRequestModel {
	public ID: string;                           // 身分證字號
	public Email: string;
	public IsApplyConsumerCollection: boolean;    // 收取消費通知
	public IsApplyEaper: boolean;                 // 收取Debit卡電子活動通知
}

export class ModifyEmailModel {
	public Email: string;
	public EmailConfirm: string;
}
