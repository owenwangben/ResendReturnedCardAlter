import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-perm-cli-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
	data: PermanentCreditViewModel;
	applyReasonDisplay: string;
	isRequireFinancialProof = true;
	constructor(public route: ActivatedRoute) { }

	ngOnInit() {
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
		const n1 = this.data.OriginalCredit ? +this.data.OriginalCredit : 0;
		const n2 = this.data.IncreaseCredit ? +this.data.IncreaseCredit : 0;
		return n1 + n2;
	}
}
