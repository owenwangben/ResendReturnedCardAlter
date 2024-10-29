import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep, ErrorPageService, ErrorPageButton } from 'app/shared/shared.module';
import { AnnouncementsComponent } from './compoments/announcements/announcements.component';
import { CardChooseStep1Component} from './compoments/card-choose-step1/card-choose-step1.component';
import { CardChooseStep2Component } from './compoments/card-choose-step2/card-choose-step2.component';
import { ConfirmComponent} from './compoments/confirm/confirm.component';
import { ApplyResultComponent } from './compoments/apply-result/apply-result.component';
import { CardLostService } from './services/card-lost.service';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-card-lost',
	templateUrl: './card-lost.component.html'
})
export class CardLostComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	step: number;
	homeUrl: string;
	public readonly isMobile = environment.IsMobile;
	constructor(
		public pageinfo: PageInfoService,
		private cardLostService: CardLostService,
		private errorPageService: ErrorPageService
		) { }

	async ngOnInit() {
		this.steps = [
			{StepName: '信用卡掛失注意事項', Component: AnnouncementsComponent, StepNo: 0},
			{StepName: '選擇掛失卡片類別', Component: CardChooseStep1Component, StepNo: 1},
			{StepName: '選擇正卡/附卡', Component: CardChooseStep2Component, StepNo: 2},
			{StepName: '確認掛失內容', Component: ConfirmComponent, StepNo: 3},
			{StepName: '申請結果', Component: ApplyResultComponent, StepNo: 4}
		];

		const response = await this.cardLostService.QueryLostCards();
		if (this.errorPageService.validateResponse(response, { redirect: true })) {
			if (response.Result.Items.length > 10) {
				const msg = '由於您持卡數過多，請直接撥打客服 02-25287776，由專人為您服務';
				if (this.isMobile) {
					const buttons: Array<ErrorPageButton> = [{ caption: '聯絡客服', href: 'tel:0225287776', link: '' }];
					this.errorPageService.display(msg, true, undefined, buttons);
				}
				else {
					this.errorPageService.display(msg, true, undefined);
				}
			}
		}
	}
}
