/**查詢卡片退回資訊 - 回應結果 */
export class ResendReturnedCardGetDataResultModel {
    /**卡片清單 */
    Items: sp_CampaignCallList_Resend_Request_Item[];
}

/**卡退系統–重寄申請(回傳資料) */
export interface sp_CampaignCallList_Resend_Request_Item {
    /**身份證 */
    ID: string;

    /**卡號 */
    CardNo: string;

    /**卡片名稱(客戶姓名=附卡人：主卡，客戶姓名 != 附卡人：附卡) */
    CardName: string;

    /**住家地址 */
    HomeAddr: string;

    /**公司地址 */
    CompanyAddr: string;

    /**戶籍地址 */
    RegisterAddr: string;

    /**是否選擇(僅用於 UI) */
    Selected: boolean;
}

/**卡片退回重寄 - 請求資料 */
export class ResendReturnedCardApplyRequestModel {
    /**身份證字號 */
    ID: string;

    /**卡號清單 */
    Cards: string[];

    /**地址種類(1-現居, 2-公司, 3-戶籍, 4-其他地址) */
    AddrType: string;

    /**其他地址的郵遞區號(最多5碼) */
    OtherZip: string;

    /**其他地址 */
    OtherAddr: string;
}
