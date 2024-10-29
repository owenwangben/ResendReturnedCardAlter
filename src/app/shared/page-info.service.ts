import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { environment } from 'environments/environment';

export const AUTH_TYPE = {
	AUTH1: 1, AUTH2: 2, AUTH3: 3, CARD: 4, ACCOUNT: 5, MMA: 6, OTHERCARD: 7, SELECT: 8, CARD_OR_ACCOUNT: 9, DAWHO: 10,
	AUTH11: 11, AUTH12: 12, AUTH13: 13, AUTH14: 14, AUTH15: 15, AUTH16: 16, AUTH17: 17, AUTH18: 18,
	OTHERBANK: 20, QUICKACCOUNT: 21, ACCOUNT_IP: 22, CARD_IP: 23,
	OTP4: 31, OTP5: 32, OTP6: 33, OTP14: 34, OTP17: 35, OTP18: 36, OTP19: 37, OTP20: 38, OTP21: 39,
	SSO: 51, MBILL: 53,
	OTP1: 99, OTP2: 98, OTP3: 97, OTP7: 96, OTP8: 95, OTP9: 94, OTP10: 93, OTP11: 92, OTP13: 91, OTP15: 90, OTP16: 89, OTP22: 88
};

@Injectable()
export class PageInfoService {
	private _lastBreadcrumbs = '';
	private _lastCategory = '';
	private _lastPageName = '';
	private _url = '/';
	private _info = null;
	private readonly pages: Array<{ path: string, regexp: RegExp, name: string, category: string,
		auth: any, header: boolean, css: string, mobile: boolean, breadcrumbs: string }>;

