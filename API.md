# API

- [API](#api)
	- [帳務](#帳務)
		- [帳務資訊](#帳務資訊)
		- [近期帳單查詢](#近期帳單查詢)
		- [消費明細查詢 - 未結帳](#消費明細查詢---未結帳)
		- [消費明細查詢 - 已結帳](#消費明細查詢---已結帳)
		- [最新消費資料](#最新消費資料)
		- [Gift Card交易查詢(非會員)](#gift-card交易查詢非會員)
		- [信用卡消費分析(消費類別分析)](#信用卡消費分析消費類別分析)
		- [信用卡消費分析(每月消費金額分析)](#信用卡消費分析每月消費金額分析)
		- [取得本行可轉帳的帳號清單](#取得本行可轉帳的帳號清單)
	- [紅利點數](#紅利點數)
		- [紅利點數查詢](#紅利點數查詢)
		- [紅利兌換紀錄](#紅利兌換紀錄)
		- [紅利商品總覽](#紅利商品總覽)
		- [紅利商品](#紅利商品)
		- [紅利商品兌換](#紅利商品兌換)
	- [智慧理財](#智慧理財)
		- [預借現金](#預借現金)
			- [取得預借現金資訊](#取得預借現金資訊)
			- [申請預借現金](#申請預借現金)
			- [取得銀行清單](#取得銀行清單)
			- [取得分行清單](#取得分行清單)
			- [檢查信用卡有效期限](#檢查信用卡有效期限)
		- [單筆消費分期](#單筆消費分期)
			- [取得可申請分期之已請款交易](#取得可申請分期之已請款交易)
			- [驗證分期資料並取得各期利率資料](#驗證分期資料並取得各期利率資料)
			- [取得試算表](#取得試算表)
			- [申請分期](#申請分期)
		- [帳單分期](#帳單分期)
			- [取得帳單分期資料](#取得帳單分期資料)
			- [申請帳單分期](#申請帳單分期)
			- [帳單分期申請查詢](#帳單分期申請查詢)
		- [網路易通財](#網路易通財)
			- [取得易通財資料](#取得易通財資料)
			- [申請易通財](#申請易通財)
		- [易通財申請進度查詢](#易通財申請進度查詢)
		- [信用卡永久額度調整](#信用卡永久額度調整)
			- [取得永調資訊](#取得永調資訊)
			- [上傳財力證明](#上傳財力證明)
			- [申請永調](#申請永調)
			- [信用卡永久額度調整進度查詢](#信用卡永久額度調整進度查詢)
		- [信用卡臨時額度調整](#信用卡臨時額度調整)
			- [取得信用卡臨時額度調整資料](#取得信用卡臨時額度調整資料)
			- [申請信用卡臨時額度調整](#申請信用卡臨時額度調整)
			- [信用卡臨時額度調整進度查詢](#信用卡臨時額度調整進度查詢)
			- [檢查是否為假日](#檢查是否為假日)
		- [消費分期約定事項](#消費分期約定事項)
			- [取得分期約定事項的簽訂狀態](#取得分期約定事項的簽訂狀態)
			- [設定消費分期約定事項](#設定消費分期約定事項)
		- [信用卡核身(消費分期約定事項)](#信用卡核身消費分期約定事項)
		- [信用卡核身(額度調整)](#信用卡核身額度調整)
		- [信用卡核身(信用卡額度調整進度查詢)](#信用卡核身信用卡額度調整進度查詢)
		- [取得核身資料](#取得核身資料)
		- [清除核身資料](#清除核身資料)
	- [活動](#活動)
		- [年費資格查詢](#年費資格查詢)
		- [機場接送資格查詢](#機場接送資格查詢)
		- [登錄活動查詢](#登錄活動查詢)
		- [活動登錄](#活動登錄)
			- [檢查活動狀態](#檢查活動狀態)
			- [活動登錄](#活動登錄-1)
		- [VIP活動](#vip活動)
			- [VIP活動資格驗證](#vip活動資格驗證)
	- [短網址](#短網址)
		- [產生短網址](#產生短網址)
		- [從原始網址查詢短網址資訊](#從原始網址查詢短網址資訊)
		- [短網址重導至原始網址](#短網址重導至原始網址)
	- [服務申請](#服務申請)
		- [電子帳單異動](#電子帳單異動)
			- [取得行動/電子帳單通知設定資訊](#取得行動電子帳單通知設定資訊)
			- [更新行動/電子帳單通知設定](#更新行動電子帳單通知設定)
		- [電子信箱地址異動](#電子信箱地址異動)
			- [取得電子信箱地址](#取得電子信箱地址)
			- [變更電子信箱地址](#變更電子信箱地址)
		- [補寄電子帳單](#補寄電子帳單)
			- [取得補寄行動/電子帳單資訊](#取得補寄行動電子帳單資訊)
			- [申請補寄行動/電子帳單](#申請補寄行動電子帳單)
		- [補寄實體帳單](#補寄實體帳單)
			- [取得補寄實體帳單資訊](#取得補寄實體帳單資訊)
			- [補寄實體帳單](#補寄實體帳單-1)
		- [網路開卡](#網路開卡)
		- [申請進度查詢](#申請進度查詢)
		- [Display card 3D驗證密碼修改](#display-card-3d驗證密碼修改)
			- [取得 Display card 卡號清單](#取得-display-card-卡號清單)
			- [修改Display card 3D驗證密碼](#修改display-card-3d驗證密碼)
		- [預借現金密碼修改](#預借現金密碼修改)
		- [申請預借現金密碼](#申請預借現金密碼)
		- [取得卡友的有效卡片清單](#取得卡友的有效卡片清單)
		- [取得卡友的卡片清單](#取得卡友的卡片清單)
		- [第三人行銷變更](#第三人行銷變更)
			- [取得第三人行銷註記](#取得第三人行銷註記)
			- [更新第三人行銷註記](#更新第三人行銷註記)
		- [索取自動轉帳授權書](#索取自動轉帳授權書)
		- [信用卡掛失](#信用卡掛失)
			- [查詢可掛失的卡片清單](#查詢可掛失的卡片清單)
	- [電子帳單](#電子帳單)
		- [列印繳款單](#列印繳款單)
		- [產生帳單 PDF](#產生帳單-pdf)
	- [好房卡](#好房卡)
		- [判斷是否為房貸戶](#判斷是否為房貸戶)
		- [申請永調(好房卡)](#申請永調好房卡)
	- [OTP](#otp)
		- [產生動態密碼(區分功能)](#產生動態密碼區分功能)
		- [驗證動態密碼(區分功能)](#驗證動態密碼區分功能)
	- [線上辦卡](#線上辦卡)
		- [電話留言申辦](#電話留言申辦)
		- [專人聯絡](#專人聯絡)
		- [第一因驗證(核身)](#第一因驗證核身)
		- [取得所有申請卡片資訊](#取得所有申請卡片資訊)
		- [取得單一申請卡片資訊](#取得單一申請卡片資訊)
		- [取得客戶資料](#取得客戶資料)
		- [是否有外幣帳戶](#是否有外幣帳戶)
		- [取得銀行帳號清單](#取得銀行帳號清單)
		- [送出申請資料](#送出申請資料)
		- [上傳缺補文件](#上傳缺補文件)
			- [檢查身份證字號](#檢查身份證字號)
			- [上傳檔案](#上傳檔案)
			- [完成上傳檔案](#完成上傳檔案)
		- [以卡辦卡](#以卡辦卡)
			- [以卡辦卡驗證](#以卡辦卡驗證)
			- [以卡辦卡驗證(限制次數)](#以卡辦卡驗證限制次數)
		- [檢查是否可以申辦財富無限卡](#檢查是否可以申辦財富無限卡)	
		- [檢查是否重複申請卡片](#檢查是否重複申請卡片)
	- [註冊](#註冊)
		- [會員註冊檢查](#會員註冊檢查)
		- [信用卡會員註冊](#信用卡會員註冊)
		- [補寄認證碼(iweb)](#補寄認證碼iweb)
	- [客戶](#客戶)
		- [取得帳單地址及聯絡電話](#取得帳單地址及聯絡電話)
		- [查詢手機號碼](#查詢手機號碼)
		- [查詢 MMA 會員狀態](#查詢-mma-會員狀態)
	- [其他](#其他)
		- [取得台灣3碼郵遞區號資訊](#取得台灣3碼郵遞區號資訊)
	- [豐市集](#豐市集)
		- [豐市集登入取得點數資料](#豐市集登入取得點數資料)
	- [Q1活動(第一季熱刷活動)](#q1活動第一季熱刷活動)
		- [核身](#核身)
		- [贈品清單](#贈品清單)
		- [符合資格的消費資料](#符合資格的消費資料)
		- [兌換贈品](#兌換贈品)
		- [兌換紀錄](#兌換紀錄)
		- [是否開放兌換](#是否開放兌換)
	- [簽帳金融卡(Debit卡)](#簽帳金融卡debit卡)
		- [Debit卡近期交易明細](#debit卡近期交易明細)
		- [取得 Debit 卡近期交易明細 PDF](#取得-debit-卡近期交易明細-pdf)
		- [Debit卡授權交易明細](#debit卡授權交易明細)
		- [Debit卡消費分析(消費類別分析)](#debit卡消費分析消費類別分析)
		- [Debit卡消費分析(每月消費金額分析)](#debit卡消費分析每月消費金額分析)
		- [取得Debit卡交易明細單/通知設定資訊](#取得debit卡交易明細單通知設定資訊)
		- [Debit卡交易明細單/通知設定](#debit卡交易明細單通知設定)
		- [取得補寄Debit卡交易明細單資訊](#取得補寄debit卡交易明細單資訊)
		- [補寄Debit卡交易明細單](#補寄debit卡交易明細單)
	- [虛擬卡](#虛擬卡)
		- [檢查是否可以申辦虛擬卡](#檢查是否可以申辦虛擬卡)
		- [檢查是否為「虛擬卡」核卡人](#檢查是否為虛擬卡核卡人)
		- [取得虛擬卡卡片清單](#取得虛擬卡卡片清單)
		- [查詢虛擬卡的相關資訊](#查詢虛擬卡的相關資訊)
		- [取得虛擬卡的相關資訊](#取得虛擬卡的相關資訊)
		- [虛擬卡開卡](#虛擬卡開卡)
		- [虛擬卡額度調整](#虛擬卡額度調整)

## 帳務

### 帳務資訊

* API URL: api/Accounting/AccountingInfo
* Input: 同「近期帳單查詢」
* Output: 同「近期帳單查詢」

### 近期帳單查詢

* API URL: api/Accounting/RecentBill
* Old URL: /Account/Bill
* Methods:
    * MQ.WB39(查出使用者擁有的卡片, MemberCards)
    * `SP_WEBCUSTM` - 基本資料
    * `SP_WEBBLHSH_DCUR_MAX_STMTMM2`- 近期帳單資料 => 舊卡網用來抓第一個月的帳單匯總資料 
    * `SP_WEBBLHSH_DCUR2` - 雙幣卡 帳單匯總資料 by 帳單年月
    * `SP_WEBTRHSH_DCUR_STMTMM2` - 取得特定月份交易明細
* Input
    * ID: String(身份證字號)
    * BillDateYYYYMM: String(帳單月份) - 省略時，可以取得最近一期的帳單資料。
* Output:
    * BaseData: Object (帳單基本資料)
        * ID: String (身分證字號)
        * CustName: String (客戶姓名)
        * BillDate: String (帳單月份)
        * STMTDATE: String (結帳日)
        * DUEDATE: String (繳款截止日)
        * IsLineCR: Boolean
        * IntRate String (循環利率)
        * IntDate String (差別利率適用截止年月)
    * BillAmounts: Object[] (帳單金額)
        * CurrencyCode: String (幣別代碼)
        * CurrencyName: String (幣別名稱)
        * PREVBAL: String (上期應繳總金額)
        * PREVPAYAMT: String (-已繳款金額(*含保留款))
        * NEWADDAMT: String (+本期新增款項)
        * FINCHARGE: String (+循環利息)
        * LATECHARGE: String (+違約金)
        * CURRBAL: String (=本期應繳總金額)
        * DUEAMT: String (=本期最低應繳金額)
        * DDAMT: String (預定扣款金額)
        * DDBANK: String (扣款銀行)
        * DDAcountNo: String (扣款帳號)
        * ACT_LINE_CR: String
        * LastPaymentDate: String (最近一次繳款日期)
        * IntRate: Number (循環利率)
        * IntDate: String (差別利率適用截止年月)
        * LastPaymentAmt: String (最近一次繳款金額)
    * BillDeductMsgs: String[] (自扣訊息)
    * Reward: Object (紅利點數)
        * AddPoint: String (本期消費新增點數)
        * AdjustPoint: String (活動調整點數)
        * ExchangePoint: String (本期兌換點數)
        * TotalPoint: String (累計可用點數)
        * ExpiringPoint: String (本年度到期點數)
    * BillRecords: Object[] (消費記錄)
        * CurrencyCode: String (幣別代碼)
        * CurrencyName: String (幣別名稱)
        * TXDATE: String (交易日期)
        * DEDATE: String (入帳日期)
        * CardNo {String  g: 後四碼))
        * MEMO: String (消費說明)
        * AMT: String (台幣金額)
        * TXAMT: String (外幣金額)
        * TXCUR: String (交易幣別)
        * CURDATE: String (外幣折算日)
        * INST_RATE: String (總費用年百分率)
        * INST_AMT: String (分期未到期金額)
        * COUNTRY: String (消費地)
        * TXCode: String (TXCode)
    * CashAdvanceInfo: Object (預借現金額度)
        * CreditCardLimit: String (您的信用額度)
        * CreditAvailable: String (可用信用額度)
        * CashLimit: String (預借現金額度)
        * CashAvailable: String (可用預借現金額度(MMA網站預借現金額度))
        * AuthAmount: String (已刷卡未請款金額)

* API 邏輯：
    * 呼叫 WB39: 檢查客戶是否擁有主卡，若沒有主卡則無法查詢近期帳單。
    * 呼叫 WB08: 取得紅利積點餘額
    * 若傳入 BillDateYYYYMM，則呼叫 `SP_WEBBLHSH_DCUR2` 來取得指定月份的帳單匯總資料以及點數資料；  
        否則呼叫 `SP_WEBBLHSH_DCUR_MAX_STMTMM2` 取得最近一期的帳單匯總資料以及點數資料
    * 呼叫 `SP_WEBTRHSH_DCUR_STMTMM2` 取得特定月份的帳單明細

### 消費明細查詢 - 未結帳

* API URL: /api/Accounting/OutstandingDetail
* Old URL: /Account/OutstandingBalance
* Methods: `SP_WEBTCTDH_DCUR3`(未結帳, 扣除已繳款金額), `SP_WEBTCTDH_DCUR2`(未結帳, 全部顯示)
* Input:
    * ID: String (身份證字號)
    * DateYYYYMMDD: String (帳單日期)
    * IsExcludePaidUp: Boolean (是否扣除已繳款金額)
* Output:
    * Detail: Object[] (明細)
        * CurrencyCode: String (幣別代碼)
        * CurrencyName: String (幣別名稱)
        * PID: String (身份證字號)
        * CARD_TYPE: String ()
        * CardLast4: String (卡號末四碼)
        * TXDATE: String (交易日期)
        * DEDATE: String (入帳日期)
        * TXCODE: String ()
        * MEMO: String (消費說明)
        * TXCUR: String (交易幣別)
        * TXAMT: String (消費金額：若交易幣別為臺幣，則不顯示小數，否則顯示兩位小數)
        * AMT: String (交易金額：若為臺幣，則不顯示小數，否則顯示兩位小數。)
    * SubTotal: Object[] (幣別小計)
        * CurrencyCode: String (幣別代碼)
        * CurrencyName: String (幣別名稱)
        * Count: Number (筆數)
        * SubTotalAmt: String (累計金額 = AMT 欄位值加總。若為臺幣(ORG == "000")，則不顯示小數，否則顯示兩位小數)

幣別代碼(ORG)對應：

* "840": "美元"
* "392": "日圓"
* "978": "歐元"
* "000": "臺幣"

### 消費明細查詢 - 已結帳

* API URL: /api/Accounting/StatementDetail
* Old URL: /Account/Statement
* Methods: `SP_WEBTRHSH_DCUR3`(已出帳)
* Input:
    * ID: String (身份證字號)
    * StartDateYYYYMMDD: String (已結帳消費繳款起日)
    * EndDateYYYYMMDD: String (已結帳消費繳款訖日)
* Output:
    * Detail: Object[] (明細)
        * CurrencyCode: String (幣別代碼)
        * CurrencyName: String (幣別名稱)
        * STMTMM: String ( )
        * PID: String ( )
        * CARD_TYPE: String ( )
        * CardLast4: String (卡號末四碼)
        * TXDATE: String (交易日期)
        * DEDATE: String (入帳日期)
        * TXCODE: String ( )
        * MEMO: String (消費說明)
        * TXCUR: String (交易幣別)
        * TXAMT: String (外幣交易金額)
        * AMT: String (台幣交易金額)
    * SubTotal: Object[] (幣別小計)
        * CurrencyCode: String (幣別代碼)
        * CurrencyName: String (幣別名稱)
        * Count: Number (筆數)
        * SubTotalAmt: String (累計金額(SubTotalAmt) = AMT 欄位值加總。若為臺幣(ORG == "000")，則不顯示小數，否則顯示兩位小數)

### 最新消費資料

* API URL: api/Accounting/LatestTx
* Input:
    * ID: String (身份證字號)
* Output:
    * Items: Object[] (最新消費資料)
        * CardFlag: String (正附卡註記 : 1 正卡;2 附卡)
        * CardNo: String (卡號末四碼)
        * IsMobileCard: Boolean (是否為手機信用卡)
        * AuthDate: Date (授權日期)
        * AuthTime: String (授權時間)
        * Memo: String (消費類別/商店名稱)
        * AuthAmt: Number (授權金額(台幣))
        * AuthAmtDesc: String (授權金額描述)
        * CountryCode: String (消費國別)
        * AuthResult: String (授權結果)

### Gift Card交易查詢(非會員)

* API URL: /api/Accounting/GiftCardHistory
* Old URL: /GiftCard/History
* Input:
    * ID: String (身份證字號)
    * CardNo: String (信用卡卡號)
    * CVV2: String (卡片驗證碼)
    * ValidDateMMYY: String (卡片有效日期)
    * TYPE: String (查詢選擇。0:即時儲值金餘額; 1:近六個月查詢其中一個月; 2:查詢日期區間)
    * QueryMonthYYYYMM: String (查詢月份，近六個月查詢其中一個月)
    * StartDate: Date (查詢起日)
    * EndDate: Date (查詢迄日)
* Output:
    * Balance: String (儲值金餘額)
    * Items: Object[] (交易明細)
        * TXDATE: String (交易日期)
        * TXSOURCE: String (交易內容)
        * TXAMT: String (儲值金額)
        * TDAMT: String (消費金額)
        * MEMO: String (備註)

### 信用卡消費分析(消費類別分析)

* API URL: /api/Accounting/BillAnalyticsByCategory
* Old URL: /Account/Analytics
* Methods: 呼叫 APDB `sp_eWeb_GetCus_SalInfo`
* Input:
    * ID: String (身份證字號)
    * StartDate: Date (查詢起日)
    * EndDate: Date (查詢迄日)
* Output:
    * Items: Object[]
        * CategoryName: String (消費類別名稱)
        * Subtotal: Number (類別金額小計)

### 信用卡消費分析(每月消費金額分析)

* API URL: /api/Accounting/BillAnalyticsByMonth
* SP: `SP_WEB_ONEYEAR_ANY`
* Input:
    * ID: String (身份證字號)
* Output:
    * Items: Object[]
        * Month: String (月份，格式：YYYYMM)
        * Amount: Number (每月消費金額)

### 取得本行可轉帳的帳號清單

從 T24 Web API 取得本行帳號清單

* API URL: /api/Accounting/TransferAccounts
* Input:
    * ID: String (身份證字號)
* Output:
    * Items: Object[]
        * AccountNo: String (帳號)

## 紅利點數

### 紅利點數查詢

* API URL: /api/Bonus/Point
* Old URL: /Bonus
* Methods: WB08
* Input:
    * ID: String (身份證字號)
* Output:
	* Point: Number (目前可用點數 = 今年點數 + 去年點數 + 前年點數)
	* ExpiringPoint: Number (到期點數 = 前年點數)
	* ExpireOn: Date (到期時間 = 今年12月31日)
	* ThisYearPoint: Number (今年點數)
	* LastYearPoint: Number (去年點數)
	* YearBeforeLastPoint: Number (前年點數)

* 點數維持三年，所以前年點數會在今年12月到期

### 紅利兌換紀錄

* API URL: /api/Bonus/ExchangeRecord
* Old URL: /Bonus/ExchangeRecord
* SP: SP_WEBBDTLH
* Input:
    * ID: String (身分證字號)
    * QYear: String (查詢年度，西元年度4碼)
* Output:
    * Items: Object[]
        * DE_DATE: String (兌換日期)
        * ADD_POINT: String (新增點數)
        * TRA_POINT_TTL: String (兌換數量)
        * MEMO: String (兌換項目)

### 紅利商品總覽

* API URL: /api/Bonus/Gifts
* Old Web URL: /QuickBonus/Index/1
* Input: (None)
* Output:
    * MainCategories: Object[] (主類別清單)
        * ID: Number (主類別代碼)
        * Name: String (主類別名稱)
    	* Gifts: Object[] (紅利商品清單)
        * ID: Number (商品代碼)
        * Name: String (商品名稱)
        * SmallImagePath: String (商品圖檔 URL)
        * Point: Number (點數)
        * SelfPayment: Number (自付金額)
        * EndTime: Date (兌換期限)
        * Description: String (產品描述)
        * MainCategoryName: String (主類別名稱)
        * GiftNo: String (商品編號)
        * ProjectNo: String (專案代碼)
        * MainCategoryId: Number (主類別代碼)
        * SubCategoryName: String (子類別名稱)

### 紅利商品

* API URL: /api/Bonus/Gift
* Old Web URL: /QuickBonus/ExchangeGoodDetail/{id}?CompanyCode=1
* Input:
    * GiftId: Number (商品代碼)
* Output
    * ID: Number (商品代碼)
    * Name: String (商品名稱)
    * SmallImagePath: String (商品圖檔 URL)
    * Point: Number (點數)
    * SelfPayment: Number (自付金額)
    * EndTime: Date (兌換期限)
    * Description: String (產品描述)
    * MainCategoryName: String (主類別名稱)
    * GiftNo: String (商品編號)
    * ProjectNo: String (專案代碼)
    * MainCategoryId: Number (主類別代碼)
    * SubCategoryName: String (子類別名稱)

### 紅利商品兌換

* API URL: /api/Bonus/GiftExchange
* Old Web URL: /QuickBonus/GiftExchangeConfirm?CompanyCode=1
* Methods:
    * ExpressRedemption
        * `SP_CUST_Birthday`(身份檢核)）
        * WB21
        * WB19 - 取得帳單地址與連絡電話
        * WB27 - 紅利線上兌換
        * `SP_eWEB_EXCHANGE_BONUS`
        * `SP_eWEB_EXCHANGE_BONUS_ENDDATE`
* Input:
    * ID: String (身分證字號)
    * Birthday: String (生日YYYYMMDD)
    * Address: String (寄送地址)
    * Items: Object[] (兌換商品清單)
        * ProjCode: String (專案代碼)
        * ProdCode: String (商品編號，請帶入 `GiftNo`)
        * Quantity: Number (數量)
        * EndTime: Date (兌換期限)
        * Description: String (產品描述)
        * TotalPoints: Number (總點數)
* Output
    * Success: Boolean (執行是否成功，發生 Exception 時才會回傳 `false`)
    * Items: Object[] (兌換結果)
        * Item: Object (兌換商品)
            ProjCode: String (專案代碼)
            ProdCode String (商品編號)
            Quantity: Number (數量)
            EndTime: Date (兌換期限)
            Description: string (產品描述)
            TotalPoints: number (總點數)
        * IsExchangeSuccess: Boolean (兌換是否成功)
        * IsExchangeable: Boolean (是否可兌換)
        * ErrorMessage: String (錯誤訊息)

## 智慧理財

### 預借現金

* Old URL: /Finance/CashAdvanceApply

#### 取得預借現金資訊

* API URL: /api/Finance/GetCashAdvanceApplyInfo
* Methods: `SP_eWeb_Cash_getBankList2`(取得銀行清單), WB14( 取得「預現可用額度」)
* Input:
    * ID: String (身份證字號)
* Output:
    * CardList: Object[] (卡片清單)
        * CardNo: String (卡號)
        * Name: String (卡片名稱)
        * CardTypeCode: String (主附卡代碼)
        * CardTypeDesc: String (主卡或附卡)
        * CardFace: String (CardFace)
        * ProductCode: String (卡別)
        * ExpDate: String (有效期限 - 欄位格式【MMYY】)
    * CashAvailable: Number (預現可用額度)
    * CashLimit: Number (預現信用額度)
    * AuthAmount: Number (已授權未請款)
    * CreditAvailable: Number (卡片可用餘額)
    * CreditCardLimit: Number (卡片信用額度)
	* IsChangeMobileNo: Boolean (最近是否變更手機號碼)

#### 申請預借現金

* API URL: /api/Finance/ApplyCashAdvance
* Methods: AdvWB24
* Input:
    * ID: String (身分證字號)
    * PIN: String (預借現金密碼)
    * CardNo: String (卡號)
    * ExpiryDate: String (有效期限，格式 MMYY)
    * Amount: Number (預現金額)
    * TransBankCode: String (轉入行庫代號, 7 碼: 銀行代碼(3碼) + 分行代碼 (4碼))
    * TransAccount: String (轉入帳號)
	* PinType: Number (預借現金密碼類型。1:預借現金密碼; 2:OTP)
* Output
    * Success: Boolean (是否申請成功)
    * RefNo: String (交易編號，例如：`YTRDX316556985`)
    * ResultCode: String (本行預現：第一段電文(WB22)的結果碼)
    * ResultMessage: String (本行預現：第一段電文(WB22)的結果訊息)
    * ResultCode2: String (本行預現：第二段電文(TRANSAD)的結果碼)
    * ResultMessage2: String (本行預現：第二段電文(TRANSAD)的結果訊息)

#### 取得銀行清單

* API URL: /api/Finance/GetBankList
* SP: `SP_eWeb_Cash_getBankList3`
* Input: (None)
* Output
    * Items: Object[] (分行清單)
        * Type: String (機構別)
        * BankCode: String (銀行代碼)
        * BankName: String (銀行名稱)
        * BankLong: String

機構別對應的名稱：

* 1: 本國銀行
* 2: 外國銀行
* 3: 信用合作社
* 4: 農會
* 5: 郵局
* 6: 漁會
* 9: 其他金融機構

#### 取得分行清單

* API URL: /api/Finance/GetBranchList
* SP: `SP_eWeb_Cash_getBranchList2`
* Input:
    * BankCode: String (銀行代碼)
* Output
    * Items: Object[] (分行清單)
        * BranchCode: String (分行代碼)
        * FullName: String (分行名稱)

#### 檢查信用卡有效期限

* API URL: /api/Finance/VerifyExpiryDate
* Input:
    * ID: String (身份證字號)
    * CardNo: String (卡號)
    * ExpiryDate: String (有效期限，欄位格式【MMYY】)
* Output: (None)
* ResultCode:
    * 00: 卡片有效日相符
    * 01: 卡片有效日不符

### 單筆消費分期

* Old URL: /Finance/Installment?TransactionType=0

#### 取得可申請分期之已請款交易

* API URL: /api/Finance/GetInstallmentData
* Methods: WB14, AdvGoShoppingData
* Input
    * ID: String (身份證字號)
    * TransactionType: Number (全部 = 0, 旅遊 = 2, 單筆 = 1。請固定帶入 0)
* Output:
    * IsSignedInstallmentAgreement: Boolean (是否有設定分期總約)
    * CanApplyInstallment: Boolean (是否可做分期)
    * Items: Object[] (可申請分期之已請款交易清單)
        * TransactionDate: String (交易日期)
        * IsTCTD: Boolean (是否入帳)
        * DeDate: String (入帳日期)
        * Amount: String (交易金額)
        * Memo: String (交易明細)
        * IsAlreadyInstallment: Boolean (是否已申請分期)
        * AuthCode: String (授權碼)
        * CardNumber: String (卡號)
        * MCC: String
        * MerchNumber: String (特店代碼)
        * FirstFlag: String (是否首次分期)
        * InstallmentStatus: String (分期狀態)
		* SalRef: String (簽單微縮影片編碼)

#### 驗證分期資料並取得各期利率資料

* API URL: /api/Finance/InstallmentApplyCheck
* Methods: AdvGoShoppingCheck2
* 說明：判是否可分期，並回傳利率表及交易明細
* Input:
    * ID: String (身份證字號)
    * CardNumber: String (卡號)
    * AuthCode: String (授權碼)
    * TxDate: Date (交易日期)
    * DeDate: Date (入帳日期)
    * MerchantNo: String (特店代碼)
    * MCC: String
    * Amount: Number (交易金額)
    * Memo: String (交易明細)
    * FirstFlag: String (是否首次分期)
    * IsTCTD: String  (是否入帳)
* Output:
    * Items: Object[]
        * ProgramCode: String (分期大類碼)
        * ProductCode: String (分期產品代碼)
        * Period: Number (分期期數)
        * Rate: Number (利率)
        * Program: String (專案，同分期大類碼)
        * FirstAmt: String (開辦費，顯示於畫面的「手續費」欄位)
        * Desc: String (說明)

#### 取得試算表

* API URL: /api/Finance/EasyCashCalcCycleFee
* Methods: `EZCASH_CALC_CYCLE_FEE`
* Input
    * LoanAmt: Number (申貸本金)
    * Period: Number (期數)
    * AnnRate: Number (年利率)
    * ProcessFee: Number (手續費)
* Output:
    * Items: Object[]
        * SEQ: String (期數)
        * MonthPayment: String (每月應付本息金額)
        * Interest: String (利息)
        * PrincipalAmount: String (本金)
        * IRR: String (總費用年百分率)

#### 申請分期

* API URL: /api/Finance/InstallmentApply
* Methods: AdvGoShoppingSubmit2
* Input
    * ID: String (身份證字號)
    * IsTCTD: Boolean (是否入帳)
    * Amount: Number (交易金額)
    * CardNumber: String (卡號)
    * AuthCode: String (授權碼)
    * DeDate: Date (入帳日期)
    * Memo: String (交易明細)
    * TransactionDate: Date (交易日期)
    * Period: String (選擇的分期期數)
    * ProductCode: String (選擇期數的分期產品代碼)
    * Program: String (選擇期數的專案代碼)
    * Rate: String (選擇期數的利率)
    * FirstAmt: String (選擇期數的手續費)
	* SalRef: String (簽單微縮影片編碼)
	* Referrer: String (推薦人員編)
* Output
    * Success: Boolean (是否成功)
    * RefNo: String (交易編號，例如：`YTRDX316556985`)

### 帳單分期

Old Web URL: /Finance/StatementInstallment

#### 取得帳單分期資料

* API URL: /api/Finance/GetStmtInstallmentData
* Methods: StatementInstallmentApplyCheck, GetInstallmentAgreementStatus, StatementInstallmentRequestQuality
* Input:
    * ID: String (身份證字號)
* Output:
    * IsSignedInstallmentAgreement: Boolean (是否有設定分期總約)
    * PID: String (身分證字號)
    * MFPCode: String (符合名單)
    * BaseMFPcode: String (符合BASE)
    * StmtDate: Date (帳單日)
    * DueDate: Date (繳款截止日)
    * StmtAmt: Number (當期應繳總金額)
    * StmtMinAmt: Number (當期最低應繳)
    * InstallmentAmt: Number (可分期金額)
    * Rates
        * Period: Number (期數)
        * Rate: Number (利率)
        * Fee: Number (手續費)
        * BaseFlag: String (BASE註記)

#### 申請帳單分期

* API URL: /api/Finance/ApplyStmtInstallment
* Methods: StatementInstallmentApplyCheck, StatementInstallmentApply
* Input:
    * PID: String (身份證字號)
    * MFPCode: String (符合名單)
    * BaseMFPcode: String (符合BASE)
    * StmtDate: Date (帳單日)
    * DueDate: Date (繳款截止日)
    * StmtAmt: Number (當期應繳總金額)
    * StmtMinAmt: Number (當期最低應繳)
    * FirstPeriodAmt: Number (首期應繳金額)
    * InstallmentAmt: Number (可分期金額)
    * Period: Number (期數)
    * Rate: Number (利率)
    * IRR: Number (總費用年百分率)
    * Fee: Number (手續費)
	* Referrer: String (推薦人員編)
* Output:
    * Success: Boolean (是否申請成功)
    * RefNo: String (交易編號，例如：`YTRDX316556985`)
* ResultCode
    * 00 - 申請成功
    * 01 - 不符合帳單分期申請資格

#### 帳單分期申請查詢

* API URL: /api/Finance/StmtInstallmentApplyRecord
* Old Web URL: /Finance/StatementInstallmentApplyRecord
* Methods: `SP_eWEB_ST_ApplyQuery`
* Input
    * ID: String (身份證字號)
    * BeginDate: String (查詢起日)
    * EndDate: String (查詢迄日)
* Output
    * Items: Object[]
        * PID: String (主卡人ID)
        * ApplyDate: Date (申請日期)
        * Channel: String (申請方式)
        * StmtAmt: Number (帳單總應繳金額)
        * StmtMinAmt: Number (帳單最低應繳金額)
        * InstallmentAmt: Number (可分期金額)
        * Rate: Number (分期利率)
        * Fee: Number (手續費)
        * FirstPeriodAmt: Number (首期月付金)
        * Period: Number (分期期數)
        * Status: String (訂單狀態。【0, 1, 2】：處理中,【5】：已完成,【6】：申請失敗)

### 網路易通財

* Old URL: /Finance/EasyChoiceApply

#### 取得易通財資料

* API URL: /api/Finance/GetEasyChoiceData
* Methods: `SP_EWEB_EZCASH_REQUEST_QUALITY`
* Input:
    ID: String (身份證字號)
* Output:
    * RTNCODE: String
    * ID: String
    * PCode: String
    * SCode: String
    * CrMaxLimit: String (借款金額上限)
    * Email: String
    * Items: Object[] (各期手續費及年利率表)
        * RateCycle: String (期別)
        * Fee: String (手續費)
        * FeeRate: String (年利率)

#### 申請易通財

* API URL: /api/Finance/EasyChoiceApply
* Methods: `SP_EWEB_EZCASH_REQUEST_INSERT`
* Input
    * CustID: String (身份證字號)
    * Period: String (期別)
    * Amount: String (申貸本金)
    * BankCode: String (銀行代碼)
    * BankAccount: String (銀行帳號)
    * PCode: String 
    * CustEMail: String (EMail)
    * Referrer: String (推薦人員編)
* Output:
    * Success: Boolean
    * RefNo: String (交易編號，例如：`YTRDX316556985`)

### 易通財申請進度查詢

* API URL: /api/Finance/EasyChoiceApplyRecord
* Old Web URL: /Finance/EasyChoiceApplyRecord
* Methods: `SP_EWEB_EZCASH_PROCESS_QUALITY`
    * Input:
        * ID: String (身份證字號)
        * StartDate: Date (查詢起日)
        * EndDate: Date (查詢迄日)
    * Output:
        * Items:
            * ApplyChannel: String (申請來源)
            * ApplyDate: String (申請日期)
            * StatusDesc: String (處理進度)
            * ApproveAmount: String (核可金額)
            * ApproveDate: String (核可日期)

### 信用卡永久額度調整

* Old URL: /Finance/CreditAlwaysLogin

#### 取得永調資訊

* API URL: /api/Finance/GetPermanentCreditInfo
* Methods: WB14, WB39, `SP_LineAdj_Query`
* Input:
    * ID: String (身分證字號)
* Output:
    * Name: String (客戶姓名)
    * OriginalCredit: Number (原始信用額度)
    * PermanentAvailableCredit: Number (永久可用額度)

#### 上傳財力證明

* API URL: /api/Finance/UploadPermanentCreditAttachment
* Methods: UploadLineAdjAttachment
* Input: (content-type: multipart/form-data)
    * ApplicationName: String (呼叫端系統代號)
    * ID : String (身分證字號)
    * File: File (財力證明檔案)
* Output
    * Success: Boolean (上傳是否成功)
    * ReferenceNo: String (上傳檔案的參考序號)

#### 申請永調

* API URL: /api/Finance/PermanentAdjustApply
* Methods: `SP_LineAdj_ADD`
* Input
    * ID: String (身份證字號)
    * OriginalCredit: String (原始信用額度，以千元為單位)
    * AdjustLimit: String (提高後的額度，以千元為單位)
    * ReasonCode: String (原因碼，值為 "01" ~ "06")
    * ReasonDesc: String (其他原因說明)
    * Company: String (目前服務機構名稱)
    * IsFinancialCustomer: String (是否為永豐銀行理財客戶，值為 "true" 或 "false")
    * AttachmentRefs: String[] (附件參考序號)
* Output
    * Success: Boolean
    * RefNo: String (交易編號，例如：`YTRDX316556985`)

#### 信用卡永久額度調整進度查詢

* API URL: /api/Finance/PermanentAdjustApplyRecord
* SP: `SP_LineAdj_Log_Query`
* Input:
    * ID: String (身份證字號)
* Output:
    * Items: Object[]
        * ApplyDate: String (申請日期)
        * Status: String (申請狀態)

### 信用卡臨時額度調整

* Old URL: /Finance/CreditTemporaryLogin

#### 取得信用卡臨時額度調整資料

* API URL: /api/Finance/GetTemporaryCreditInfo
* Methods: WB39, `SP_EWEB_CARD_CDESC1`, WB43, WB19, SP_IsHoliday
* Input
    * ID: String (身份證字號)
* Output
    * ContactMobile: String (行動電話)
    * OriginalCredit: String (原始信用額度)
    * AvailableCredit: String (目前可用餘額)
    * BeginDate: String (最早的申請起日，非國定假日)
    * EndDate: String (申請迄日，最晚的且非國定假日)
    * ApplyCards: Object[] (取得使用者所有卡片資料)
        * Name: String (卡片名稱，要標示主附卡。)
        * CardNo: String (卡號)

#### 申請信用卡臨時額度調整

* API URL: /api/Finance/ApplyTemporaryCredit
* Methods: PccrCheck, PccrAdjust
* Input
    * ID: String (身份證字號)
    * CardNoList: String[] (選取的卡號清單)
    * RegionCode: String (臨調區域，固定帶 "B")
    * ReasonCode: String (申請原因代碼，值為 "01" ~ "06")
    * ReasonDesc: String (其他原因)
    * AdjutLimit: String (調整後的額度 = 原始信用額度 + 申請增加額度)
    * EffDate: Date (開始日期)
    * ExpDate: Date (結束日期)
    * Tel: String (聯絡電話)
* Output
    * Success: Boolean (臨調申請是否成功，用來判斷顯示何種結果訊息)
    * RefNo: String (交易編號，例如：`YTRDX316556985`)

註：請用 ResultCode 是否為 "00" 來判斷執行是否成功，若不為 "00" 則要顯示錯誤訊息，而且不能跳到結果頁。

ResultCode:

* 00 - 執行成功
* S0 - 系統整理中，請稍後再試。(輸入參數錯誤或 Excption)

#### 信用卡臨時額度調整進度查詢

* API URL: /api/Finance/TemporaryCreditApplyRecord
* Methods: PccrQuery
* Table: PccrRequestData
* Input:
    * ID: String (身份證字號)
* Output:
    * Items
        * ApplyDate: String (申請日期)
        * TCLimit: String (申請提高之信用額度)
        * ExpDate: String (申請迄日)
        * Status: String (申請狀態)

#### 檢查是否為假日

* API URL: /api/Data/CheckIsHoliday
* Input:
    * QueryDate: Date (查詢日期)
* Output:
    * IsHoliday: Boolean (是否為假日)

### 消費分期約定事項

舊卡網 URL:

* 入口頁 - /QuickService/StagingTotal
    * 提供會員及非會員選擇不同的按鈕
* 登入驗證頁 - /QuickService/StagingTotalAbout
    * 若非會員，則顯示驗證欄位；若已登入，則會先取得消費分期約定事項的簽定狀態，然後再重導到「/QuickService/StagingTotalAboutResult」
* 設定消費分期約定事項 - /QuickService/StagingTotalAboutResult

#### 取得分期約定事項的簽訂狀態

* API URL: /api/Finance/GetInstallmentAgreementStatus
* Input:
    * ID: String (身份證字號)
* Output:
    * ApplyDate: Date (分期約定事項的簽訂日期)
    * IsSigned: Boolean (是否已簽訂分期約定事項)

#### 設定消費分期約定事項

* API URL: /api/Finance/SetInstallmentAgreement
* Methods: `SetInstallmentAgreementStatus`
* Input:
    * ID: String (身份證字號)
* Output:
    * Success: Boolean (是否成功)

### 信用卡核身(消費分期約定事項)

* API URL: /api/Member/AuthByCardNo
* Old Method: InstallmentAgreementLogin (`SP_CUST_Birthday`, WB00)
* Input:
    * CardNo: String (信用卡卡號)
    * ID: String(身份證字號)
    * Birthday: String(出生年月日，格式為 YYYYMMDD)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * ID: String (身份證字號，核身成功才會回傳)
    * Success: Boolean (是否成功)

### 信用卡核身(額度調整)

* API URL: /api/Member/AuthByLast8CardNo
* Old Method: WB39, AdvMemberRegisterCheck
* Input:
    * ID: String (身份證字號)
    * Birthday: String (出生年月日，格式為 YYYYMMDD)
    * Last8CardNo: String (卡號後8碼)
    * ValidDate: String (信用卡有效期限，格式為 MMYY)
    * CVV2: String (卡片驗證碼)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * ID: String (身份證字號，核身成功才會回傳)
    * Success: Boolean (是否成功)

### 信用卡核身(信用卡額度調整進度查詢)

* API URL: /api/Member/AuthByBirthday
* Old Method: `SP_CUST_Birthday`
* Input:
    * ID: String(身份證字號)
    * Birthday: String(出生年月日，格式為 YYYYMMDD - 舊卡網格式為MMDD)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * ID: String (身份證字號，核身成功才會回傳)
    * Success: Boolean (是否成功)

### 取得核身資料

* DMZ Web API
* API URL: /api/Security/Auth
* Input: (None)
* Output: 
    * Auth1 : String (api/Member/AuthByBirthday)
    * Auth2 : String (api/Member/AuthByCardNo)
    * Auth3 : String (api/Member/AuthByLast8CardNo)
    * OTP : String (api/Member/VerifyOTP)
    * AuthMMA : String (api/ApplyCard/FirstFactorAuth, MMA 驗證)
    * AuthCard : String (api/ApplyCard/FirstFactorAuth, 卡友驗證)
    * AuthAccount : String (api/ApplyCard/FirstFactorAuth, 存戶驗證)

### 清除核身資料

* DMZ Web API
* API URL: /api/Security/ClearAuth
* Input: (None)
* Output: (None)

## 活動

### 年費資格查詢

* API URL: /api/Activity/QueryAnnualFee
* Old URL: /Information/Annualfee
* Method: WB39, SP_AnnualFee
* Input:
    * ID: String (身分證字號)
* Output:
    * Items: Object[]
        * `BEGIN_YM`: String (起算月份)
        * `END_YM`: String (到期月份)
        * `CARD_TYPE`: String (卡別)
        * `TAMT`: String (累積年消費金額)
        * `TTIMES`: String (累積年消費次數)
        * `CARD_FEE_DT: String` (收取年費年月)
        * `FREE_MARK`: String (免年費資格)
        * `FIRST_FLAG`: String
        * `FIRST_TWO_FLAG`: String
        * `CARD_DESC`: String
        * `EMB`: String
        * `DE_DATE`: String
        * `TOTA_AMT`: String
        * `TOTAL_TIMES`: String
        * `ANNUAL_FEE`: String
        * `CARD`: String (卡號)
        * `DE_DATE2`: String

### 機場接送資格查詢

* API URL: /api/Activity/QueryAirportPickup
* Old URL: /Information/AirportShuttle
* Methods: GetPickupInfo
* Input:
    * ID: String (身分證字號)
* Output:
    * LASTUSED_NUM: Number (剩餘可用次數)
    * SYS_INS: String (符合資格FLAG)
    * MEMO: String (備註)
    * YEARLY_SPENDING: String (年消費)

### 登錄活動查詢

* API URL: /api/Activity/QueryIVRActivity
* Old URL: /QuickService/PopularActivities => call /Activity/QuerySignData
* Methods: IVRActivity_Query
* Input:
    * ID: String (身分證字號)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * Items: Object[]
        * Name: String (活動名稱)
        * ProjectId: String (名單代碼)
        * AddSource: String (登錄來源)
        * AddDateTime: Date (登錄時間)
        * SNO: Number (登錄序號)

### 活動登錄

#### 檢查活動狀態

* API URL: /api/Activity/CheckStatus
* 舊卡網 URL: /Activity/ActivityDetail
* Old Method: `IVRActivity_Check`, `IVRActivity_GetCount`
* Input:
    * Code: String (活動代碼)
* Output:
    * Code: String (活動代碼)
    * Name: String (活動名稱)
    * IsActive: Boolean (是否為啟用中的活動，若為 false 表示活動已結束、查無活動、活動關閉)
    * Count: Number (已登錄人數)
    * CanSign: Boolean (是否可登錄，true 表示可登錄；false 表示 登錄已達上限)
    * IsVipActivity: Boolean (是否為VIP活動)
    * IsInstallmentActivity: Boolean (是否為分期活動)
* ResultCode
    * 00:檢查成功
    * 01:目前非登錄期間

#### 活動登錄

* API URL: /api/Activity/SignActivity
* 舊卡網 URL: /Activity/SignActivity
* Input:
    * Code: String (活動代碼)
    * ID: String (身份證字號)
* Output:
    * Seq: String (登錄序號)
* ResultCode:
    * 00: 登錄成功
    * 01: 已經登錄過
    * 02: 活動已額滿
    * 03: 活動已結束
    * 04: 其他錯誤
    * 05: 很抱歉，您不符合本活動資格
    * 06: 您未簽訂消費分期約定事項，請您立即詳閱「消費分期約定事項」，才能登錄此活動。
    * 07: 您還不是卡友
    * 08: 查無此筆活動
    * 09: 尚未開放登錄
    * 10: 登錄時間已結束

### VIP活動

#### VIP活動資格驗證

* API URL: /api/Activity/VipValidation
* Old Web URL: /Activity/HiddenACTDetail
* Methods: `SP_HIDDEN_ACT_LIST`
* Input:
    * ID: String (身份證字號)
    * Code: String (活動代碼)
* Output:
    * Success: Boolean (資格驗證是否成功)
    * Code: String (活動代碼)

## 短網址

### 產生短網址

* HTTP Method: POST
* API URL: /api/UrlShorter/Generate
* Input
    * Url: String (原始網址)
    * BeginDate: String (有效日起日，格式 YYYYMMDD)
    * EndDate: String (有效日迄日，格式 YYYYMMDD)
    * EmpNo: String (申請人員編，六碼數字)
* Output
    * ShortUrl: String (短網址)
* ResultCode: String (結果碼)
    * 00: API 呼叫成功

### 從原始網址查詢短網址資訊

* 說明：從原始網址查詢已產生短網址的資訊
* HTTP Method: POST
* API URL: /api/UrlShorter/QueryByUrl
* Input
    * Url: String (原始網址)
* Output
    * Success: Boolean (若為 true 表示短網址已存在，若為 false 表示短網址不存在或已過期)
    * ShortUrl: String (短網址)
    * BeginDate: String (有效日起日，格式 YYYYMMDD)
    * EndDate: String (有效日迄日，格式 YYYYMMDD)
    * EmpNo: String (申請人員編，六碼數字)
* ResultCode: String (結果碼)
    * 00: API 呼叫成功

### 短網址重導至原始網址

* API URL: /UrlShorter/{id}
* HTTP Method: GET
* Url segment
    * id (短網址代碼，長度為5碼)

運作方式如下：

1. 使用者點選短網址，例如：https://mma.tw/00009
2. mma.tw 重導到我們的 AP URL(測試環境): http://sinopac.eweb.backend/UrlShorter/00009
3. 我們會重導回註冊的原始網址，例如：https://bank.sinopac.com/sinopacBT/personal/credit-card/discount/947667508.html

## 服務申請

### 電子帳單異動

* Old URL: /ElectronicBill

#### 取得行動/電子帳單通知設定資訊

* API URL: /api/Apply/GetEBillInfo
* Input:
    * PID: String(身份證字號)
* Output:
    * EmailPoolStatus: String(信用卡電子帳單狀態)
    * Email: String(信用卡電子帳單/通知寄送信箱)
    * IsApplyElectronicBill: Boolean(是否收到永豐銀行信用卡電子帳單通知，並同意停止實體帳單寄送)
    * IsApplyConsumerCollection: Boolean(是否收到每日消費彙整通知)
    * IsApplyEaper: Boolean(是否收到永豐銀行信用卡電子活動通知)
	* Mobile: String (行動帳單寄送手機)

#### 更新行動/電子帳單通知設定

* API URL: /api/apply/UpdateEBill
* Input
    * PID: String(身份證字號)
    * Email: String(信用卡電子帳單/通知寄送信箱)
    * IsApplyElectronicBill: Number(帳單類別。(0:實體帳單, 1:電子帳單, 2:行動帳單))
    * IsApplyConsumerCollection: Boolean(是否收到每日消費彙整通知)
    * IsApplyEaper: Boolean(是否收到永豐銀行信用卡電子活動通知)
* Output
    * Success(是否成功)

### 電子信箱地址異動 

#### 取得電子信箱地址

可供信用卡及 Debit 使用

* API URL: /api/Apply/QueryEMail
* Content: (Request 參數)
    * PID: String(身份證字號)
* Result: (Response 結果)
    * Email: String(信用卡電子帳單/Debit卡交易明細單/通知寄送信箱)
* ResultCode: (Response 結果代碼)

#### 變更電子信箱地址

可供信用卡及 Debit 使用

* API URL: /api/apply/UpdateEMail
* Content: (Request 參數)
    * PID: String(身份證字號)
    * Email: String(信用卡電子帳單/Debit卡交易明細單/通知寄送信箱)
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)

### 補寄電子帳單

#### 取得補寄行動/電子帳單資訊

* API URL: /api/Apply/GetResendBillInfo
* Input:
    * ID: String (身份證字號)
* Output:
    * Email: String (電子帳單寄送信箱)
    * BillMonth: String[] (電子帳單日期，格式 yyyy/MM/dd HH:mm:ss，抓最近6個月。)
	* BillType: Number (帳單類型。(0: 實體帳單; 1: 電子帳單; 2: 行動帳單))
	* Mobile: String (手機號碼)
* ResultCode:
    * 00: 成功

#### 申請補寄行動/電子帳單

* API URL: /api/Apply/ResendBill
* Input:
    * ID: String (身份證字號)
    * DateYYYYMM: String (帳單年月)
	* BillType: Number (帳單類型(1:電子帳單; 2:行動帳單))
* Output
    * Success: Boolean (是否成功)
* ResultCode
    * 00: 補寄成功
	* 電子帳單:
		* 01: 電子信箱未完成認證程序，無法申請補寄電子帳單。
		* 02: 您所選擇補寄的月份並沒有您的電子帳單資料
		* 03: 其他錯誤, 無法重寄
	* 行動帳單:
		* 01: 寫入簡訊系統失敗，無法補寄行動帳單
		* 02: 查無手機或手機格式錯誤
		* 03: 短網址未產生，無法補寄行動帳單
		* 04: 查無此帳單年月
		* 05: 其他錯誤，無法補寄行動帳單

### 補寄實體帳單

#### 取得補寄實體帳單資訊

* Old Web URL: /Account/ResendBill
* API URL: /api/Apply/GetResendPaperBillInfo
* Input:
    * ID: String(身份證字號)
    * BillDateYYYYMM: String (帳單年月，格式: YYYYMM，若為空值，則抓取近期帳單資訊)
* Output:
    * BillMonthList: String[] (帳單期別，格式 yyyy/mm)
    * BillMonth: String (帳單年月，格式: YYYYMM)
    * CurrBal: String (本期應繳金額)
    * DueAmt: String (本期最低應繳金額)
    * DueDate: String (繳款截止日，格式 yyyy/mm/dd)
    * StmtDate: String (結帳日，格式 yyyy/mm/dd)
    * CreditLimit: String (信用額度)
    * CreditAvailable: String (目前可用額度)

#### 補寄實體帳單

* API URL: /api/Apply/ResendPaperBill
* Input:
    * ID: String(身份證字號)
    * BillMonth: String (帳單年月，格式: YYYYMM)
* Output: (None)

### 網路開卡

* API URL: /api/Apply/ActivateCard
* Old URL: /QuickService/EnableCard
* Input
    * CardNo: String (卡號)
    * BOD_YYYYMMDD: String (持卡人的生日)
    * ValidDate_MMYY: String (卡片有效期限 MMYY)
* Output
    * CardNo: String (卡號)
    * RE_CODE: String (結果碼)
    * RefNo: String (交易編號，例如：`YTRDX316556985`)

### 申請進度查詢

* API URL: /api/Apply/QueryStatus
* Old URL: /ApplyCard/StatusInquiry
* Methods: AdvWB01
* Input:
    * ID: String (身分證字號)
    * BIRTHDAY: String (出生月日，格式 MMDD)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * Items: Object[]
        * CARD_TYPE: String (卡別)
        * STATUS: String (狀態別)
        * STATUS_DATE: String (狀態日，欄位格式【YYYYMMDD】)
        * STATUS_DESC: String (狀態說明)
        * EBOSSING_TYPE: String (卡面)
        * BIRTHDAY: String (出生月日，格式 MMDD)
        * CARD_DESC: String (卡片種類)
		* DOC_STATUS: String[] (補件狀態)
		* ServiceMessages: String[] (客服訊息)
		* UploadFileMessages: String[] (缺補件訊息)

### Display card 3D驗證密碼修改

* Old URL: /Information/Card

#### 取得 Display card 卡號清單

* API URL: /api/Apply/GetDisplayCardList
* SP: `SP_WEB_DISPLAYCARD_GET`
* Input:
    * ID: String (持卡人 ID)
* Output:
    * Items: String[]
        * CardNo: String (卡號)

註：若傳回的卡號筆數為 0 ，則表示此人無 Display card，所以不能修改Display card 3D驗證密碼。

#### 修改Display card 3D驗證密碼

* API URL: /api/Apply/DisplayCardPwd
* Methods: `SP_WEB_DISPLAYCARDPWD`
* Input:
    * ID: String (持卡人 ID)
    * CardNo: String (Display Card 卡號)
    * Birthday: String (持卡人生日，格式為MMDD)
    * NewPwd: String (新的驗證碼)
* Output:
    * RTNCODE: String (結果碼)
    * Success: Boolean (是否成功)

### 預借現金密碼修改

* API URL: /api/Apply/ChangeCashAdvancePwd
* Old URL: /Finance/CashAdvanceChangePassword
* Methods: MQ.WB15
* Input:
    * CardNo: String (卡號)
    * NewPin: String (新密碼，密碼長度為四碼)
    * OldPin: String (舊密碼，密碼長度為四碼)
* Output:
    * Success: Boolean (是否修改成功)

### 申請預借現金密碼

* API URL: /api/Apply/ApplyCashAdvancePwd
* Old Web URL: /Finance/CashAdvanceApplyPassword
* Methods: WB04
* Input:
    * CardNo: String (卡號)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output
    * Success: Boolean (是否申請成功)

### 取得卡友的有效卡片清單

* API URL: /api/Member/Cards
* Method: MQ WB39
* 交易專用(不含已停卡及暫停卡)
* Input
    * UID: String (身分證字號)
* Output
    * Items: Object[] (多筆的卡片資訊)
        * CardNo: String (卡號)
        * Name: String (卡片名稱)
        * CardTypeCode: String (TYPE，主附卡代碼)
        * CardTypeDesc: String (主卡或附卡)
        * CardFace: String (EMBOSSING_TYPE)
        * ProductCode: String (PROD_CODE，卡別)

### 取得卡友的卡片清單

* API URL: /api/Member/AllCards
* Method: MQ WB40
* 查詢專用
* Input
    * UID: String (身分證字號)
* Output
    * Items: Object[] (多筆的卡片資訊)
        * CardNo: String (卡號)
        * Name: String (卡片名稱)
        * CardTypeCode: String (TYPE，主附卡代碼)
        * CardTypeDesc: String (主卡或附卡)
        * CardFace: String (EMBOSSING_TYPE)
        * ProductCode: String (PROD_CODE，卡別)

### 第三人行銷變更

Old EWEB URL: /Information/ThirdParty

#### 取得第三人行銷註記

* Method: `SP_eWEB_QueryThdXSellFlag`
* API URL: /api/Apply/QueryThirdPartySellFlag
* Input:
    * ID: String(身份證字號)
* Output:
    * IsAgree: Boolean (是否同意)
    * IsOnlyDebitCard: Boolean (是否只擁有 Debit 卡)

#### 更新第三人行銷註記

* Method: `SP_eWEB_UpdThdXSellFlag`
* API URL: /api/Apply/UpdateThirdPartySellFlag
* Input:
    * ID: String(身份證字號)
    * IsAgree: Boolean (是否同意)
* Output:
    * Success: Boolean (是否成功)

### 索取自動轉帳授權書

* Old Web URL: /Account/RequestAttorney
* API URL: /api/Apply/RequestAttorney
* Input:
    * ID: String(身份證字號)
* Output:
    * Success: Boolean (是否成功)
    * Message: String (回覆訊息)

### 信用卡掛失

#### 查詢可掛失的卡片清單

* API URL: /api/Apply/QueryLostCards
* Input:
    * ID: String(身份證字號)
* Output:
    * Items: Object[] (卡片清單)
        * ProductCode: string (卡別)
        * CardFace: string 
        * Name: string (卡片名稱)
        * CardBrand: string (卡別)
        * CardFaceUrl: string (卡面圖檔連結)
        * Cards: object[] (卡片明細)
			* CardNo: string (卡號)
			* Name: string (卡片名稱)
			* CardTypeCode: string (主附卡代碼)
			* CardTypeDesc: string (主卡或附卡)
			* ProductCode: string (卡別)
			* CardFace: string
			* CardBrand: string (卡別)
			* CardHolderName: string (持卡人姓名)

## 電子帳單

### 列印繳款單

* Old Web URL: /ElectronicBill/PrintPaymentSlip
* API URL: /api/EBill/GetPaymentSlip
* Input
    * ID: String(身份證字號)
    * BillDateYYYYMM: String(帳單年月)
* Output
    * Success: Boolean(繳款單 PDF 檔案是否成功產生)
    * PdfFile: byte[] (繳款單 PDF 檔案)

### 產生帳單 PDF

Old Web URL: /Account/GetBillPDF
API URL: /api/EBill/GetBillPDF
* Input
    * ID: String(身份證字號)
    * BillDateYYYYMM: String(帳單年月)
* Output:
    * Success: Boolean(帳單 PDF 檔案是否成功產生)
    * PdfFile: byte[] (帳單 PDF 檔案)

## 好房卡

### 判斷是否為房貸戶

* API URL: /api/Member/IsILoanUser
* Old Method: IsILoanUser
* Input
    * ID: String(身份證字號)
* Output
    * IsILoanUser: Boolean (是否為房貸戶)

### 申請永調(好房卡)

* API URL: /api/Finance/HouseLoanCardPermAdjApply
* Methods: `SP_LineAdj_ADD2`
* Input
    * ID: String (身份證字號)
    * Line: String (永久額度，單位千元。)
    * NewLine: String (申請調整後額度，單位千元)
    * ReasonCode: String (原因碼，值為 "01" ~ "06")
    * ReasonDesc: String (其他原因說明)
    * Company: String (目前服務機構名稱)
    * IsFinancialCustomer: String (是否為永豐銀行理財客戶)
    * AttachmentRefs: String[] (附件參考序號)
* Output
    * RefNo: String (交易編號，例如：`YTRDX316556985`)

## OTP

### 產生動態密碼(區分功能)

* API URL: /api/Member/GenerateOTP
* Old Method: GenerateOTPByFunction
* Input
    * ID: String (身份證字號)
    * Mobile: String (手機號碼)
    * FunctionCode: Number (功能代碼)
        * 1: ApplyCardTwoFactor, 線上辦卡(雙因)
        * 2: ApplyCardNonTwoFactor, 線上辦卡(非雙因)
        * 3: ApplyHouseCardTwoFactor, 線上申請好房卡(雙因)
        * 4: TempAdjust, 臨調
        * 5: PermanentAdjust, 永調
        * 6: HouseCardPermanentAdjust, 好房卡永調
        * 7: OtherCardAuth, 線上辦卡(以卡辦卡)
        * 8: ChangeEmail, 變更電子郵件信箱
* Output
    * Success: Boolean(是否成功產生動態密碼)
* ResultCode: String (結果碼)
    * 00: 簡訊動態密碼產生成功
    * 01: 簡訊動態密碼每日寄發次數上限5次
    * S1: 系統整理中，請稍後再試。
    * E1: 系統整理中，請稍後再試。

### 驗證動態密碼(區分功能)

* API URL: /api/Member/VerifyOTP
* Old Method: VerifyOTPByFunction
* Input
    * ID: String (身份證字號)
    * FunctionCode: Number (功能代碼)
        * 1: ApplyCardTwoFactor, 線上辦卡(雙因)
        * 2: ApplyCardNonTwoFactor, 線上辦卡(非雙因)
        * 3: ApplyHouseCardTwoFactor, 線上申請好房卡(雙因)
        * 4: TempAdjust, 臨調
        * 5: PermanentAdjust, 永調
        * 6: HouseCardPermanentAdjust, 好房卡永調
        * 7: OtherCardAuth, 線上辦卡(以卡辦卡)
        * 8: ChangeEmail, 變更電子郵件信箱
    * Otp: String (動態密碼)
* Output
    * Success: Boolean(是否驗證成功)
* ResultCode: String (結果碼)
    * 00: 動態密碼驗證成功
    * 01: 動態密碼未產生或已失效
    * 02: 很抱歉，您輸入簡訊動態密碼錯誤已達限制次數，為確保您交易安全，請明日再試。
    * 03: 動態密碼已經失效
    * 04: 動態密碼驗證失敗{0}次
    * 05: 動態密碼驗證失敗
    * S0: 系統整理中，請稍後再試
    * E1: 系統整理中，請稍後再試。

## 線上辦卡

一般卡 UI 邏輯：

* URL 可以指定卡別，於第一頁中直接選好卡片。
* 可以選擇雙因驗證(MMA 會員 / 卡友 / 存款戶)或非雙因驗證(新客戶辦卡)
* 雙因：第一因驗證後，如果手機為空值，無法進行 OTP，要改走非雙因辦卡，並進入步驟一。
* 雙因：登入的使用者，直接進入 OTP 驗證。
* 不管是否為雙因，皆需判斷客戶是否為舊卡友，因為舊卡友要套的 PDF 表單不同。
* 雙幣卡：
    * 顯示提示文字
        * 非雙因或雙因有外幣帳戶：提醒您!申請永豐雙幣卡請先確認已開立本行外幣存款帳戶，並同意授權本行以外幣帳戶自動扣繳外幣信用卡帳款。
        * 雙因無外幣帳戶：申請永豐雙幣卡須先開立本行外幣存款帳戶，如您尚未開立帳戶，建議您可至永豐銀行各分行辦理或選擇申請其他卡片種類。
    * 雙因，且無外幣帳戶，不能申辦。
* 雙因：不可輸入生日
* 步驟一欄位：
    * 顯示「個人網路銀行服務條款」」
        * checkbox: 本人特此聲明已詳細閱讀永豐商業銀行股份有限公司網路銀行服務條款並已充分了解且同意遵守全部內容。
    * 基本資料欄位：雙因要帶入資料，各文字欄位預設顯示為文字，文字欄位旁要顯示編輯圖示讓使用者點選進行編輯(除了身分證號碼外，其餘皆可編輯)。
        * 中文姓名
        * 身分證號碼
        * 行動電話
        * 現居/通訊電話(非雙因要有區碼及電話號碼兩個欄位；雙因則只有一個欄位)。
        * 電子郵件
        * 我同意貴行以電子郵件寄送信用卡契約(未勾選視為不同意)
* 步驟二欄位：
* Combo 卡欄位：非雙因不必撈台幣存款帳號清單
    * 存款帳號：可輸入文字的下拉清單，提示文字：
        * 非雙因：請您輸入永豐銀行存款帳號共14碼
        * 雙因：您可自行輸入永豐銀行存款帳號共14碼，或以下拉選單方式點選您預設的帳號。
    * 國際金融卡功能(Radio Button: 申請/註銷)：如未勾選視為未申請，若勾選「申請」則需顯示「國際金融卡特別約定事項」。並顯示以下 checkbox
        * IsAgreeInternationalCard(Checkbox):聲明本人已審慎閱讀、瞭解上述「國際金融卡特別約定事項」之內容，本人知悉此約定事項條款併入開立帳戶總約定書(約定書編號：CSR-001)。並同意 貴行得於修改總約定書內容後，置放營業單位供索閱及公佈於 貴行網站以代通知，客戶本人願遵守之。
    * 帳號轉帳功能(ComboTransferFunction)：下拉清單，空白(表示未勾選)、不限約定帳號轉帳、限約定帳號轉帳。如未勾選視同僅提領現金
    * 金融卡消費扣款功能(ComboIsApplyDebitFunction)：checkbox，只有一個選項(申請)，預設未勾選，如未勾選視同未申請。
    * 審閱時間(日期範圍為31天前到今天)
    * 請您審閱「金融卡使用說明及約定條款(CSR-001)」
* HiCard 欄位：
    * HiCard聯名卡紅利點數3倍送之指定通路：顯示以下 checkbox
        * Hi購物
        * Hi娛樂
        * Hi美食
        * Hi旅遊
* 雙幣卡欄位：非雙因不必撈台外幣存款帳號清單
    * 永豐外幣存款帳號：可輸入文字的下拉清單。提示文字：
        * 非雙因：請您輸入永豐銀行外幣存款帳號共14碼
        * 雙因：您可自行輸入永豐銀行外幣存款帳號共14碼，或以下拉選單方式點選您預設的帳號。
    * 外幣授權扣繳金額
    * 永豐臺幣存款帳號：可輸入文字的下拉清單。提示文字：
        * 非雙因：請您輸入永豐銀行臺幣存款帳號共14碼
        * 雙因：您可自行輸入永豐銀行臺幣存款帳號共14碼，或以下拉選單方式點選您預設的帳號
    * 臺幣授權扣繳金額：不必輸入，僅紅字顯示「同上開外幣帳款自動轉帳扣繳所勾選之項目(適用於本次申請或已是本行信用卡客戶且有設定本行臺幣帳戶自動轉帳扣繳之客戶。)」。
    * 雙幣卡自動換匯扣款功能：checkbox 本人已閱讀並了解「自動扣繳及換匯扣款功能重要注意事項」
* 雙幣 Combo 卡欄位：與「Combo 卡」欄位相同，但少了「存款帳號」欄位。
* 您的個人資料(新卡友才要輸入。雙因要帶入資料，文字欄位預設顯示為文字，文字欄位旁要顯示編輯圖示讓使用者點選進行編輯)
    * 非雙因：
        * 英文姓名
        * 出生日期(雙因不可編輯)
        * 現居/通訊地址：兩個下拉清單(城市及地區)及一個文字欄位
            ※當電子信箱傳送失敗時，將以上欄「現居/通訊地址」所填載之地址補寄紙本帳單。
        * 現居/通訊地狀態：下拉選單
        * 戶籍資料：checkbox 同現居/通訊地址
        * 戶籍電話(非雙因要有區碼及電話號碼兩個欄位；雙因則只有一個欄位)。
        * 戶籍地址：兩個下拉清單(城市及地區)及一個文字欄位
        * 卡片寄送地址：checkbox 同現居/通訊地址同戶籍地址
* 您的其他資料(新卡友才要輸入)
    * 職業資料：下拉清單
    * 學生：checkbox。勾選後需顯示並填寫以下欄位(學生及家管只能選一個)
        * 父母或法定代理人中文姓名
        * 父母或法定代理人連絡電話
    * 家管：checkbox。
    * 教育程度：下拉清單
    * 學生及家管只能選一個，若皆未勾選，則需顯示並輸入以下欄位：
        * 公司名稱(必填)：
        * 年薪：
        * 是否為負責人：radio button，可選擇「負責人/合夥人」或「受雇員工」，預設勾選「受雇員工」。
        * 公司電話(必填，有區碼及電話號碼兩個欄位)
        * 分機
* 共同行銷/合作推廣之個人資料同意使用條款(AgreeAllCompany)：checkbox
* 第三人行銷之個人資料同意使用條款(AgreeThirdParty)：checkbox
* 聯名卡個人資料同意使用條款(AgreeBrandedCard): checkbox，卡片資訊的 ExistFormat 為聯名卡(4) 才需顯示。
* 信用卡申請書(約定)同意條款：區分為「一般信用卡(好房也適用，但部份條文不同)」及「雙幣信用卡」兩種版本
    * checkbox 本人已詳閱並同意以上條款及「其他條款」(其他條款為 PDF 連結)
* 其他欄位：舊卡網只有新卡友才顯示
    * 是否開啟鈦豐金融信用卡彈性額度功能(IsElasticLimit = true)
    * 是否不同意預設開啟悠遊卡自動加值功能(IsEasyCard == true)
* 同意貴行核卡後主動寄發預借現金密碼函(未勾選者視為不同意)。＊未勾選同意者，日後得隨時來電貴行信用卡會員服務中心申請寄發。

好房卡：

* 標題要顯示「好房信用卡申請」
* 只能進行雙因驗證(MMA 會員 / 卡友 / 存款戶)
* 第一因驗證後，若非房貸戶，要轉為一般信用卡申請。
* 第一因驗證後，如果手機為空值，仍進入 OTP 頁面，並於頁面上顯示「因未留存手機號碼，故無法進行簡訊動態密碼驗證」。
* OTP 驗證失敗時，要顯示 Popup，按下「留下聯絡資訊」按鈕後，需導至指定的 URL。
* 登入的使用者：需檢查是否為房貸戶，若非房貸戶，要轉為一般信用卡申請。
* 其餘邏輯 UI 邏輯同一般卡。

共用邏輯：

* 後端：要去掉手機號碼開頭的國碼和符號。其他的電話號碼要格式化。

### 電話留言申辦

* API URL: /api/ApplyCard/CustomerServiceTelApply
* Old Web URL: /CustomerService/CustomerServiceTel
* Input
    * Product: String (想了解的產品：值可為「信用卡」、「易通財」、「豐利金」)
    * Name: String (姓名)
    * Tel_Day: String (聯絡電話(日))
    * Mobile: String (行動電話)
    * IsHaveCard: Boolean (是否為卡友)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output
    * Success : Boolean(是否成功)

### 專人聯絡

同「電話留言申辦」，但沒有圖形驗證。

* API URL: /api/ApplyCard/WebApply
* Input
    * Product: String (想了解的產品：值可為「信用卡」、「易通財」、「豐利金」)
    * Name: String (姓名)
    * Tel_Day: String (聯絡電話(日))
    * Mobile: String (行動電話)
    * IsHaveCard: Boolean (是否為卡友)
* Output
    * Success : Boolean(是否成功)

### 第一因驗證(核身)

* API URL: /api/ApplyCard/FirstFactorAuth
* Old Web URL: /ApplyCard/TFLogin
* Input:
    * Type: Number (驗證類別。1:MMA會員;2:卡友;3:存款戶;4:卡友/存戶;5:數位帳戶)
    * IsHouseLoanCard: Boolean (是否為好房卡)
    * ID: String (身分證字號)
    * UserId: String (使用者代碼)
    * Password: String (網路密碼)
    * Birthday: String (出生年月日，格式為 YYYYMMDD)
    * CardNo: String (信用卡卡號)
    * CVV2: String (卡片檢核碼)
    * DepositAccount: String (永豐銀行存款帳號，共14位數字)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
	* Source: number (串接來源)
	* ProductType: number (卡別。1:一般卡; 2:好房卡; 3:虛擬卡; 4:財富無限卡)
* Output:
    * ID: String (身分證字號)
    * Success: Boolean(是否成功)
    * Mobile: String (手機號碼)
    * IsILoanUser: Boolean (是否為房貸戶)

### 取得所有申請卡片資訊

* API URL: /api/ApplyCard/ApplicationCardInfo
* Input:
    * OnlyVisible: boolean (是否只顯示可見的卡片清單，選擇性，預設值為 true)
* Output:
    * ApplyCardApplications: object[] (卡片資料)
        * Id: Number (卡片識別碼)
        * ProductType: Number (產品別。1:一般卡;2:好房卡)
        * CardFace: Number (Card Face)
        * Title: String (卡片種類)
        * CardType: String (卡別種類)
        * CardName: String (卡別名稱)
		* CardFullName: Title + " " + toUpper(CardType) + " " + CardName 
        * NewFormat: Number (新戶格式，用來決定條款的版本。)
            * 1:新戶版
            * 2:行動信用卡版
            * 3:銀行簡易版
            * 4:聯名版
            * 5:行動金融信用卡版
            * 6:Displaycard 舊戶版
            * 7:Displaycard 新戶版
            * 8:好房卡
            * 9:雙幣卡新戶版
            * 10:雙幣卡舊戶版
        * ExistFormat: Number (舊戶格式，用來決定條款的版本)
        * FirstBrushCeremony: String (首刷禮)
        * ProductInterests: String (專屬權益)
        * CardFaceUrl: String (卡面 URL)
        * CardUrl: String (產品頁 URL)
        * Period: String (活動期間)
        * IsDualCurrencyCard: Boolean (是否為雙幣卡)
        * IsBrandedCard: Boolean (是否為聯名卡)
        * IsHiCard: Boolean (是否為 HiCard 聯名卡)
        * IsComboCard: Boolean (是否為Combo卡)
        * IsEasyCard: Boolean (是否為悠遊聯名卡)
        * IsElasticLimit: Boolean (是否開啟鈦豐金融信用卡彈性額度功能)
        * CurrencyType: Number (幣別代碼，用來取得帳號清單。幣別。1:台幣; 2:美金; 3:日元; 4:歐元)
		* IsShopCard: Boolean (是否為美安卡)
		* IsShopEasyTitaniumCard: Boolean (是否為美安悠遊鈦金卡)
		* IsIpassCard: Boolean (是否為iPASS一卡通)
		* IsVirtualCard: Boolean (是否為虛擬卡)
		* ShowDawhoAuthDebitUI: Boolean (是否顯示 "DAWHO現金回饋卡自動扣繳" UI)
		* ApplicationAgreementUrl: String (「信用卡申請書同意條款暨約定事項」URL)
		* BrandCardPersonalDataTermsUrl: String (「聯名卡個人資料認同機構使用同意條款」URL)
		* CoMarketingPersonalDataTermsUrl: String (「共同行銷合作推廣個人資料條款」URL)
		* ThirdPartyMarketingTermsUrl: String (「第三人行銷個人資料同意條款」URL)
		* ApplicationAgreementUrl: String (其他條款 URL)
		* EBillTermsUrl: String (「永豐銀行信用卡電子帳單規範」URL)
		* BankServiceTermsUrl: String (「個人網路銀行服務條款」URL)
		* PersonalDataTermsUrl: String (「個人資料同意使用條款」URL)
		* DualCurrencyCardAutoDebitTermsUrl: String (「雙幣卡自動換匯扣款功能同意條款」URL)
		* InternationalComboCardTermsUrl: String (「國際金融卡特別約定事項」URL)
		* ComboCardTermsUrl: String (「金融卡使用說明及約定條款(CSR-001)」URL)
		* VirtualCardTermsUrl: String (「虛擬卡約定條款同意事項」URL)
		* DawhoAuthDebitAgreementUrl: String (「DAWHO現金回饋卡自動扣繳注意事項」URL)

### 取得單一申請卡片資訊

* API URL: /api/ApplyCard/SingleCardInfo
* Input:
    * CardId: Number(卡片識別碼)
    * OnlyVisible: boolean (是否只抓可見的卡片，選擇性，預設值為 true)
* Output:
    * Id: Number (卡片識別碼)
    * ProductType: Number (產品別。1:一般卡;2:好房卡)
    * CardFace: Number (Card Face)
    * Title: String (卡片種類)
    * CardType: String (卡別種類。visa, mastercard, jcb, americanexpress)
    * CardName: String (卡別名稱。資料庫 CardType 欄位去掉開頭的 visa, mastercard, jcb 後的名稱，AmericanExpress卡直接傳回完整名稱。)
	* CardFullName: Title + " " + toUpper(CardType) + " " + CardName 
	* FullCardType: String (資料庫的原始 CardType 欄位)
    * NewFormat: Number (新戶格式，用來決定條款的版本。)
        * 1:新戶版
        * 2:行動信用卡版
        * 3:銀行簡易版
        * 4:聯名版
        * 5:行動金融信用卡版
        * 6:Displaycard 舊戶版
        * 7:Displaycard 新戶版
        * 8:好房卡
        * 9:雙幣卡新戶版
        * 10:雙幣卡舊戶版
    * ExistFormat: Number (舊戶格式，用來決定條款的版本)
    * FirstBrushCeremony: String (首刷禮)
    * ProductInterests: String (專屬權益)
    * CardFaceUrl: String (卡面 URL)
    * CardUrl: String (產品頁 URL)
    * Period: String (活動期間)
    * IsDualCurrencyCard: Boolean (是否為雙幣卡)
    * IsBrandedCard: Boolean (是否為聯名卡)
    * IsHiCard: Boolean (是否為 HiCard 聯名卡)
    * IsComboCard: Boolean (是否為Combo卡)
    * IsEasyCard: Boolean (是否為悠遊聯名卡)
    * IsElasticLimit: Boolean (是否開啟鈦豐金融信用卡彈性額度功能)
    * CurrencyType: Number (幣別代碼，用來取得帳號清單。幣別。1:台幣; 2:美金; 3:日元; 4:歐元)
	* IsShopCard: Boolean (是否為美安卡)
	* IsShopEasyTitaniumCard: Boolean (是否為美安悠遊鈦金卡)
	* IsIpassCard: Boolean (是否為iPASS一卡通)
	* IsVirtualCard: Boolean (是否為虛擬卡)
	* ShowDawhoAuthDebitUI: Boolean (是否顯示 "DAWHO現金回饋卡自動扣繳" UI)
	* ApplicationAgreementUrl: String (「信用卡申請書同意條款暨約定事項」URL)
	* BrandCardPersonalDataTermsUrl: String (「聯名卡個人資料認同機構使用同意條款」URL)
	* CoMarketingPersonalDataTermsUrl: String (「共同行銷合作推廣個人資料條款」URL)
	* ThirdPartyMarketingTermsUrl: String (「第三人行銷個人資料同意條款」URL)
    * ApplicationAgreementUrl: String (其他條款 URL)
	* EBillTermsUrl: String (「永豐銀行信用卡電子帳單規範」URL)
	* BankServiceTermsUrl: String (「個人網路銀行服務條款」URL)
	* PersonalDataTermsUrl: String (「個人資料同意使用條款」URL)
	* DualCurrencyCardAutoDebitTermsUrl: String (「雙幣卡自動換匯扣款功能同意條款」URL)
	* InternationalComboCardTermsUrl: String (「國際金融卡特別約定事項」URL)
	* ComboCardTermsUrl: String (「金融卡使用說明及約定條款(CSR-001)」URL)
	* VirtualCardTermsUrl: String (「虛擬卡約定條款同意事項」URL)
	* DawhoAuthDebitAgreementUrl: String (「DAWHO現金回饋卡自動扣繳注意事項」URL)

### 取得客戶資料

* API URL: /api/ApplyCard/GetCustomerInfo
* Input:
    * MemberType: Number (客戶類別。1:MMA會員;2:卡友;3:存款戶;4:卡友/存戶;5:數位帳戶)
    * ID: String (身分證字號)
	* Source: number (串接來源。1: 數位帳戶)
* Output:
    * ID: String (身分證字號)
    * CName: String (中文姓名)
    * EName: String (英文姓名)
    * Email: String (電子郵件地址)
    * Mobile: String (行動電話)
    * Address: String (現居/通訊地址)
    * Phone: String (現居/通訊電話)
    * ResidenceAddress: String (戶籍地址)
    * ResidencePhone: String (戶籍電話)
    * Birthday: String (出生日期，格式為 YYYYMMDD)
    * IsCardMember: Boolean (是否為卡友)
    * IsILoanUser: Boolean (是否為房貸戶)
	* IdCardIssueDateYYY: string (身分證發證日期 - 民國年)
	* IdCardIssueDateMM: string (身分證發證日期 - 月份)
	* IdCardIssueDateDD: string (身分證發證日期 - 日)
	* IdCardIssueLocation: string (身分證發證地點(縣市))
	* IdCardIssueType: string (身分證領換補類別(初發、補發、換發))
	* JobCategory: string (職業資料)
	* Education: number (教育程度。1：博士; 2：碩士; 3：大學; 4：專科; 5：高中/高職; 6：其他)
	* Company: string (公司名稱)
	* CompanyPhoneAreaCode: string (公司電話：區域號碼，最多2碼。)
	* CompanyPhone: string (公司電話，最多8碼)
	* AnnualSalary: string (年薪，以萬元為單位。)
	* ShopMemberNo: string (美安顧客編號)
	* CanApplyDawhoCard: boolean (是否可申請DAWHO現金回饋卡)
	* DawhoStatus: string (數位帳戶狀態)
	* Referrer: string (推薦人員編/ID)
	* TaiwanDepositAccount: string (臺幣存款帳號)

### 是否有外幣帳戶

* API URL: /api/ApplyCard/HasForeignCurrencyAccount
* Old Web URL: /ApplyCard/HasForeignCurrencyAccount
* Input:
    * ID: String (身分證字號)
    * IsHouseLoanCard: Boolean (是否為好房卡)
    * CardFace: String
* Output:
    * HasForeignCurrencyAccount: Boolean (是否有外幣帳戶)

### 取得銀行帳號清單

* API URL: /api/ApplyCard/GetBankAccounts
* Old Web URL: /ApplyCard/Step2
* Method: GetBankAccount
* Input:
    * ID: String (身分證字號)
    * CurrencyType: Number (幣別。1:台幣; 2:美金; 3:日元; 4:歐元)
* Output:
    * Accounts: String[]
        * AccountNo: String (銀行帳號)

### 送出申請資料

* API URL: /api/ApplyCard/SendApplyInfo
* Old Web URL: POST /ApplyCard/Step3
* Input:
    * MemberType: Number (客戶第一因驗證類別。1:MMA會員;2:卡友;3:存款戶)
    * ApplyCardCategory: Number (申請卡片代碼)
    * IsTwoFactorMember: Boolean (是否為雙因驗證)
    * IsApplyEasyMoney: Boolean (是否有興趣申請循環型或分期型信用貸款。)
    * ProfitSerialNo: String (廠商分潤序號)
    * Name: String (中文姓名)
    * IDNumber: String (身分證號碼)
    * Mobile: String (行動電話)
    * Phone: String (現居/通訊電話，完整電話號碼，雙因使用。)
    * Phone_1: String (現居/通訊電話：區碼)
    * Phone_2: String (現居/通訊電話：電話號碼)
    * Email: String (電子信箱)
    * EmailSendContract: Boolean (是否同意電子信箱寄送信用卡契約)
    * AgreeAllCompany: Boolean (是否同意下述所有公司共同行銷/合作推廣)
    * AgreeSecurities: Boolean (是否同意永豐金證券股份有限公司，似乎未使用。)
    * AgreeLifeInsurance: Boolean (是否同意永豐人身保險代理人股份有限公司，似乎未使用。)
    * AgreePropertyInsurance: Boolean (是否同意永豐金財產保險代理人股份有限公司，似乎未使用。)
    * AgreeFinancial: Boolean (是否同意永豐期貨(股)公司，似乎未使用。)
    * AgreeThirdParty: Boolean (是否同意提供個人資料予與　貴行有特約合作關係之第三人)
    * AgreeBrandedCard: Boolean (是否同意提供個人資料予聯名/認同卡之聯名/認同機構)
    * HasReview: Boolean (已審閱，似乎未使用。)
    * ReviewTime: Date (審閱時間)
    * ComboDepositAccount: String (存款帳號)
    * IsElasticLimit: Boolean (是否同意開啟鈦豐金融信用卡彈性額度功能)
    * ComboInternationalCardFeatures: Number (國際金融卡功能。1:申請; 2:註銷)
    * ComboIsApplyDebitFunction: Boolean (是否申請金融卡消費扣款功能)
    * ComboTransferFunction: Number (帳號轉帳功能。1:不限約定帳號轉帳; 2:限約定帳號轉帳; 3: 僅提領現金。預設為 3)
    * IsStudent: Boolean (是否為學生)
    * IsMeido: Boolean (是否為家管)
    * Company: String (公司名稱)
    * IsCorporation: Boolean (是否為股份有限公司，似乎未使用。)
    * IsMaster: Boolean (是否為負責人。true: 負責人/合夥人; false: 受雇員工)
    * CompanyAddress: String (公司地址，似乎未使用。)
    * CompanyPhoneAreaCode: String (公司電話：區域號碼，最多2碼。)
    * CompanyPhone: String (公司電話，最多8碼)
    * CompanyPhoneEx: String (公司電話：分機，最多5碼。)
    * Department: String (部門名稱，似乎未使用。)
    * AnnualSalary: Number (年薪，以萬元為單位。)
    * Qualifications: Number (年資，似乎未使用。)
    * Post: String (職稱，似乎未使用。)
    * JobCategory: String (職業資料)
	* JobCategoryCode: String (職業類型代碼)
	* JobTitle: string (職業名稱)
    * LegalName: String (父母或法定代理人中文姓名，職業為學生才需填寫。)
    * LegalPhone: String (父母或法定代理人連絡電話，職業為學生才需填寫。)
    * EnglishName: String (英文姓名)
    * Birthday: String (出生日期，格式為 YYYYMMDD)
    * Education: Number (教育程度。1：博士; 2：碩士; 3：大學; 4：專科; 5：高中/高職; 6：其他)
    * Marriage: Number (婚姻狀況，似乎未使用。1:已婚; 2: 未婚; 3:其他)
    * Address: String (現居/通訊地址)
    * HomeStatus: Number (現居/通訊地狀態。1:自置; 2:租賃; 3:父母產業; 4:宿舍 ;5:其他。)
    * HomeLiveYears: Number (現居地狀態：居住年數，似乎未使用。)
    * IsResidenceAddressIsHomeAddress: Boolean (戶籍資料是否同現居/通訊地址)
    * ResidenceStatus: Number (戶籍地狀態，似乎未使用。1:自置; 2:租賃; 3:父母產業; 4:宿舍 ;5:其他。)
    * ResidenceAddress: String (戶籍地址)
    * ResidencePhone: String (戶籍電話，完整電話號碼，雙因使用。)
    * ResidencePhone_1: String (戶籍電話：區碼)
    * ResidencePhone_2: String (戶籍電話：電話號碼)
    * ReceiveAddressType: Number (卡片寄送地址。1:同現居地址; 2:同戶籍地址。)
    * DeliverPassword: Boolean (是否同意核卡後主動寄發預借現金密碼函，預設為不同意。)
    * InstallmentEnabled: Boolean (是否同意信用卡消費分期付款約定事項，似乎未使用。)
    * MobileCompany: Number (申請人行動電話門號所屬之電信公司。1:中華電信; 2:台灣大哥大)
	* HiCardChannel: Number (1: Hi購物, 2:Hi娛樂, 3: Hi美食, 4: Hi旅遊)
    * NotAutoBonus: Boolean (是否 不同意 已預設開啟悠遊聯名卡自動加值功能，預設為 false。)
    * IsMaskData: Boolean (是否將未修改的個人資料隱碼，僅供 UI 控制是否要隱碼。)
    * ProductType: Number (產品別。1:一般信用卡; 2:好房信用卡)
    * TaiwanDepositAccount: String (永豐臺幣存款帳號，14碼，僅用於雙幣卡。)
    * IsAgreeAuthDebit: Boolean (是否已閱讀並了解「自動扣繳及換匯扣款功能重要注意事項」，僅用於雙幣卡。)
    * ForeignDepositAccount: String (永豐外幣存款帳號，14碼，僅用於雙幣卡。)
    * ForeignAuthDebitAmount: Number (外幣授權扣繳金額選項。1:應繳總金額; 2:最低應繳總額)
    * BranchCode: string (分行代碼)
    * Referrer: string (推薦人員編/ID)
    * IsOtherCardAuth : Boolean (是否為他行卡驗證)
	* IdCardIssueDateYYY: string; (身分證發證日期 - 民國年)
	* IdCardIssueDateMM: string; (身分證發證日期 - 月份)
	* IdCardIssueDateDD: string; (身分證發證日期 - 日)
	* IdCardIssueLocation: string; (身分證發證地點)
	* IdCardIssueType: string; (身分證領換補類別)
	* ShopCardCustId: string; (美安優惠顧客編號)
	* ShopCardUnableIssue: number; (美安悠遊鈦金卡無法核發作業)
	* StmtDeliverWay: string; (帳單寄送方式。(1: 行動帳單, 2: 電子帳單))
	* AgreeInspectLandRegisterDoc: boolean; (同意委託永豐商業銀行代為調閱不動產謄本為財力證明)
	* LandRegisterAddress: string; (不動產謄本地址)
	* LandRegisterZipCode: string; (不動產謄本郵遞區號)
	* LandRegisterAddressType: number; (不動產謄本地址別(1: 同現居地, 2: 同戶籍地, 3: 其他))
	* Flag: String (旗標(用於控制特定的程式邏輯))
	* AgreeDawhoAuthDebit: boolean (是否同意DAWHO現金回饋卡自動扣繳注意事項)
	* DawhoAuthDebitAmount: number (DAWHO現金回饋卡授權扣繳金額選項。1:應繳總金額; 2:最低應繳總額)
	* StepRowId: string (寫入步驟資料的記錄識別碼)
	* MctBrandedCardUnableIssue: number (台綜保-軍公教悠遊鈦金卡無法核發作業。1: 取消申請;2: 同意改申辦台綜保-軍公教鈦金卡)
	* DsNo: string (業務人員代碼)
* Output:
    * Success: Boolean (是否成功)

### 上傳缺補文件

#### 檢查身份證字號

檢查身份證或居留證號碼是否正確。

* API URL: /api/ApplyCard/UploadFileCheckID
* Input:
    * ID : String (身分證字號)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * Success: Boolean (是否成功)

#### 上傳檔案

* API URL: /api/ApplyCard/UploadFile
* Old Web URL: /ApplyCard/InputFile
* Input (content-type: multipart/form-data)
    * ID : String (身分證字號)
    * Type: String (檔案類型。1:身分證正面;2:身分證反面;3:財力證明)
    * File: File (身分證或財力證明檔案，檔案格式限JPG、TIF檔)
    * UploadType: Number (上傳類型。1:線上辦卡補件上傳;2:一般補件上傳)
	* FileIndex: Number (上傳檔案的索引值)
* Output
    * Success: Boolean (上傳是否成功)
    * FileId: String (檔案識別碼)
	* FileIndex: Number (上傳檔案的索引值)

#### 完成上傳檔案

API 邏輯：一般補件上傳，將所有已上傳檔案轉成 tif 檔，並透過 FTP 傳送給相關單位進行後續處理。

* API URL: /api/ApplyCard/CompleteUploadFile
* Input:
    * ID : String (身分證字號)
    * FileIds: String[] (補件檔案識別碼)

### 上傳缺補文件(移工卡)

#### 檢查居留證號碼

檢查身份證或居留證號碼是否正確。

* API URL: /api/ApplyCard/UploadFileCheckID
* Input:
    * ID : String (居留證號碼)
	* Period : number (居留期限)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * Success: Boolean (是否成功)
	* ArcIsExpired: boolean (居留證是否到期)

#### 上傳檔案

* API URL: /api/ApplyCard/UploadFile
* Old Web URL: /ApplyCard/InputFile
* Input (content-type: multipart/form-data)
    * ID : String (居留證號碼)
    * Type: String (檔案類型 1:身分證正面;2:身分證反面;3:財力證明;4:護照內頁;5:勞動契約(在職證明);6:現居地址;7:公司地址)
    * File: File (身分證或財力證明檔案，檔案格式限JPG、TIF檔)
    * UploadType: Number (上傳類型。1:線上辦卡補件上傳;2:一般補件上傳)
	* FileIndex: Number (上傳檔案的索引值)
* Output
    * Success: Boolean (上傳是否成功)
    * FileId: String (檔案識別碼)
	* FileIndex: Number (上傳檔案的索引值)

#### 完成上傳檔案

API 邏輯：一般補件上傳，將所有已上傳檔案轉成 tif 檔，並透過 FTP 傳送給相關單位進行後續處理。

* API URL: /api/ApplyCard/CompleteUploadFile
* Input:
    * ID : String (居留證號碼)
    * FileIds: String[] (補件檔案識別碼)
	* ArcIssueDate (居留證核發日期, YYYYMMDD)
	* ArcExpireDate (居留期限, YYYYMMDD)
	* ArcBarCode: string (居留證條碼號碼)

### 以卡辦卡

#### 以卡辦卡驗證

* API URL: /api/ApplyCard/AuthOtherCard
* HTTP Method: POST
* Request:
    * Header
        * Content-Type: application/json
    * Body: Object
        * Content: Object
            * Mid: String (商店代號，必填。)
            * Tid: String (端末機代號，必填。)
            * ID: String (正卡人身份證字號，必填。)
            * CardNo: String (信用卡卡號，必填。)
            * ValidDate: String (信用卡有效期限，必填。格式為 MMYY。)
            * CVV2: String (卡片背面3碼，若不驗證請傳空白。)
            * CustomerIp: String (持卡人IP，必填。)
        * Header: Object
            * ApplicationName: String (應用程式名稱)
            * UserID: String (使用者代碼，例如：身份證字號、登入代號等等)
* Response:
    * Header
        * Content-Type: application/json
    * Body: Object
        * Result: Object (EPOS API 回傳結果，僅當 EPOS API 的 post() return code 為 2 才會有值。)
            * ApproveCode: String (授權碼，8碼)
            * ResponseCode: String (授權回應碼，3碼)
            * ResponseMsg: String (授權回應訊息)
        * ResultCode: String (結果代碼)
            * 00: 驗證成功
            * 01: 驗證失敗
        * ResultMessage: String (結果訊息)

#### 以卡辦卡驗證(限制次數)

* API URL: /api/ApplyCard/AuthOtherCardWithLimitedTimes
* HTTP Method: POST
* Request:
    * Header
        * Content-Type: application/json
        * Captcha: String (圖形驗證碼，呼叫前端 API 才需要此欄位)
    * Body: Object
        * Content: Object
            * ID: String (正卡人身份證字號)
            * CardNo: String (信用卡卡號)
            * ValidDate: String (信用卡有效期限，4 碼，格式為 MMYY)
        * Header: Object
            * ApplicationName: String (應用程式名稱)
            * UserID: String (使用者代碼，例如：身份證字號、登入代號等等)
* Response:
    * Header
        * Content-Type: application/json
    * Body: Object
        * Result: Object
            * ID: String (身分證字號。當驗證成功時，此欄位才會有值)
            * ApproveCode: String (授權碼，8碼)
            * ResponseCode: String (授權回應碼，3碼)
            * ResponseMsg: String (授權回應訊息)
        * ResultCode: String (結果代碼)
            * 00: 驗證成功
            * 01: 您已是永豐客戶
            * 02: 驗證失敗
			* 03: 驗證失敗達3次
			* 04: 公司戶尚未開放此服務
        * ResultMessage: String (結果訊息)

## 註冊

MMA 會員8(信用卡會員)

### 會員註冊檢查

會員8申請網銀時，檢核客戶輸入的信用卡資訊，並依客戶選擇的通路（email或手機）發送驗證碼予客戶

* API URL: /api/Member/MemberRegisterCheck
* Input:
    * ID: String (身分證字號)
    * Birthday: String (出生年月日，格式 YYYYMMDD)
    * CardNo: String (信用卡卡號)
    * ValidDate: String (信用卡效期，格式 MMYY)
    * CVV2: String (信用卡背面末3碼)
    * Type: Integer (取得驗證碼的方式，1:手機；2: Email)
* Output:
    * Success: Boolean (是否成功)
    * Mobile: String (手機號碼)
    * Email: String (電子郵件地址)

### 信用卡會員註冊

會員8申請網銀時，檢核驗證碼，並於驗證通過時，更新客戶的信用卡email address

* API URL: /api/Member/MemberRegister
* Method: VerifyRegisterCode(驗證註冊碼), AdvMemberRegister (註冊)
* Input:
    * ID: String (身分證字號)
    * RegisterCode: String (驗證碼)
    * Email: String(電子郵件)
* Output:
    * Success: Boolean (是否成功)

### 補寄認證碼(iweb)

* API URL: /api/Member/ResendRegisterCode
* http method: GET
* Query String: pid=XXXXXXXX

## 客戶

### 取得帳單地址及聯絡電話

* API URL: /api/Member/GetContactInfo
* Method: WB19
* Input:
    * ID: String (身分證字號)
* Output:
    * Mobile: String (手機號碼)
    * HomeTel: String (家中電話)
    * CompanyTel: String (公司電話)
    * ResidenceTel: String (戶籍電話)
    * AddrInd: String (帳單寄送指示)
    * HomeZip: String (家中郵遞區號)
    * CompanyZip: String (公司郵遞區號)
    * ResidenceZip: String (戶籍郵遞區號)
    * HomeAddress: String (家中地址)
    * CompanyAddress: String (公司地址)
    * ResidenceAddress: String (戶籍地址)
    * CompanyName: String (公司名稱)

### 查詢手機號碼

* API URL: /api/Member/QueryMobile
* Input:
    * ID: String (身分證字號)
	* Type: number (查詢類別。1: 數位帳戶(大戶辦卡); 2:數位帳戶(運動卡))
* Output:
    * Mobile: String (手機號碼)

### 查詢 MMA 會員狀態

* API URL: /api/Member/QueryMMAUserStatus
* Content: (Request 參數)
	* ID: String (身份證字號)
* Result: (Response 結果)
	* Header: string (執行結果。)
		* SUCCESS－執行成功
		* FAIL－執行失敗，詳Message
		* EXCEPTION－異常，詳Message
	* Message: string (執行失敗或異常原因說明)
	* MMACUSTID: string (MMA會員（存戶）的身份證字號或統編，包含ID檢碼共11位)
	* CARDCUSTID: string (對應在CARD_USER_MAPPING資料表的信用卡戶身份證字號或統編，包含ID檢碼共11位。)
	* CPRTCD: string (網路服務註記。)
		* 空白－非MMA會員
		* 1－可執行約轉／非約轉／查詢交易會員身份
		* 3－可執行約轉／查詢交易會員身份
		* 8－信用卡網會員身份
	* WWWSTATUS: string (密碼函狀態。)
		* 空白－非MMA會員
		* 1－待啟用（已交付客戶密碼函，待客戶啟用）
		* 2－轉在途（已產生密碼函，尚未交付客戶）
		* 5－已註銷（如：密碼錯誤次數超過5次）
	* PWDERRORS: int (密碼錯誤次數)
	* CODEERRORS: int (代碼錯誤次數)
* ResultCode: (Response 結果代碼)
	* 00 - 成功

### 查詢是否為行員代登

* API URL: /api/Member/QueryMMALimitIntranetUsage
* Content: (Request 參數)
	* ID: String (身份證字號)
* Result: (Response 結果)
	* Status: bool (是否為行員代登)
* ResultCode: (Response 結果代碼)
	* 00 - 成功

## 其他

### 取得台灣3碼郵遞區號資訊

* API URL: /api/Data/TWZip3Code
* Input: (None)
* Output:
    * Items: Object[]
        * City: String(縣市)
        * Area: String(區域)
        * ZipCode: String(3碼郵遞區號)

## 豐市集

### 豐市集登入取得點數資料

* API URL: /api/Bonus/LoginForBonusReward
* Old Web URL: /External/BonusV2/LoginForBonus
* Method: `SP_WEB_UID_TRANS`, WB39, WB08, `SP_WEB_KEEP_OTP`, `SP_eWEB_SINO_M_EMPLOYEE`
* Input:
    * ID: String (身分證字號)
* Output:
    * UID: String (UID)
    * Rs: Boolean (`SP_WEB_KEEP_OTP` 是否成功)
    * Desc: String (保留欄位)
    * IsEmp: String (是否為員工)
    * OTPKey: String (OTP Key)
    * DisplayBonusPoint: int? (顯示點數)
	* LoginForBonusExternalUrl: string

## Q1活動(第一季熱刷活動)

### 核身

API URL: /api/Bonus2018Q1/Verification
* Input:
    * ID: String(身份證字號)
    * Birthday: String(出生月日，格式為 MMDD)
    * Captcha: String (圖形驗證碼，請放在 http Header 中)
* Output:
    * ID: String (身份證字號，核身成功才會回傳)
    * Success: Boolean (是否成功)

### 贈品清單

* API URL: /api/Bonus2018Q1/Gifts
* 電文： WEBDB.sp_eWEBGetPicnicData (QryType = "Gift_No")
* Input: (None)
* Output:
    * Items: Object[] (贈品清單)
        * Gift_No: String (贈品代碼)
        * Gift_NM: String (贈品名稱)
        * Gift_Point: String (可兌換點數)
        * Gift_AMT: String (可兌換金額)
		* Gift_PRICE: Number (市價)
		* Gift_Num: Number (總贈品數量)
        * Gift_Remain_Num: Number (剩餘數量)

### 符合資格的消費資料

* API URL: /api/Bonus2018Q1/AvailableTx
* 電文： WEBDB.sp_eWEBGetPicnicData (QryType = "CustSal")
* Input:
    * ID: String(身份證字號)
* Output:
    * Items: Object[] (消費明細)
        * SeqNo: Number (消費明細序號)
        * PID: String (身份證字號)
        * TX_DATE: String (消費日)
        * MEMO: String (交易明細)
        * TX_AMT: Number (消費金額)
        * SAL_POINT: Number (點數)

### 兌換贈品

* API URL: /api/Bonus2018Q1/GiftExchange
* 電文： WEBDB.sp_eWEBExPicnic
* Input:
    * ID: String (身分證字號)
    * SeqNoList: String[] (消費明細代碼，字串陣列)
    * ExchangeGifts: String[] (兌換贈品清單，字串陣列"Gift_No:兌換數量")
    * ExchangeType: String (兌換方式。【P】點數,【A】金額)
* Output:

### 兌換紀錄

* API URL: /api/Bonus2018Q1/ExchangeRecord
* 電文： WEBDB.sp_eWEBGetPicnicData (QryType = "CustEx")
* Input:
    * ID: String(身份證字號)
* Output:
    * Items: Object[] (兌換紀錄明細)
        * ExChg_SeqNo: Number (已兌換序號)
        * PID: String (身份證字號)
        * ExChg_Type: String (兌換方式。【P】點數【A】金額)
        * ExChg_DT: Date (兌換時間)
        * ExChg_Gift: String (贈品代碼)
        * ExChg_Gift_NM: String (贈品名稱)
        * ExChg_Num: Number (贈品筆數)

### 是否開放兌換

* API URL: /api/Bonus2018Q1/IsOpen
* Input: (None)
* Output: (None)
* ResultCode:
    * 00: 目前在兌換期間內
    * 01: 尚未開放兌換
    * 02: 已過兌換時間

## 簽帳金融卡(Debit卡)

### Debit卡近期交易明細

* API URL: /api/DebitCard/StatementInquiry
* Content: (Request 參數)
    * ID: String(身份證字號)
* Result: (Response 結果)
    * Items: Object[] (交易明細)
        * TXDATE: String (消費日)
        * DEDATE: String (扣款日)
        * CARDNO: String (卡號末四碼)
        * ACCOUNT: String (存款帳號末四碼)
        * MEMO: String (交易明細說明)
        * AMT: String (臺幣金額)
        * CURDATE: String (外幣折算日)
        * TXAMT: String (外幣金額)
        * NOT_DE_AMT: String (未扣款金額)
* ResultCode: (Response 結果代碼)

### 取得 Debit 卡近期交易明細 PDF

API URL: /api/DebitCard/GetStatementPDF
* Input
    * ID: String(身份證字號)
    * BillDateYYYYMM: String(帳單年月)
* Output:
    * Success: Boolean(帳單 PDF 檔案是否成功產生)
    * PdfFile: byte[] (帳單 PDF 檔案)

### Debit卡授權交易明細

* API URL: /api/DebitCard/LatestTx
* Content: (Request 參數)
    * ID: String(身份證字號)
* Result: (Response 結果)
    * Items: Object[] (交易明細)
        * CardNo: String (卡片末四碼)
        * AuthDate: String (授權日期)
        * AuthTime: String (授權時間)
        * Memo: String (消費類別/商店名稱)
        * AuthAmt: String (授權金額(臺幣))
        * CountryCode: String (消費國別)
        * AuthResult: String (授權結果)
* ResultCode: (Response 結果代碼)

### Debit卡消費分析(消費類別分析)

小網無此功能

* API URL: /api/DebitCard/StatementAnalyticsByCategory
* Content: (Request 參數)
    * ID: String (身份證字號)
    * StartDate: Date (查詢起日)
    * EndDate: Date (查詢迄日)
* Result: (Response 結果)
    * Items: Object[]
        * CategoryName: String (消費類別名稱)
        * Subtotal: Number (類別金額小計)
* ResultCode: (Response 結果代碼)

### Debit卡消費分析(每月消費金額分析)

小網無此功能

* API URL: /api/DebitCard/StatementAnalyticsByMonth
* Content: (Request 參數)
    * ID: String (身份證字號)
* Result: (Response 結果)
    * Items: Object[]
        * Month: String (月份，格式：YYYYMM)
        * Amount: Number (每月消費金額)
* ResultCode: (Response 結果代碼)

### 取得Debit卡交易明細單/通知設定資訊

* API URL: /api/DebitCard/GetNotifyInfo
* Input:
    * ID: String(身份證字號)
* Output:
    * Email: String(Debit卡交易明細單寄送信箱)
    * IsApplyConsumerCollection: Boolean(是否收取消費通知)
    * IsApplyEaper: Boolean(是否收取Debit卡電子活動通知 )

### Debit卡交易明細單/通知設定

* API URL: /api/DebitCard/SetNotify
* Content: (Request 參數)
    * ID: String(身份證字號)
    * IsApplyConsumerCollection: Boolean(是否收取消費通知)
    * IsApplyEaper: Boolean(是否收取Debit卡電子活動通知 )
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)

### 取得補寄Debit卡交易明細單資訊

* API URL: /api/DebitCard/GetResendStmtInfo
* Input:
    * ID: String (身份證字號)
* Output:
    * Email: String (Debit卡交易明細單寄送信箱)
    * BillMonth: String[] (電子帳單日期，格式 yyyy/MM/dd HH:mm:ss，抓最近6個月。)
* ResultCode:
    * 00: 成功
    * 01: 取得使用者 Email 失敗

### 補寄Debit卡交易明細單

* API URL: /api/DebitCard/ResendStatement
* Content: (Request 參數)
    * ID: String (身份證字號)
    * DateYYYYMM: String (帳單年月)
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)

## 虛擬卡

### 檢查是否可以申辦虛擬卡

* API URL: /api/ApplyCard/CanApplyVirtaulCard
* Content: (Request 參數)
	* ID: String (身份證字號)
	* EMBOSSING_TYPE: String (無限卡/世界卡的卡別，3碼。未指定時，表示客戶必須同時擁有無限卡/世界卡)
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)
	* 00 - 成功
	* 01 - 非無限卡/世界卡持卡人
	* 02 - 傳入EMBOSSING_TYPE的值不正確

### 檢查是否為「虛擬卡」核卡人

* API URL: /api/Apply/CheckVirtualCard
* Content: (Request 參數)
	* ID: String (身份證字號)
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)
	* 00 - 成功
	* 01 - 您沒有有效虛擬卡

### 取得虛擬卡卡片清單

* API URL: /api/Apply/GetVirtualCardList
* Content: (Request 參數)
	* ID: String (身份證字號)
* Result: (Response 結果)
    * Items: Object[] (多筆的卡片資料)
        * CardNo: String (卡號)
        * Name: String (卡片名稱)
        * CardTypeCode: String (TYPE，主附卡代碼)
        * CardTypeDesc: String (主卡或附卡)
        * CardFace: String (EMBOSSING_TYPE)
        * ProductCode: String (PROD_CODE，卡別)
		* ExpDate: String (有效期限 - 欄位格式【MMYY】)
	* IsGreePassCustomer: Boolean (是否藉由綠色通關(卡利達)進件的客戶)
* ResultCode: (Response 結果代碼)
	* 00 - 成功
	* 01 - 您沒有有效虛擬卡

### 查詢虛擬卡的相關資訊

* API URL: /api/Apply/QueryVirtualCardInfo
* Content: (Request 參數)
	* ID: String (身份證字號)
	* CardNoList: String[] (卡號清單)
	* QuestionNo: Number (知識性問答的題目編號。1:新台幣帳單繳款方式是否為自動扣款; 2:帳單寄送方式是否為電子帳單)
	* Answer: Boolean (知識性問答的答案)
* Result: (Response 結果)
	* Items: Object[] 虛擬卡清單
        * CardName: string (卡片名稱)
        * CardTypeName: string (國際組織/卡別)
        * CardNo: string (卡號)
        * ExpDate: string (有效期限 - 欄位格式【MMYY】)
        * CVV2: string (信用卡安全碼)
        * CName: string (中文姓名)
        * EName: string (英文姓名)
        * PermanentCreditLimit: Number (卡人永久信用額度)
        * CreditLimit: Number (卡片目前額度)
        * IsActived: Boolean (是否已開卡)
        * CreditAvailable: Number (卡片可用餘額)
		* ProductCode: string (卡別)
		* CardFace: string (卡面)
* ResultCode: (Response 結果代碼)
	* 00 - 成功
	* 01 - 驗證失敗
	* 02 - 卡號不正確
	* 03 - 查無有效的虛擬卡號資訊

### 取得虛擬卡的相關資訊

* API URL: /api/Apply/GetVirtualCardInfo
* Content: (Request 參數)
	* ID: String (身份證字號)
	* CardNoList: String[] (卡號清單)
* Result: (Response 結果)
	* Items: Object[] 虛擬卡清單
        * CardName: string (卡片名稱)
        * CardTypeName: string (國際組織/卡別)
        * CardNo: string (卡號)
        * ExpDate: string (有效期限 - 欄位格式【MMYY】)
        * CVV2: string (信用卡安全碼)
        * CName: string (中文姓名)
        * EName: string (英文姓名)
        * PermanentCreditLimit: Number (卡人永久信用額度)
        * CreditLimit: Number (卡片目前額度)
        * IsActived: Boolean (是否已開卡)
        * CreditAvailable: Number (卡片可用餘額)
* ResultCode: (Response 結果代碼)
	* 00 - 成功
	* 02 - 卡號不正確
	* 03 - 查無有效的虛擬卡號資訊

### 虛擬卡開卡

* API URL: /api/Apply/VirtualCardActivation
* Content: (Request 參數)
	* ID: String (身份證字號)
	* CardNo: String (信用卡號)
	* ValidDate_MMYY: String (卡片效期 - 欄位格式【MMYY】)
* Result: (Response 結果)
	* CardNo: String (卡號)
	* RE_CODE: String (WB09 回覆碼)
* ResultCode: (Response 結果代碼)
	* 00 - 成功

### 虛擬卡額度調整

* API URL: /api/Finance/VirtualCardPermAdjApply
* Content: (Request 參數)
	* CardNo: String (信用卡號)
	* CrLine: String (調整額度，需以千元為單位)
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)
	* 00 - 成功

### 檢查是否可以申辦財富無限卡

* API URL: /api/ApplyCard/CanApplyWealthUnlimiteCard
* Content: (Request 參數)
	* ID: String (身份證字號)
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)
	* 00 - 成功
	* 01 - 不符「永豐財富無限卡」申辦資格

### 檢查是否重複申請卡片

* API URL: /api/ApplyCard/DupCheck
* Content: (Request 參數)
	* ID: String (身份證字號)
	* CardFace: number (CardFace)
	* IsTwoFactorAuth: boolean (是否為雙因驗證)
* Result: (Response 結果)
* ResultCode: (Response 結果代碼)
	* 00 - 成功
	* 01 - 申辦卡別重複









