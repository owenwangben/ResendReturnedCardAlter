import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermanentCreditViewModel, VirtualCardInfo } from '../../../virtual-card.models';

@Component({
	selector: 'app-virtual-card-perm-cli-display',
	templateUrl: './display.component.html',
	styles: [`
		th {
			width: 40%;
		}
	`]
})
export class DisplayComponent implements OnInit {
	data: PermanentCreditViewModel;
	cardinfo: VirtualCardInfo;
	isComplete = false;
	newLine;
	constructor(public route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.data = data.data;
			this.cardinfo = this.data.SelectedCard;
			this.isComplete = data.isComplete;
			this.newLine = data.CR_LIMIT;
		});
	}

}
