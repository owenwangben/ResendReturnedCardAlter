import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService, ErrorPageService } from 'app/shared/shared.module';
import { LostCardItem, LostCard } from '../../services/lost-cards-models';

@Component({
	selector: 'app-card-choose-step2',
	templateUrl: './card-choose-step2.component.html',
})
export class CardChooseStep2Component implements OnInit {
	SelectedCard: LostCard;
	PrimaryCard: LostCardItem[];
	SupplmentaryCard: LostCardItem[];
	isCheckPrimaryCard = false;
	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService
	) {
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.SelectedCard = data.SelectedCard;
			this.PrimaryCard = this.SelectedCard.Cards.filter(x => x.CardTypeCode !== 'NP');
			this.SupplmentaryCard = this.SelectedCard.Cards.filter(x => x.CardTypeCode === 'NP');
			this.isCheckPrimaryCard = (this.PrimaryCard.filter(x => x.IsSelected).length > 0);
		});

		if ($('.notice-block b').hasClass('active')) {
			$('.notice-block .notice-desc').slideToggle();
		}
	}

	toggle(event) {
		$(event.target).toggleClass('active').siblings('.notice-desc').slideToggle();
	}

	onCheckPrimaryCard() {
		this.isCheckPrimaryCard = !this.isCheckPrimaryCard;
		this.SupplmentaryCard.forEach(x => x.IsSelected = this.isCheckPrimaryCard);
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	submit() {
		if (this.PrimaryCard.filter(x => x.IsSelected).length === 0 &&
			this.SupplmentaryCard.filter(x => x.IsSelected).length === 0) {
				this.errorPageService.display('請勾選您欲掛失的卡片', false);
		}
		else if (this.PrimaryCard.filter(x => x.IsSelected).length > 0 &&
			this.SupplmentaryCard.filter(x => x.IsSelected).length < this.SupplmentaryCard.length) {
				this.errorPageService.display('若您欲掛失正卡，請一併勾選所有附卡。', false);
		}
		else {
			this.wizardService.GoToNextStep();
		}
	}
}
