import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewModels, GetStmtInstallmentDataResult } from '../../services/typings';

@Component({
	selector: 'app-choose-statement-installment',
	templateUrl: './choose-statement-installment.component.html'
})
export class ChooseStatementInstallmentComponent implements OnInit {
	info: GetStmtInstallmentDataResult;

	constructor(
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			const installment: ViewModels.StatementInstallmentData = data.data;
			this.info = installment.Info;
		});
	}
}
