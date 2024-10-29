import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';
import { AnnualfeeService } from "./annualfee.services";
import { Annualfee } from "./annualfee.models";

@Component({
	moduleId: module.id,
	selector: 'app-annualfee',
	templateUrl: './annualfee.component.html'
})
export class AnnualfeeComponent implements OnInit {
	model: Annualfee;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.model = data.data;
		});
	}
}
