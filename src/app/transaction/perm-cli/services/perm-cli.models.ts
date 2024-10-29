/** 永調申請金檢資料log*/
export class PermCLILogRequestModel {
	/**OTP數值 */
	OTPCellNo: string = "";

	/**OTP發送時間 yyyyMMddHHmmss */
	OTPReqDT: string = "";

	/**OTP驗證時間 yyyyMMddHHmmss */
	OTPRespDT: string = "";
}
