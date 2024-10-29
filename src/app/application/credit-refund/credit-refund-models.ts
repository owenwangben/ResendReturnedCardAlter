export class CreditRefundGetDataResultModel {
	/** 本行帳號清單 */
	Accounts: string[];
	/** 溢繳款餘額 */
	Balance: number;
	/** 姓名 */
	Name: string;
	/**實際溢退金額 */
	RefundAMT: number;
}

export class CreditRefundApplyRequestModel {
	/** 身分證字號 */
	ID: string;

	/** 轉入行庫代號 */
	TransBankCode: string;

	/** 轉入分行代號  */
	TransBranchCode: string;

	/** 轉入行庫帳號 */
	TransAccount: string;

	/** 是否同意領回溢繳款時需負擔手續費 */
	Agree: boolean;

	/** 轉入行庫名稱 */
	TransBankName: string;

	/** 轉入分行名稱 */
	TransBranchName: string;
}

export const CanRefundBanks = [
'004', // 臺灣銀行
'822', // 中國信託
'017', // 兆豐商銀
'013', // 國泰世華
'007', // 第一銀行
'808', // 玉山銀行
'012', // 台北富邦
'008', // 華南銀行
'009', // 彰化銀行
'812', // 台新銀行
'011', // 上海銀行
'021', // 花旗銀行
'806', // 元大銀行
'103', // 臺灣新光銀行
'805', // 遠東銀行
'803', // 聯邦銀行
'108', // 陽信銀行
'810', // 星展(台灣)銀行
'816', // 安泰銀行
'016', // 高雄銀行
'118', // 板信銀行
'815', // 日盛銀行
'054', // 京城銀行
'101', // 瑞興銀行
'102', // 華泰銀行
'146', // 台中二信
'216', // 花蓮二信
'162', // 彰化六信
'052', // 英商渣打銀行-竹銀
'809', // 凱基銀行
'048', // 王道銀行
'952', // 南農中心
];
