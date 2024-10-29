import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplyLostCardsResult } from '../../services/lost-cards-models';
import { WizardService, ErrorPageService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { CardLostService } from '../../services/card-lost.service';

@Component({
	selector: 'app-apply-result',
	templateUrl: './apply-result.component.html'
})
export class ApplyResultComponent implements OnInit {
	isMobile = environment.IsMobile;
	model: ApplyLostCardsResult;
	msg: string;
	notice: string;
	success: boolean;
	canReApplyAnotherCard = false;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private cardLostService: CardLostService,
		private errorPageService: ErrorPageService
	) { }

	ngOnInit() {
		this.route.data.subscribe(async (data) => {
			this.model = data.ApplyLostCardResult;
			if (this.model.Cards.filter(x => x.IsSuccess).length === this.model.Cards.length) {
				this.success = true;
				this.notice = '如您有補發新卡之需求或欲查詢卡片狀態，請致電本行客服專線02-25287776，由客服人員協助您作進一步之確認。如有不便來電之情形，亦可攜帶身分證至就近分行，由分行人員協助您聯繫處理。';
				if (!this.model.HasTransactionHistory) {
					// 掛失成功
					this.msg = '';
				}
				else {
					// 掛失成功, 但掛失完成前24小時內有交易紀錄
					this.msg = '您所掛失的卡號於掛失完成前24小時內有交易紀錄，如有疑義，請您電洽本行客服專線 02-25287776，由客服人員協助您進行進一步確認。';
				}
			}
			else if (this.model.Cards.filter(x => !x.IsSuccess).length > 0) {
				this.success = false;
				this.notice = '如再次操作仍無法掛失完成，請致電本行客服專線02-25287776，由客服人員協助您完成掛失之處理。';
				if (this.model.Cards.filter(x => !x.IsSuccess).length === this.model.Cards.length) {
					// 掛失作業全部失敗
					this.msg = '您的掛失作業失敗，請返回網路掛失頁面重新操作。';
				}
				else {
					// 掛失作業有部分失敗
					this.msg = '您的掛失作業有部分失敗，請返回網路掛失頁面重新操作。';
				}
			}

			if (this.success && this.model.NoHandlingFee) {
				this.errorPageService.display('為了感謝貴用戶長期對本行的支持，將為您減免本次掛失所產生的費用。謝謝。', false);
			}

			// 檢查是否可返回選擇卡片掛失頁面(必須仍持有有效卡才能進行掛失作業)
			const response = await this.cardLostService.QueryLostCards();
			this.canReApplyAnotherCard = (response.ResultCode === "00" && response.Result.Items.length > 0);
		});
	}

	goStart() {
		if (this.success) {
			const msg = "若您仍需要掛失多張卡片，歡迎撥打客服 02-25287776 ，由客服直接為您服務";
			this.errorPageService.confirm(msg, "再掛一張", "聯絡客服", (ok) => {
				if (ok) {
					// 返回選擇卡片掛失頁面
					this.wizardService.GoToStep(1);
				}
				else {
					if (this.isMobile) {
						location.href = 'tel:02-25287776';
					}
					else {
						location.href = 'https://bank.sinopac.com/MMA8/bank/service/livechat_index.html?department=1&site=mma';
					}
				}
			});
		}
		else {
			// 返回選擇卡片掛失頁面
			this.wizardService.GoToStep(1);
		}

	}
}
