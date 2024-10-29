import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-temp-cli-display',
	templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
	data: TemporaryCreditViewModel;
	applyReasonDisplay: string;

	constructor(public route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			this.data = data.data;
			const reasonOptions = data.reasonOptions;
			for (const option of reasonOptions) {
				if (option.key === this.data.Reason) {
					this.applyReasonDisplay = option.value;
				}
			}
		});
	}

	getTotalCredit(): number {
		const n1 = this.data.AvailableCredit ? +this.data.AvailableCredit : 0;
		const n2 = this.data.IncreaseCredit ? +this.data.IncreaseCredit : 0;
		return n1 + n2;
	}

	filterChecked(cards: CreditCard[]) {
		const result = [];
		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];
			if (card.IsChecked === true) {
				result.push(card);
			}
		}
		return result;
	}
}
