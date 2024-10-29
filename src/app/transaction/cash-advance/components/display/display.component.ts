import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransformTo } from 'app/shared/decorators/transform-to.decorator';
import { ApplyCashAdvanceViewModel } from '../../services/cash-advance.model';

@Component({
	selector: 'app-cash-advance-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
	@TransformTo(ApplyCashAdvanceViewModel) formData: ApplyCashAdvanceViewModel;
	bankDisplayName: string;
	branchDisplayName: string;
	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.formData = data.form;
			this.bankDisplayName = data.bankDisplayName;
			this.branchDisplayName = data.branchDisplayName;
		});
	}
}