	public constructor(private router: Router) {
		this.router.events.subscribe(evt => {
			if (evt instanceof NavigationStart) {
				this._url = evt.url;
				this._info = this.find(evt.url);
				if (this.info) {
					if (this.info.breadcrumbs) { this._lastBreadcrumbs = this.info.breadcrumbs; }
					if (this.info.category) { this._lastCategory = this.info.category; }
					if (this.info.name) { this._lastPageName = this.info.name; }
				}
			}
		});

		this.pages = [
			{
				path: '', regexp: /(\/?)$/gi,
				name: '首頁', category: '', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard'
			},
			// {
			// 	path: '/HouseFun', regexp: /(\/HouseFun)$/gi,
			// 	name: '永豐銀行好房卡', category: '', auth: [],
			// 	header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard'
			// },
			{
				path: '/Account/Info', regexp: /(\/Account\/Info)$/gi,
				name: '帳務資訊', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Account/Info'
			},
			{
				path: '/Account/StatementInquiry', regexp: /(\/Account\/StatementInquiry)$/gi,
				name: '近期帳單', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Account/StatementInquiry'
			},
			{
				path: '/Account/UnbilledTxInquiry', regexp: /(\/Account\/UnbilledTxInquiry)$/gi,
				name: '未出帳單明細', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Account/UnbilledTxInquiry'
			},
			{
				path: '/Account/SpendingAnalytics', regexp: /(\/Account\/SpendingAnalytics)$/gi,
				name: '信用卡消費分析', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Account/SpendingAnalytics'
			},
			{
				path: '/Account/SpendingAnalytics/Month', regexp: /(\/Account\/SpendingAnalytics\/Month)$/gi,
				name: '信用卡消費分析', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Account/SpendingAnalytics'
			},
			{
				path: '/Account/SpendingAnalytics/Category', regexp: /(\/Account\/SpendingAnalytics\/Category)$/gi,
				name: '信用卡消費分析', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Account/SpendingAnalytics'
			},
			{
				path: '/Account/SpendingAnalytics/Feedback', regexp: /(\/Account\/SpendingAnalytics\/Feedback)$/gi,
				name: '信用卡消費分析', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Account/SpendingAnalytics'
			},
			{
				path: '/Account/GiftCardTxInquiry', regexp: /(\/Account\/GiftCardTxInquiry)$/gi,
				name: 'GIFT CARD交易查詢', category: '0', auth: [],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Account/GiftCardTxInquiry'
			},
			{
				path: '/Activity/AnnualFee', regexp: /(\/Activity\/AnnualFee)$/gi,
				name: '年費資格查詢', category: '3', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Activity/AnnualFee'
			},
			{
				path: '/Activity/AirportPickup', regexp: /(\/Activity\/AirportPickup)$/gi,
				name: '機場接送資格查詢', category: '3', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Activity/AirportPickup'
			},
			{
				path: '/Activity/RegisteredInquiry', regexp: /(\/Activity\/RegisteredInquiry)$/gi,
				name: '已登錄活動查詢', category: '3', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Activity/RegisteredInquiry'
			},
			{
				path: '/Activity/Register', regexp: /(\/Activity\/Register)$/gi,
				name: '活動登錄', category: '3', auth: [],
				header: false, css: 'rwd-activity-register', mobile: true, breadcrumbs: '/SinoCard/Activity/Register'
			},
			{
				path: '/Activity/Verify', regexp: /(\/Activity\/Verify\/.*)$/gi,
				name: '活動登錄', category: '3', auth: [],
				header: false, css: 'rwd-activity-register', mobile: true, breadcrumbs: '/SinoCard/Activity/Register'
			},
			{
				path: '/Application/EStatementChange', regexp: /(\/Application\/EStatementChange)$/gi,
				name: '行動/電子帳單 通知設定', category: '1', auth: [AUTH_TYPE.AUTH11, AUTH_TYPE.OTP14],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/EStatementChange'
			},
			{
				path: '/Application/EStatementReprint', regexp: /(\/Application\/EStatementReprint)$/gi,
				name: '補寄電子帳單', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/EStatementReprint'
			},
			{
				path: '/Application/StatementReprint', regexp: /(\/Application\/StatementReprint)$/gi,
				name: '補寄實體帳單', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/StatementReprint'
			},
			{
				path: '/Application/CardActivation', regexp: /(\/Application\/CardActivation)$/gi,
				name: '網路開卡', category: '1', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/CardActivation'
			},
			{
				path: '/Application/ApplicationStatus', regexp: /(\/Application\/ApplicationStatus)$/gi,
				name: '信用卡申請進度查詢', category: '1', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/ApplicationStatus'
			},
			{
				path: '/Application/DisplayCardPinChange', regexp: /(\/Application\/DisplayCardPinChange)$/gi,
				name: 'Display card 3D驗證密碼修改', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/Application/DisplayCardPinChange'
			},
			{
				path: '/Application/ATMPINChange', regexp: /(\/Application\/ATMPINChange)$/gi,
				name: '預借現金密碼變更', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/ATMPINChange'
			},
			{
				path: '/Application/ATMPINSetup', regexp: /(\/Application\/ATMPINSetup)$/gi,
				name: '預借現金密碼申請', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/ATMPINSetup'
			},
			{
				path: '/Application/OffDM', regexp: /(\/Application\/OffDM)$/gi,
				name: '第三人行銷變更', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/OffDM'
			},
			{
				path: '/Application/ChangeEmail', regexp: /(\/Application\/ChangeEmail)$/gi,
				name: '變更電子郵件信箱', category: '1', auth: [AUTH_TYPE.SSO, AUTH_TYPE.OTP8],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/ChangeEmail'
			},
			{
				path: '/Application/LeaveMessage', regexp: /(\/Application\/LeaveMessage)$/gi,
				name: '電話留言申辦', category: '1', auth: [],
				header: false, css: 'rwd-application-leavemessage', mobile: true, breadcrumbs: '/SinoCard/Application/LeaveMessage'
			},
			// {
			// 	path: '/Application/HanshinarenaCardTransfer', regexp: /(\/Application\/HanshinarenaCardTransfer)$/gi,
			// 	name: '漢神巨蛋卡轉卡', category: '1', auth: [],
			// 	header: false, css: 'rwd-activity-register', mobile: true, breadcrumbs: '/SinoCard/Application/HanshinarenaCardTransfer'
			// },
			{
				path: '/Application/CardLost', regexp: /(\/Application\/CardLost)$/gi,
				name: '卡片掛失', category: '1', auth: [AUTH_TYPE.SSO],
				header: false, css: 'rwd-card-lost', mobile: true, breadcrumbs: '/SinoCard/Application/CardLost'
			},
			{
				path: '/Application/ApplyCard', regexp: /(\/Application\/ApplyCard)$/gi,
				name: '線上辦卡', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/MMA', regexp: /(\/Application\/ApplyCard\/MMA)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.MMA, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Card', regexp: /(\/Application\/ApplyCard\/Card)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.CARD_IP, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Account', regexp: /(\/Application\/ApplyCard\/Account)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.ACCOUNT_IP, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/CardOrAccount', regexp: /(\/Application\/ApplyCard\/CardOrAccount)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.CARD_OR_ACCOUNT, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Dawho', regexp: /(\/Application\/ApplyCard\/Dawho)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.DAWHO, AUTH_TYPE.OTP13],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/QuickAccount', regexp: /(\/Application\/ApplyCard\/QuickAccount)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.QUICKACCOUNT, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/OtherCard', regexp: /(\/Application\/ApplyCard\/OtherCard)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.OTHERCARD, AUTH_TYPE.OTP7],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/OtherBank', regexp: /(\/Application\/ApplyCard\/OtherBank)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.OTHERBANK, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			// {
			// 	path: '/Application/ApplyCard/MMA2', regexp: /(\/Application\/ApplyCard\/MMA2)$/gi,
			// 	name: '線上辦卡(好房卡)', category: '', auth: [AUTH_TYPE.MMA, AUTH_TYPE.OTP3],
			// 	header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			// },
			// {
			// 	path: '/Application/ApplyCard/Card2', regexp: /(\/Application\/ApplyCard\/Card2)$/gi,
			// 	name: '線上辦卡(好房卡)', category: '', auth: [AUTH_TYPE.CARD_IP, AUTH_TYPE.OTP3],
			// 	header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			// },
			// {
			// 	path: '/Application/ApplyCard/Account2', regexp: /(\/Application\/ApplyCard\/Account2)$/gi,
			// 	name: '線上辦卡(好房卡)', category: '', auth: [AUTH_TYPE.ACCOUNT_IP, AUTH_TYPE.OTP3],
			// 	header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			// },
			// {
			// 	path: '/Application/ApplyCard/CardOrAccount2', regexp: /(\/Application\/ApplyCard\/CardOrAccount2)$/gi,
			// 	name: '線上辦卡(好房卡)', category: '', auth: [AUTH_TYPE.CARD_OR_ACCOUNT, AUTH_TYPE.OTP3],
			// 	header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			// },
			{
				path: '/Application/ApplyCard/MMA3', regexp: /(\/Application\/ApplyCard\/MMA3)$/gi,
				name: '線上辦卡(虛擬卡)', category: '', auth: [AUTH_TYPE.MMA, AUTH_TYPE.OTP9],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Card3', regexp: /(\/Application\/ApplyCard\/Card3)$/gi,
				name: '線上辦卡(虛擬卡)', category: '', auth: [AUTH_TYPE.CARD_IP, AUTH_TYPE.OTP9],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Account3', regexp: /(\/Application\/ApplyCard\/Account3)$/gi,
				name: '線上辦卡(虛擬卡)', category: '', auth: [AUTH_TYPE.ACCOUNT_IP, AUTH_TYPE.OTP9],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/CardOrAccount3', regexp: /(\/Application\/ApplyCard\/CardOrAccount3)$/gi,
				name: '線上辦卡(虛擬卡)', category: '', auth: [AUTH_TYPE.CARD_OR_ACCOUNT, AUTH_TYPE.OTP9],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/New', regexp: /(\/Application\/ApplyCard\/New)$/gi,
				name: '線上辦卡', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Upload', regexp: /(\/Application\/ApplyCard\/Upload)$/gi,
				name: '申辦信用卡文件上傳', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				/* 移工卡線上辦卡 */
				path: '/Application/ApplyCard/Intl', regexp: /(\/Application\/ApplyCard\/Intl\/(en|vi|id))$/gi,
				name: '線上辦卡', category: '', auth: [],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard/Intl'
			},
			{
				path: '/Application/ApplyCard/Intl', regexp: /(\/Application\/ApplyCard\/Intl\/(en|vi|id)\/MMA)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.MMA, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Intl', regexp: /(\/Application\/ApplyCard\/Intl\/(en|vi|id)\/CardOrAccount)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.CARD_OR_ACCOUNT, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				path: '/Application/ApplyCard/Intl', regexp: /(\/Application\/ApplyCard\/Intl\/(en|vi|id)\/OtherBank)$/gi,
				name: '線上辦卡', category: '', auth: [AUTH_TYPE.OTHERBANK, AUTH_TYPE.OTP1],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard'
			},
			{
				/* 移工卡上傳缺補文件 */
				path: '/Application/ApplyCard/Intl/', regexp: /\/Application\/ApplyCard\/Intl\/(en|vi|id)\/Upload$/gi,
				name: '申辦信用卡文件上傳', category: '', auth: [],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: '/SinoCard/Application/ApplyCard/Intl'
			},
			{
				path: '/Application/ApplyCard/DsQrcode', regexp: /(\/Application\/ApplyCard\/DsQrcode)$/gi,
				name: '人員推薦線上辦卡QR Code產生器', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/DsQrcode'
			},
			{
				path: '/Application/MyDataComplete', regexp: /(\/Application\/MyDataComplete\/)[1-3]$/gi,
				name: 'MyData驗證完成', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/DsQrcode'
			},
			{
				path: '/Application/MyDataComplete2', regexp: /(\/Application\/MyDataComplete2\/)[1-3]$/gi,
				name: 'MyData驗證完成', category: '', auth: [],
				header: null, css: 'rwd-application-applycard', mobile: true, breadcrumbs: '/SinoCard/Application/DsQrcode'
			},
			{
				path: '/Application/MyDataFail', regexp: /(\/Application\/MyDataFail\/)[1-3]$/gi,
				name: '憑證密碼輸入錯誤', category: '', auth: [],
				header: null, css: 'rwd-application-applycard-fail', mobile: true, breadcrumbs: '/SinoCard/Application/DsQrcode'
			},
			{
				path: '/Application/MyDataRelay', regexp: /(\/Application\/MyDataRelay)$/gi,
				name: 'MyData', category: '', auth: [],
				header: null, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/DsQrcode'
			},
			{
				path: '/Application/MyDataATMRelay', regexp: /(\/Application\/MyDataATMRelay)$/gi,
				name: 'MyData晶片金融卡驗證', category: '', auth: [],
				header: null, css: '', mobile: true, breadcrumbs: '/SinoCard/Application/DsQrcode'
			},
			{
				path: '/Application/CreditRefund', regexp: /(\/Application\/CreditRefund)$/gi,
				name: '信用卡溢繳退款申請', category: '', auth: [AUTH_TYPE.CARD, AUTH_TYPE.OTP16],
				header: false, css: 'credit-refund-rwd', mobile: true, breadcrumbs: '/SinoCard/Application/CreditRefund'
			},
			{
				path: '/Application/PriorActivateCard', regexp: /(\/Application\/PriorActivateCard\/[0-9]{6})$/gi,
				name: '優先啟用碼 卡號資訊查詢', category: '', auth: [AUTH_TYPE.CARD, AUTH_TYPE.OTP22],
				header: false, css: 'rwd-prior-activate-card', mobile: true, breadcrumbs: '/SinoCard/Application/PriorActivateCard'
			},
			{
				path: '/Application/ResendReturnedCard', regexp: /(\/Application\/ResendReturnedCard)$/gi,
				name: '信用卡卡片退回重寄申請',category: '',auth: [],
				header:false,css: 'rwd-resend-returned-card', mobile: true, breadcrumbs: '/SinoCard/Application/ResendReturnedCard'
			},
			{
				path: '/Auth/Auth1', regexp: /(\/Auth\/Auth1\/)[0-9]$/gi,
				// name: '信用卡卡友驗證(額調查詢)', category: '', auth: [],
				name: '信用卡卡友驗證', category: '', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/Auth2', regexp: /(\/Auth\/Auth2)$/gi,
				// name: '信用卡卡友驗證(分期總約)', category: '', auth: [],
				name: '信用卡卡友驗證', category: '', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/Auth3', regexp: /(\/Auth\/Auth3)$/gi,
				// name: '信用卡卡友驗證(額度調整)', category: '', auth: [],
				name: '信用卡卡友驗證', category: '', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/OTP', regexp: /(\/Auth\/OTP\/)[1-9][0-9]*$/gi,
				name: '簡訊動態密碼驗證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/OTP2', regexp: /(\/Auth\/OTP2\/)[7]$/gi,
				name: '簡訊動態密碼驗證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/MMA', regexp: /(\/Auth\/MMA)$/gi,
				name: '永豐 MMA 網銀會員身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/Card', regexp: /(\/Auth\/Card)$/gi,
				name: '永豐信用卡戶身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/Card', regexp: /(\/Auth\/Card\/)[1]$/gi,
				name: '永豐信用卡戶身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/Account', regexp: /(\/Auth\/Account)$/gi,
				name: '永豐存款戶身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/Account', regexp: /(\/Auth\/Account\/)[1]$/gi,
				name: '永豐存款戶身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/CardOrAccount', regexp: /(\/Auth\/CardOrAccount)$/gi,
				name: '永豐卡友/存戶身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/DaWho', regexp: /(\/Auth\/DaWho)$/gi,
				name: '永豐DAWHO身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/QuickAccount', regexp: /(\/Auth\/QuickAccount)$/gi,
				name: '雲端開戶身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/OtherCard', regexp: /(\/Auth\/OtherCard)$/gi,
				name: '他行信用卡身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/OtherBank', regexp: /(\/Auth\/OtherBank)$/gi,
				name: '他行臺幣存款帳戶認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/Select', regexp: /(\/Auth\/Select)$/gi,
				name: '選擇身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard', mobile: true, breadcrumbs: ''
			},
			/* 移工卡 */
			{
				path: '/Auth/CardOrAccount/Intl', regexp: /(\/Auth\/CardOrAccount\/Intl\/(en|vi|id))$/gi,
				name: '永豐卡友/存戶身分認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/OtherBank/Intl', regexp: /(\/Auth\/OtherBank\/Intl\/(en|vi|id))$/gi,
				name: '他行臺幣存款帳戶認證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Auth/OTP/Intl', regexp: /(\/Auth\/OTP\/Intl\/(en|vi|id)\/)[1]$/gi,
				name: '簡訊動態密碼驗證', category: '', auth: [],
				header: false, css: 'rwd-application-applycard-intl', mobile: true, breadcrumbs: ''
			},

			{
				path: '/ErrorPage', regexp: /(\/ErrorPage)$/gi,
				name: '', category: '', auth: [],
				header: true, css: '', mobile: true, breadcrumbs: ''
			},
			{
				path: '/Reward/AvailablePoints', regexp: /(\/Reward\/AvailablePoints)$/gi,
				name: '紅利點數查詢', category: '4', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Reward/AvailablePoints'
			},
			{
				path: '/Reward/Redemption', regexp: /(\/Reward\/Redemption)$/gi,
				name: '紅利點數兌換', category: '4', auth: [],
				header: false, css: 'rwd-reward-redemption', mobile: true, breadcrumbs: '/SinoCard/Reward/Redemption'
			},
			{
				path: '/Reward/Redemption/Products', regexp: /(\/Reward\/Redemption\/Products\/)[0-9]*$/gi,
				name: '紅利點數兌換', category: '4', auth: [],
				header: false, css: 'rwd-reward-redemption', mobile: true, breadcrumbs: '/SinoCard/Reward/Redemption'
			},
			{
				path: '/Reward/Redemption/Detail', regexp: /(\/Reward\/Redemption\/Detail\/)[0-9]*$/gi,
				name: '紅利點數兌換', category: '4', auth: [],
				header: false, css: 'rwd-reward-redemption', mobile: true, breadcrumbs: '/SinoCard/Reward/Redemption'
			},
			{
				path: '/Reward/Redemption/Redeem', regexp: /(\/Reward\/Redemption\/Redeem)$/gi,
				name: '紅利點數兌換', category: '4', auth: [],
				header: false, css: 'rwd-reward-redemption', mobile: true, breadcrumbs: '/SinoCard/Reward/Redemption'
			},
			{
				path: '/Reward/RedemptionRecords', regexp: /(\/Reward\/RedemptionRecords)$/gi,
				name: '紅利兌換紀錄', category: '4', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Reward/RedemptionRecords'
			},
			// {
			// 	path: '/Reward/FunMarketMMA', regexp: /(\/Reward\/FunMarketMMA)$/gi,
			// 	name: '豐市集MMA身分驗證', category: '4', auth: [],
			// 	header: false, css: '', mobile: true, breadcrumbs: ''
			// },
			// {
			// 	path: '/Reward/FunMarketPoints', regexp: /(\/Reward\/FunMarketPoints)$/gi,
			// 	name: '豐市集紅利點數查詢', category: '4', auth: [AUTH_TYPE.MMA],
			// 	header: false, css: '', mobile: true, breadcrumbs: ''
			// },
			// {
			// 	path: '/Reward/Bonus2018Q1', regexp: /(\/Reward\/Bonus2018Q1)$/gi,
			// 	name: '2018Q1集點活動', category: '4', auth: [],
			// 	header: false, css: 'rwd-bonus-2018Q1', mobile: true, breadcrumbs: ''
			// },
			// {
			// 	path: '/Reward/Bonus2018Q1/Verification', regexp: /(\/Reward\/Bonus2018Q1\/Verification)$/gi,
			// 	name: '2018Q1集點活動', category: '4', auth: [],
			// 	header: false, css: 'rwd-bonus-2018Q1', mobile: true, breadcrumbs: ''
			// },
			// {
			// 	path: '/Reward/Bonus2018Q1/Main', regexp: /(\/Reward\/Bonus2018Q1\/Main)$/gi,
			// 	name: '2018Q1集點活動', category: '4', auth: [],
			// 	header: false, css: 'rwd-bonus-2018Q1', mobile: true, breadcrumbs: ''
			// },
			// {
			// 	path: '/Reward/Bonus2018Q1/Redeem1', regexp: /(\/Reward\/Bonus2018Q1\/Redeem1)$/gi,
			// 	name: '2018Q1集點活動', category: '4', auth: [],
			// 	header: false, css: 'rwd-bonus-2018Q1', mobile: true, breadcrumbs: ''
			// },
			// {
			// 	path: '/Reward/Bonus2018Q1/Redeem2', regexp: /(\/Reward\/Bonus2018Q1\/Redeem2)$/gi,
			// 	name: '2018Q1集點活動', category: '4', auth: [],
			// 	header: false, css: 'rwd-bonus-2018Q1', mobile: true, breadcrumbs: ''
			// },
			// {
			// 	path: '/Reward/Bonus2018Q1/Inquiry', regexp: /(\/Reward\/Bonus2018Q1\/Inquiry)$/gi,
			// 	name: '2018Q1集點活動', category: '4', auth: [],
			// 	header: false, css: 'rwd-bonus-2018Q1', mobile: true, breadcrumbs: ''
			// },
			{
				path: '/Reward/CashbackInquiry', regexp: /(\/Reward\/CashbackInquiry)$/gi,
				name: '消費回饋查詢', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Reward/CashbackInquiry'
			},
			{
				/* T Point回饋計畫: 兌換紀錄與設定 */
				path: '/Reward/TPointsRedemptionRecords', regexp: /(\/Reward\/TPointsRedemptionRecords)$/gi,
				name: 'T Points回饋計畫', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Reward/TPointsRedemptionRecords'
			},
			{
				/* T Point回饋計畫: 累積查詢 */
				path: '/Reward/TPointsRewardInquiry', regexp: /(\/Reward\/TPointsRewardInquiry)$/gi,
				name: 'T Points回饋計畫', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Reward/TPointsRewardInquiry'
			},
			// {
			// 	path: '/Reward/TopCardInquiry', regexp: /(\/Reward\/TopCardInquiry)$/gi,
			// 	name: '頂級卡禮遇資格查詢', category: '', auth: [AUTH_TYPE.SSO],
			// 	header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Reward/TopCardInquiry'
			// },
			{
				path: '/Reward/CarbonInquiry', regexp: /(\/Reward\/CarbonInquiry)$/gi,
				name: '消費碳足跡查詢', category: '3', auth: [AUTH_TYPE.SSO],
				header: false, css: 'rwd-activity-carboninquiry', mobile: true, breadcrumbs: '/SinoCard/Reward/CarbonInquiry'
			},
			{
				path: '/Transaction/RTEAgreement', regexp: /(\/Transaction\/RTEAgreement)$/gi,
				name: '消費分期約定事項', category: '2', auth: [AUTH_TYPE.AUTH12, AUTH_TYPE.OTP21],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/RTEAgreement'
			},
			{
				path: '/Transaction/TempCLI', regexp: /(\/Transaction\/TempCLI)$/gi,
				name: '信用卡臨時額度調整', category: '1', auth: [AUTH_TYPE.AUTH13, AUTH_TYPE.OTP4],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/TempCLI'
			},
			{
				path: '/Transaction/TempCLIStatus', regexp: /(\/Transaction\/TempCLIStatus)$/gi,
				name: '信用卡額度調整進度查詢', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/TempCLIStatus'
			},
			{
				path: '/Transaction/PermCLI', regexp: /(\/Transaction\/PermCLI)$/gi,
				name: '信用卡永久額度調整', category: '1', auth: [AUTH_TYPE.AUTH14, AUTH_TYPE.OTP5],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/PermCLI'
			},
			{
				path: '/Transaction/PermCLIMortgage', regexp: /(\/Transaction\/PermCLIMortgage)$/gi,
				name: '好房卡永久額度調整', category: '1', auth: [AUTH_TYPE.AUTH3, AUTH_TYPE.OTP6],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/PermCLIMortgage'
			},
			{
				path: '/Transaction/PermCLIStatus', regexp: /(\/Transaction\/PermCLIStatus)$/gi,
				name: '信用卡額度調整進度查詢', category: '1', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/TempCLIStatus' // 麵包屑同臨調
			},
			{
				path: '/Transaction/CashAdvance', regexp: /(\/Transaction\/CashAdvance)$/gi,
				name: '預借現金', category: '2', auth: [AUTH_TYPE.AUTH15, AUTH_TYPE.OTP17],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/CashAdvance'
			},
			{
				path: '/Transaction/RTE', regexp: /(\/Transaction\/RTE)$/gi,
				name: '單筆消費分期', category: '2', auth: [AUTH_TYPE.AUTH16, AUTH_TYPE.OTP20],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/RTE'
			},
			{
				path: '/Transaction/RTEStmt', regexp: /(\/Transaction\/RTEStmt)$/gi,
				name: '帳單分期', category: '2', auth: [AUTH_TYPE.AUTH17, AUTH_TYPE.OTP19],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/RTEStmt'
			},
			{
				path: '/Transaction/RTEStmtRecords', regexp: /(\/Transaction\/RTEStmtRecords)$/gi,
				name: '帳單分期查詢', category: '2', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/RTEStmtRecords'
			},
			{
				path: '/Transaction/EasyChoice', regexp: /(\/Transaction\/EasyChoice)$/gi,
				name: '預借現金分期(易通財)', category: '2', auth: [AUTH_TYPE.AUTH18, AUTH_TYPE.OTP18],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/EasyChoice'
			},
			{
				path: '/Transaction/EasyChoiceStatus', regexp: /(\/Transaction\/EasyChoiceStatus)$/gi,
				name: '預借現金分期(易通財)申請查詢', category: '2', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/Transaction/EasyChoiceStatus'
			},
			{
				path: '/DebitCard/StatementInquiry', regexp: /(\/DebitCard\/StatementInquiry)$/gi,
				name: 'Debit卡近期交易明細', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/DebitCard/StatementInquiry'
			},
			{
				path: '/DebitCard/UnbilledTxInquiry', regexp: /(\/DebitCard\/UnbilledTxInquiry)$/gi,
				name: 'Debit卡授權交易明細', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/DebitCard/UnbilledTxInquiry'
			},
			{
				path: '/DebitCard/SpendingAnalytics', regexp: /(\/DebitCard\/SpendingAnalytics)$/gi,
				name: 'Debit卡消費分析', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/DebitCard/SpendingAnalytics'
			},
			{
				path: '/DebitCard/SpendingAnalytics/Month', regexp: /(\/DebitCard\/SpendingAnalytics\/Month)$/gi,
				name: 'Debit卡消費分析', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/DebitCard/SpendingAnalytics'
			},
			{
				path: '/DebitCard/SpendingAnalytics/Category', regexp: /(\/DebitCard\/SpendingAnalytics\/Category)$/gi,
				name: 'Debit卡消費分析', category: '0', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: false, breadcrumbs: '/SinoCard/DebitCard/SpendingAnalytics'
			},
			{
				path: '/DebitCard/SetNotify', regexp: /(\/DebitCard\/SetNotify)$/gi,
				name: 'Debit卡交易明細單/通知設定', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/DebitCard/SetNotify'
			},
			{
				path: '/DebitCard/ResendStatement', regexp: /(\/DebitCard\/ResendStatement)$/gi,
				name: '補寄Debit卡交易明細單', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/SinoCard/DebitCard/ResendStatement'
			},
			{
				path: '/DebitCard/Apply', regexp: /(\/DebitCard\/Apply)$/gi,
				name: '簽帳金融卡換發', category: '', auth: [AUTH_TYPE.SSO, AUTH_TYPE.OTP15],
				header: false, css: 'rwd-debitcard-apply', mobile: true, breadcrumbs: '/SinoCard/DebitCard/Apply'
			},
			{
				path: '/Auth/MBill', regexp: /(\/Auth\/MBill)$/gi,
				name: '登入行動帳單', category: '', auth: [],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/Bill', regexp: /(\/MobileStatement\/Bill\/)*\w*$/gi,
				name: '行動帳單帳務資訊', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/BillDetail', regexp: /(\/MobileStatement\/BillDetail\/)*\w*$/gi,
				name: '行動帳單消費明細', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/Message', regexp: /(\/MobileStatement\/Message\/)*\w*$/gi,
				name: '行動帳單訊息', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/MessageContent', regexp: /(\/MobileStatement\/MessageContent\/)[1-3]\/*\w*$/gi,
				name: '行動帳單訊息內容', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/Bonus', regexp: /(\/MobileStatement\/Bonus\/)*\w*$/gi,
				name: '行動帳單紅利回饋', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/Apply', regexp: /(\/MobileStatement\/Apply\/)*\w*$/gi,
				name: '行動帳單我要申請', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/CustomerService', regexp: /(\/MobileStatement\/CustomerService\/)*\w*$/gi,
				name: '行動帳單客戶服務', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/Payment', regexp: /(\/MobileStatement\/Payment\/)*\w*$/gi,
				name: '行動帳單立即繳款', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/PaymentBarcode', regexp: /(\/MobileStatement\/PaymentBarcode\/)[1-2]\/*\w*$/gi,
				name: '行動帳單繳款條碼', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/MobileStatement/PaymentQrcode', regexp: /(\/MobileStatement\/PaymentQrcode\/)*\w*$/gi,
				name: '行動帳單繳款專用QR Code', category: '', auth: [AUTH_TYPE.MBILL],
				header: false, css: 'mobile-statement', mobile: true, breadcrumbs: ''
			},
			{
				path: '/VirtualCard/CardInfoInquiry', regexp: /(\/VirtualCard\/CardInfoInquiry)$/gi,
				name: '虛擬卡卡號查詢', category: '', auth: [AUTH_TYPE.SELECT],
				header: true, css: '', mobile: true, breadcrumbs: '/VirtualCard/CardInfoInquiry'
			},
			{
				path: '/VirtualCard/CardInfoInquiry/MMA', regexp: /(\/VirtualCard\/CardInfoInquiry\/MMA)$/gi,
				name: '虛擬卡卡號查詢', category: '', auth: [AUTH_TYPE.SSO],
				header: true, css: '', mobile: true, breadcrumbs: '/VirtualCard/CardInfoInquiry'
			},
			{
				path: '/VirtualCard/CardInfoInquiry/Card', regexp: /(\/VirtualCard\/CardInfoInquiry\/Card)$/gi,
				name: '虛擬卡卡號查詢', category: '', auth: [AUTH_TYPE.CARD, AUTH_TYPE.OTP10],
				header: true, css: '', mobile: true, breadcrumbs: '/VirtualCard/CardInfoInquiry'
			},
			{
				path: '/VirtualCard/CardInfoInquiry/Account', regexp: /(\/VirtualCard\/CardInfoInquiry\/Account)$/gi,
				name: '虛擬卡卡號查詢', category: '', auth: [AUTH_TYPE.ACCOUNT, AUTH_TYPE.OTP10],
				header: true, css: '', mobile: true, breadcrumbs: '/VirtualCard/CardInfoInquiry'
			},
			{
				path: '/VirtualCard/PermCLI', regexp: /(\/VirtualCard\/PermCLI)$/gi,
				name: '虛擬卡額度調整', category: '', auth: [AUTH_TYPE.SSO, AUTH_TYPE.OTP11],
				header: true, css: '', mobile: true, breadcrumbs: '/VirtualCard/PermCLI'
			},
			{
				path: '/Application/AutomaticDebit', regexp: /(\/Application\/AutomaticDebit)$/gi,
				name: '信用卡自動扣繳服務', category: '', auth: [AUTH_TYPE.SSO],
				header: false, css: 'rwd-automatic-debit', mobile: true, breadcrumbs: '/SinoCard/Application/AutomaticDebit'
			},
			{
				path: '/Reward/CarbonInquiry', regexp: /(\/Reward\/CarbonInquiry)$/gi,
				name: '消費碳足跡查詢', category: '', auth: [],
				header: false, css: 'rwd-automatic-debit', mobile: true, breadcrumbs: '/SinoCard/Reward/CarbonInquiry'
			},
		];
	}

	private find(url: string) {
		url = url.split('?')[0];
		return this.pages.find(item =>
			url.search(item.regexp) === 0 && (!environment.IsMobile || item.mobile)
		);
	}

	public translate(url: string): string {
		const info = this.find(url);
		if (info) {
			return info.path + url.substr(info.path.length);
		}
		return '';
	}

	public get url() {
		return this._url && this._url.split('?')[0];
	}

	public get info() {
		return this._info;
	}

	public get name() {
		return this._lastPageName;
	}
	public set name(name: string) {
		this._lastPageName = name;
	}

	public get breadcrumbs() {
		return this._lastBreadcrumbs;
	}

	public get category() {
		return this._lastCategory;
	}

	public get auth() {
		return this.info && this.info.auth;
	}

	public get header() {
		return this.info && this.info.header;
	}

	public set setHeader(newHeader: boolean) {
		this._info.header = newHeader;
	}

	public get css() {
		return this.info && this.info.css;
	}
}
