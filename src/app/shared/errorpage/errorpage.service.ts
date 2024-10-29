import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { PageInfoService } from '../page-info.service';
import { BaseResponse } from '../webapi.invoker';
import swal from 'sweetalert2';

@Injectable()
export class ErrorPageService {
	public funcName: string;
	public errMessage: string;
	public buttons: Array<ErrorPageButton>;

	constructor(
		private router?: Router,
		private pageInfo?: PageInfoService
	) {
	}

	public display(errMessage: string, redirect: boolean, onclose?: () => void, buttons?: Array<ErrorPageButton>,
		confirmBtnText = '確定',ExternalLink?) {
		if (redirect === false) {
			if (!ExternalLink) {
				swal({ html: errMessage, confirmButtonText: confirmBtnText }).catch(swal.noop).then(onclose);
			}
			else{
				swal({ html: errMessage, confirmButtonText: confirmBtnText }).catch(swal.noop).then(
					function(isConfirm)
					{if(isConfirm){ window.location.href = ExternalLink;}}
					);
			}
		}
		else {
			this.funcName = this.pageInfo.name;
			this.errMessage = errMessage;
			this.buttons = buttons;
			this.router.navigate(["/ErrorPage"]);
		}
	}

	public validateResponse(
		response: BaseResponse<any>,
		options?: { errMessage?: string, redirect?: boolean, showMessage?: boolean },
		confirmBtnText = '確定'
	): boolean {
		if (response.ResultCode !== "00") {
			if (!options || options.showMessage !== false) {
				this.display(
					options && options.errMessage || response.ResultMessage,
					options && options.redirect, null, null, confirmBtnText
				);
			}
			return false;
		}
		return true;
	}

	/**
	 *
	 * @param message 訊息
	 * @param confirmButtonText 確認按鈕文字
	 * @param cancelButtonText 取消按鈕文字
	 * @param onclose 關閉訊息框後要執行的 function
	 * @param showCancelButton 是否顯示取消按鈕
	 * @param reverseButtons 是否反轉確認及取消按鈕
	 * @param title 彈窗標題
	 */
	public confirm(message, confirmButtonText, cancelButtonText, onclose?: (ok) => void, showCancelButton = true, reverseButtons = false, title = "") {
		swal({
			html: message,
			confirmButtonText: confirmButtonText,
			cancelButtonText: cancelButtonText,
			showCancelButton: !!cancelButtonText,
			reverseButtons: reverseButtons,
      title: title
		}).catch(swal.noop).then(onclose);
		return false;
	}

	/**
	 * 以 confirm 來進行修改，只是變更按鈕的樣式
	 *
	 * @param message 訊息
	 * @param confirmButtonText 確認按鈕文字
	 * @param cancelButtonText 取消按鈕文字
	 * @param onclose 關閉訊息框後要執行的 function
	 * @param showCancelButton 是否顯示取消按鈕
	 * @param reverseButtons 是否反轉確認及取消按鈕
	 */
	 public confirm2(message, confirmButtonText, cancelButtonText, onclose?: (ok) => void, showCancelButton = true, reverseButtons = false) {
		swal({
			html: message,
			confirmButtonText: confirmButtonText,
			cancelButtonText: cancelButtonText,
			confirmButtonColor: '#F5F5F5',
			confirmButtonClass: 'swalConfirmClass',
			cancelButtonColor: 'green',
			cancelButtonClass: 'swalCancelClass',
			showCancelButton: !!cancelButtonText,
			reverseButtons: reverseButtons
		}).catch(swal.noop).then(onclose);

		$('.sweet-alert button.cancel').css('background-color','black')
		return false;
	}

  public MyDataCardVerifyConfirm(func){
    this.confirm('請先準備讀卡機與晶片金融卡，以完成晶片金融卡驗證。', '確定', '下次再說', func, true, true )
  }
}

export class ErrorPageButton {
	public caption: string;
	public href: string;
	public link: string;
}
