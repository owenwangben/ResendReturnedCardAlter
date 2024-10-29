import { MyDataLoginRequestModel, MyDataLoginResponseModel } from 'app/shared/shared.models';
export function pad(s: string, str: string, padLeft: boolean = true): string {
	if (typeof str === 'undefined') {
		return s;
	}

	if (padLeft) {
		return (s + str).slice(-s.length);
	}
	else {
		return (str + s).substring(0, s.length);
	}
}

export function IsFromApp(): string {
	const apps = [
		'Sinopac mobilebanking',
		'fun Wallet Android',
		'fun Wallet iPhone'
	];
	//console.log(navigator.userAgent);
	return apps.find(app => navigator.userAgent.indexOf(app) >= 0);
}

export function IsFromIOS(): string {
	const apps = [
		'iPhone',
		'iPad',
		'iPod'
	];
	return apps.find(app => navigator.userAgent.indexOf(app) >= 0);
}

export function IsTouchDevice() {
	return 'ontouchstart' in window        // works on most browsers
		|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
}

export function GetCurrencyCode(CurrencyName: string): string {
	const currencies = [
		{ CurrencyName: '臺幣', CurrencyCode: 'TWD' },
		{ CurrencyName: '美元', CurrencyCode: 'USD' },
		{ CurrencyName: '港幣', CurrencyCode: 'HKD' },
		{ CurrencyName: '英磅', CurrencyCode: 'GBP' },
		{ CurrencyName: '澳幣', CurrencyCode: 'AUD' },
		{ CurrencyName: '新加坡幣', CurrencyCode: 'SGD' },
		{ CurrencyName: '瑞士法郎', CurrencyCode: 'CHF' },
		{ CurrencyName: '加幣', CurrencyCode: 'CAD' },
		{ CurrencyName: '日圓', CurrencyCode: 'JPY' },
		{ CurrencyName: '瑞典克郎', CurrencyCode: 'SEK' },
		{ CurrencyName: '歐元', CurrencyCode: 'EUR' },
		{ CurrencyName: '紐西蘭幣', CurrencyCode: 'NZD' },
		{ CurrencyName: '泰銖', CurrencyCode: 'THB' },
		{ CurrencyName: '南非幣', CurrencyCode: 'ZAR' },
		{ CurrencyName: '人民幣', CurrencyCode: 'CNY' }
	];
	const currency = currencies.find(item => item.CurrencyName === CurrencyName);
	return currency && currency.CurrencyCode;
}

export function DisableCSS(csslist: string[], disabled: boolean): void {
	$.each($.grep(document.styleSheets, (css) => {
		return css.href && csslist.find(item => css.href.indexOf(item) >= 0);
	}), (i, css) => {
		css.disabled = disabled;
	});
}

export function ProcssAccordion(selector: string) {
	$(selector + ' > li > .atitle').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('active').parent().siblings().find('a').removeClass('active');
		const $acontent = $(this).next('div.acontent');
		// if (!$acontent.is(':visible')) {
		// 	$(selector + ' li div.acontent:visible').slideUp();
		// }
		$acontent.slideToggle();
	}).siblings().addClass('acontent').hide();
	$(selector + ' li:first-child > a').addClass('active').next('div.acontent').show();
}

export function ShowSelection(title: string, options: Array<{ key: string, value: string }>, fn: (key: string) => void) {
	const dialog = $('body').append(
		`<div id='overlay' onclick="this.remove()">
			<ol class="list formList">
				<div class="options" style="display:block;opacity:1;position:absolute;top:20%;left:50%">
					<ul id='selection'><p>${title}</p></ul>
				</div>
			</ol>
		</div>`
	);
	const selection = $('#selection', dialog);
	for (const option of options) {
		$(`<li>${option.value}</li>`).appendTo(selection).click(() => fn(option.key));
	}

	$('<div class="close">close</div>').appendTo(selection).click(() => {
		// $('#overlay').remove();
	});
}

export function OpenLightbox(lboxid: string) {
	$('.lbox-block').find(lboxid).show().siblings().hide();
	$('.lboxed').lightbox_me({
		closeClick: false,
		centered: true,
		onLoad: function () {
			ScrollTo($('.lboxed').offset().top);
		}
	});
}

export function ScrollTo(pos) {
	$('html, body').animate({ scrollTop: pos }, 250);
}

export function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 判斷是否包含全形英數字
 * @param value 要檢查的字串
 */
