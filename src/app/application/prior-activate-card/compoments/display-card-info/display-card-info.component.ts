import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { CardInfo } from '../../services/prior-activate-card-model';
import { PriorActivateCardService } from '../../services/prior-activate-card.service';

@Component({
	selector: 'app-display-card-info',
	templateUrl: './display-card-info.component.html',
	styles: []
})
export class DisplayCardInfoComponent implements OnInit {
	typeface: string;
	model: CardInfo;
	cardImagePath = "";
	hideSensitiveData = false;
  submitted = false;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private dataService: PriorActivateCardService
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.model = data.model;
			this.cardImagePath = data.cardImagePath;

			if (!this.model) {
				this.route.params.subscribe(async (params) => {
					this.typeface = params.TypeFace;
					const response = await this.dataService.QueryPriorActivateCardInfo(this.typeface);
          if (this.errorPageService.validateResponse(response, { redirect: false })) {
						this.model = response.Result.Items[0];
						this.cardImagePath = '/mma8/card/images/cardfaces/' + this.typeface + '.png';
					}
				});
			}
		});
	}

	async onSubmit() {
    this.submitted = true;
		const response = await this.dataService.PriorActivateCard(this.model.ProductCode, this.model.CardFace, this.model.CardNo);
    this.route.data.subscribe(data => {
      this.model.IsPriorActivated = (response.ResultCode === "00");
      data.model = this.model;
      data.typeface = this.typeface;
    });
    this.wizardService.GoToNextStep();
    this.submitted = false;
	}

	toggleSensitiveData() {
		this.hideSensitiveData = !this.hideSensitiveData;
	}
}
