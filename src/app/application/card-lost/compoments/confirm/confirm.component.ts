import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService, ErrorPageService } from 'app/shared/shared.module';
import { LostCard, LostCardItem } from '../../services/lost-cards-models';
import { CardLostService } from '../../services/card-lost.service';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
	SelectedCard: LostCard;
	Cards: LostCardItem[];

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private cardLostService: CardLostService,
		private errorPageService: ErrorPageService
	) {
	}

	ngOnInit() {
		if ($('.notice-block b').hasClass('active')) {
			$('.notice-block .notice-desc').slideToggle();
		}
		this.route.data.subscribe(data => {
			this.SelectedCard = data.SelectedCard;
			this.Cards = this.SelectedCard.Cards.filter(it => it.IsSelected);
		});
	}

	toggle(event) {
		$(event.target).toggleClass('active').siblings('.notice-desc').slideToggle();
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	async submit() {
		const cards = this.SelectedCard.Cards.filter(x => x.IsSelected).map(x => x.CardNo);
		const response = await this.cardLostService.ApplyLostCards(cards);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.ApplyLostCardResult = response.Result;
				this.wizardService.GoToNextStep();
			});
		}
	}
}
