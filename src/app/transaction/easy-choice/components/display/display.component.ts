import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalCycleFeeECModel, ApplyECModel } from '../../services/easy-choice.model';

@Component({
	selector: 'app-easy-choice-display',
	templateUrl: './display.component.html',
})
export class DisplayComponent implements OnInit {
	@Input("showAccount") showAccount: Boolean = false;
	calCycleFeeECModel: CalCycleFeeECModel;
	applyECModel: ApplyECModel;
	bankDisplayName: string;
	branchDisplayName: string;

	constructor(private route: ActivatedRoute) {
		this.route.data.subscribe(data => {
			this.calCycleFeeECModel = data.calCycleFeeECModel;
			this.applyECModel = data.applyECModel;
			this.bankDisplayName = data.bankDisplayName;
			this.branchDisplayName = data.branchDisplayName;
		});
	}

	ngOnInit() {
	}
}