export function IsContainsFullWidthChar(value: string) {
	const cjkRegex = new RegExp(/[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]/);
	return cjkRegex.test(value);
}

/**
 * 判斷字串是否只包含中文字。
 * 參考：https://stackoverflow.com/questions/21109011/javascript-unicode-string-chinese-character-but-no-punctuation
 */
export const CjkStringPattern = '^[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]+$|' +
	'^([\ud840-\ud868][\udc00-\udfff])+$|' +
	'^(\ud869[\udc00-\uded6\udf00-\udfff])+$|' +
	'^([\ud86a-\ud86c][\udc00-\udfff])+$|' +
	'^(\ud86d[\udc00-\udf34\udf40-\udfff])+$|' +
	'^(\ud86e[\udc00-\udc1d])+$';
/**
 * 判斷字串是否只包含中文字及原住民7個專用字(\uFF1A\u02BC\u2303\u1E5F\u00E9\u0268\u0289)
 */
export const CnamePattern = '^[\uFF1A\u02BC\u2303\u1E5F\u00E9\u0268\u0289' +
	'\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]+$|' +
	'^([\uFF1A\u02BC\u2303\u1E5F\u00E9\u0268\u0289\ud840-\ud868][\udc00-\udfff])+$|' +
	'^(\uFF1A\u02BC\u2303\u1E5F\u00E9\u0268\u0289\ud869[\udc00-\uded6\udf00-\udfff])+$|' +
	'^([\uFF1A\u02BC\u2303\u1E5F\u00E9\u0268\u0289\ud86a-\ud86c][\udc00-\udfff])+$|' +
	'^(\uFF1A\u02BC\u2303\u1E5F\u00E9\u0268\u0289\ud86d[\udc00-\udf34\udf40-\udfff])+$|' +
	'^(\uFF1A\u02BC\u2303\u1E5F\u00E9\u0268\u0289\ud86e[\udc00-\udc1d])+$';

/**
 * 判斷是否包含特殊符號
 * @param value 要檢查的字串
 */
