import { Component, OnInit } from '@angular/core';
import { MemoryStorage } from '../../shared/shared.module';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-apply',
	templateUrl: './apply.component.html',
	styles: []
})
export class ApplyComponent implements OnInit {
	token: string;
	language;
	messages;
	confirmMessages;
	buttonMesages;

	constructor(private storage: MemoryStorage,
		private router: Router) {
		this.token = this.storage.Token;
	}

	ngOnInit() {
		this.language = GetLanguage();
		this.confirmMessages = LocaleMessages[this.language].ConfirmMessage;
		this.buttonMesages = LocaleMessages[this.language].Button;
		this.messages = LocaleMessages[this.language].Apply;
	}

	goApplyCard() {
		this.confirm(this.confirmMessages.Exit, this.buttonMesages.OK, this.buttonMesages.Cancel, (ok) => {
			if (ok) {
				this.router.navigate(["/Application/ApplyCard"]);
			}
		});
	}

	/**
	 *
	 * @param message 訊息
	 * @param confirmButtonText 確認按鈕文字
	 * @param cancelButtonText 取消按鈕文字
	 * @param onclose 關閉訊息框後要執行的 function
	 */
	public confirm(message, confirmButtonText = "確定", cancelButtonText = "取消", onclose?: (ok) => void) {
		swal({
			html: message,
			confirmButtonText: confirmButtonText,
			cancelButtonText: cancelButtonText,
			showCancelButton: true,
			reverseButtons: true
		})
			.catch(swal.noop)
			.then(onclose);
		return false;
	}
}
