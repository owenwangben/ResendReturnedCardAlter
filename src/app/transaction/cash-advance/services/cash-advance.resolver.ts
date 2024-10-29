import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService, ErrorPageButton } from 'app/shared/shared.module';
import { CashAdvanceService } from './cash-advance.service';
import { environment } from 'environments/environment';

@Injectable()
export class CashAdvanceResolver implements Resolve<any> {
	// mobile setup
	public readonly isMobile = environment.IsMobile;
	constructor(
		private errorPageService: ErrorPageService,
		private cashAdvanceService: CashAdvanceService
	) {
	}
	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.cashAdvanceService.GetCashAdvanceApplyInfo();
		// 檢查信用卡資格
		if (response.ResultCode === "04") {
			if (this.isMobile) {
				const buttons: Array<ErrorPageButton> = [{ caption: '聯絡客服', href: 'tel:0225287776', link: '' }];
				this.errorPageService.display('親愛的卡友您好，<br>您目前的本行卡片均無預借現金功能，若有疑問，請詳洽客服 02-25287776', true, undefined, buttons);
			}
			else {
				this.errorPageService.display('親愛的卡友您好，<br>您目前的本行卡片均無預借現金功能，若有疑問，請詳洽客服 02-25287776', true, undefined);
			}
		}
		else if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}