export function IsContainsSpecialSymbol(value: string) {
	const regex = new RegExp(/[~!@#$%^&*()_+{}|:"<>?`\-=\[\]\\;',./]/);
	return regex.test(value);
}

/**
 * 判斷身份證字號是否包含合法的字元
 * @param id 身份證字號
 */
export function IsValidId(id: string) {
	const regex = new RegExp(/[a-zA-Z0-9]{10}/);
	return regex.test(id);
}

/** 線上辦卡串接來源 */
export enum ApplyCardSource {
	None = 0,
	DAWHO
}

/** 線上辦卡頁面名稱 */
export enum ApplyCardPageName {
	/** 首頁(卡片選擇頁) */
	index = 1,
	卡友或存戶身份認證,
	DAWHO身份認證,
	他行信用卡身份認證,
	OTP驗證,
	辦卡流程step1,
	辦卡流程step2,
	辦卡流程step3,
	同意條款,
	確認資料,
	上傳資料,
	申請結果頁,
	身份證OCR,
	雲端開戶身分認證,
}

/**
 * 線上辦卡埋Code
 * @param card 卡片名稱
 * @param cardtype 卡別
 * @param pageid 頁面代碼
 * @param source 串接來源
 */
export function ApplyCardPushGTM(card: string, cardtype: string, pageid: ApplyCardPageName,
	source: string = '') {
	const pagename = ApplyCardPageName[pageid];
	const winObj: any = window;
	winObj.dataLayer = winObj.dataLayer || [];
	winObj.dataLayer.push({
		'event': 'applycard_pageview',
		'card': card,
		'cardtype': cardtype,
		'pagename': pagename,
		'source': source
	});
}

/** 取得查詢字串參數值
 * @param url 網址
 * @param 查詢參數名稱(有分大小寫)
 */
export function GetQueryParam(url: string, key: string) {
	const urlPair = url.split('?');
	if (urlPair.length >= 2) {
		const queryParams = urlPair[1].split('&');
		for (let i = 0; i < queryParams.length; i++) {
			const pair = queryParams[i].split('=');
			if (pair.length === 2 && pair[0] === key) {
				return pair[1];
			}
		}
	}
	return null;
}

declare var sensors: any;

/**
 * 神策數據：事件追踪
 * @param event_name 事件名稱
 * @param credit_card_name 信用卡名稱
 * @param credit_card_type 信用卡類別
 * @param identity_type 身分類型
 * @param authentication_method 認證方式(永豐卡友/存戶、他行信用卡驗證申請、他行臺幣帳戶驗證申請、下載申請書填寫郵寄申辦、大戶辦卡)
 * @param is_success 是否成功
 * @param failure_reason 失敗原因
 * @param is_member 是否卡友
 * @param id_type 上傳身分證(OCR上傳專用，值可為'身分證正面'、'身分證反面'、'暫不上傳'、'確認上傳')
 */
export function SensorsTrack(event_name: string, credit_card_name: string, credit_card_type: string, identity_type?: string,
	authentication_method: string = '', is_success: boolean = true, failure_reason: string = '',
	is_member?: boolean, id_type?: string) {
	const data = {
		credit_card_name,
		credit_card_type,
		identity_type,
		authentication_method,
		is_success,
		failure_reason,
		is_member,
		id_type
	};
	if (sensors.para.show_log) {
		console.log('[SensorsTrack]\nevent_name: ', event_name, '\ndata:', data);
	}
	sensors.track(event_name, data);
}

/**
 * 神策數據：事件追踪(信用卡分期)
 * @param event_name 事件名稱
 * @param consumption_type 分期類型
 * @param is_success 是否成功
 * @param failure_code 錯誤代碼
 * @param period 期數
 * @param failure_reason 失敗原因
 * @param rate 年利率
 * @param handling_charge 手續費
 * @param Installment_amount 分期金額
 * @param down_payment_amount 首期應繳分期本金
 * @param down_payment_interest 首期應繳利息
 */

export function StagingSensorsTrack(event_name: string, consumption_type: string, is_success: boolean, failure_code: string,
	period?: string, rate?: number, handling_charge?: number,
	failure_reason?: string, down_payment_amount?: number, down_payment_interest?: number, Installment_amount?: number) {
	const data = {
		consumption_type,
		is_success,
		failure_code,
		period,
		rate,
		handling_charge,
		failure_reason,
		down_payment_amount,
		down_payment_interest,
		Installment_amount
	};
	if (sensors.para.show_log) {
		console.log('[SensorsTrack]\nevent_name: ', event_name, '\ndata:', data);
	}
	sensors.track(event_name, data);
}

/**
 * 神策數據：事件追踪(線上辦卡提交按鈕)
 * @param eventName 事件名稱
 * @param cardTitle 信用卡名稱
 * @param cardType 信用卡類別
 * @param success 是否成功
 * @param msg 失敗原因
 * @param sso 是否登入MMA
 * @param twoFactorAuth 是否為雙因驗證
 * @param isCardMember 是否卡友
 * @param isOtherCardAuth 是否為他行卡驗證
 * @param source 串接來源
 * @param authTypeName 身份驗證類型
 */
export function SensorsTrackSubmit(eventName: string, cardTitle: string, cardType: string,
	success: boolean, msg: string, sso: boolean, twoFactorAuth: boolean,
	isCardMember?: boolean, isOtherCardAuth?: boolean, source?: number, authTypeName?: string) {
	const authType = authTypeName ? authTypeName : GetSensorsIdentityType(sso, twoFactorAuth, isOtherCardAuth, source);
	SensorsTrack(eventName, cardTitle, cardType,
		'', authType, success, msg, isCardMember);
}

/**
 * 取得 "身分類型" 字串值
 * @param sso 是否登入MMA
 * @param twoFactorAuth 是否為雙因驗證
 * @param isOtherCardAuth 是否為他行卡驗證
 * @param source 串接來源
 */
export function GetSensorsIdentityType(sso: boolean, twoFactorAuth: boolean, isOtherCardAuth?: boolean, source?: number): string {
	let authTypeName = '';
	if (twoFactorAuth) {
		if (sso) {
			authTypeName = 'MMA會員';
		}
		else if (source === 1) {
			authTypeName = 'DAWHO辦卡';
		}
		else if (isOtherCardAuth) {
			authTypeName = '他行信用卡驗證申請';
		}
		else {
			authTypeName = '永豐卡友/存戶';
		}
	}
	else {
		authTypeName = '一般線上申請';
	}

	return authTypeName;
}

declare var sPlatform: any;

/**
 * 神策數據：全埋點
 * @param islogin 是否登入 MMA
 * @param isMobile 是否為行動裝置
 */
export function SensorsRegisterPage(islogin: boolean = false, isMobile: boolean = false) {
	sensors.registerPage({
		is_login: islogin ? 'Y' : 'N',
		platform: sPlatform,
		product: isMobile ? '行動銀行mweb' : 'MMA'
	});
	sensors.quick('autoTrack');
}

/**
 * 判斷身份證字號是否包含合法的字元
 * @param id 身份證字號
 */
export function IsValidRocId(id: string) {
	const regex = new RegExp(/^[a-zA-Z]{1}[1-2]{1}[0-9]{8}$/);

	if (regex.test(id)) {
		const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  // 英文字首字元
		// 英文字首字元對應的數字
		const ct = ["10", "11", "12", "13", "14", "15", "16", "17", "34", "18", "19", "20", "21",
			"22", "35", "23", "24", "25", "26", "27", "28", "29", "32", "30", "31", "33"];

		// 將英文字首字元轉換為對應的數字，再與其他 9 碼串接。若身份證號是 A123456789，則轉換為 10123456789
		let i = s.indexOf(id.charAt(0));
		const tempuserid = ct[i] + id.substr(1, 9);

		// 然後再把每一個數字，依序乘上1、9、8、7、6、5、4、3、2、1、1，再相加
		let checksum = +tempuserid.charAt(0) * 1;
		for (i = 1; i <= 9; i++) {
			checksum = checksum + +tempuserid.charAt(i) * (10 - i);
		}
		checksum += +tempuserid.charAt(10) * 1;

		// 然後再除以10，如果整除，表示該身份證字號是有效的
		return ((checksum % 10) === 0);
	}
}

/**產生Uuid/GUID */
export function UuidCreator(): string {
	var d = Date.now();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
		d += performance.now(); //use high-precision timer if available
	}
	return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

/**儲存 MyData Login request 資料 */
export const storeMyDataLoginRequest = (myDataLoginRequest: MyDataLoginRequestModel): void => {
  const str_model = encryptObject(myDataLoginRequest);
  localStorage.setItem('myDataLoginRequest', str_model);
}

/** 取得 MyData Login request 儲存資料 */
export const getMyDataLoginRequest = (): MyDataLoginRequestModel => {
	const str_model = localStorage.getItem('myDataLoginRequest') || '';
	return decryptObject<MyDataLoginRequestModel>(str_model);
}

/**儲存 MyData Login 資料 */
export function StoreMyDataLoginData(myDataForm: MyDataLoginResponseModel): void {
	const str_model = encryptObject(myDataForm);
	localStorage.setItem('myDataForm', str_model);
}

/** 取得 MyData Login 儲存資料 */
export function GetMyDataLoginData(): MyDataLoginResponseModel {
	const str_model = localStorage.getItem('myDataForm');
	return decryptObject<MyDataLoginResponseModel>(str_model);
}

export function copyMessage(val: string){
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}

// 是否為Android系統
export const IsAndroid = (): boolean => navigator.userAgent.indexOf("Android") >= 0;

// 加密Object
export const encryptObject = (model:object):string => encryptString(JSON.stringify(model));

// 解密 and convert Object
export const decryptObject = <T>(code:string):T => JSON.parse(decryptToString(code)) as T;

// 加密String
export const encryptString = (str):string => btoa(str);

// 解密String
export const decryptToString = (code:string):string => atob(code);

// 加密 for queryString
export const objectToEncryptString = (model:object):string => encodeURIComponent(encryptString(JSON.stringify(model)));



// 解密 for queryString
export const encryptStringToObject = <T>(str:string):T => JSON.parse(decryptToString(decodeURIComponent(str))) as T;


// 計算年齡
export const getCustomerAge = (birth:string):number => {
  if(!birth || birth.length !== 8)return -1; // 錯誤

  let returnAge;
  let birthYear = parseInt(birth.slice(0,4));
  let birthMonth = parseInt(birth.slice(4,6));
  let birthDay = parseInt(birth.slice(6,8));

  let d = new Date();
  let nowYear = d.getFullYear();
  let nowMonth = d.getMonth() + 1;
  let nowDay = d.getDate();

  if(nowYear == birthYear){
    returnAge = 0;//同年 則為0歲
  }
  else{
    let ageDiff = nowYear - birthYear;
    if(ageDiff > 0){
      if(nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay;
        returnAge = dayDiff < 0 ? ageDiff - 1 : ageDiff;
      }
      else
      {
        var monthDiff = nowMonth - birthMonth;
        returnAge = monthDiff < 0 ? ageDiff - 1 : ageDiff;
      }
    }
    else
    {
      returnAge = -1; // 錯誤
    }
  }

  return returnAge;
};

