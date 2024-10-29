import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService, ErrorPageService } from 'app/shared/shared.module';
import { CardLostService } from '../../services/card-lost.service';
import { QueryLostCardsResult, LostCard } from '../../services/lost-cards-models';

@Component({
	selector: 'app-card-choose-step1',
	templateUrl: './card-choose-step1.component.html'
})
export class CardChooseStep1Component implements OnInit {
	model: QueryLostCardsResult;
	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private cardLostService: CardLostService,
		private errorPageService: ErrorPageService
	) {
	}

	async ngOnInit() {
		const response = await this.cardLostService.QueryLostCards();
		if (this.errorPageService.validateResponse(response, { redirect: true })) {
			this.model = response.Result;
			this.model.Items = this.model.Items.map(x => {
				const item = x;
				item.PrimaryCardCount = item.Cards.filter(y => y.CardTypeCode !== 'NP').length;
				item.SupplmentaryCardCount = item.Cards.filter(y => y.CardTypeCode === 'NP').length;
				return item;
			});
		}

		if ($('.notice-block b').hasClass('active')) {
			$('.notice-block .notice-desc').slideToggle();
		}
	}

	toggle(event) {
		$(event.target).toggleClass('active').siblings('.notice-desc').slideToggle();
	}

	toggleCard(currentCard) {
		const active = $('.all-card tr.active');
		const prev = active.index();
		const current = $(currentCard).index();
		if (prev === current) {
			$(currentCard).removeClass('active');
		} else {
			active.removeClass('active');
			$(currentCard).addClass('active');
		}
	}

	submit(card: LostCard) {
		this.route.data.subscribe(data => {
			data.SelectedCard = card;
			this.wizardService.GoToNextStep();
		});
	}
}
