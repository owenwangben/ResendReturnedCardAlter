import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';
import { ViewModels, TransactionDetail } from '../../services/typings';

@Component({
	selector: 'app-choose-installment',
	templateUrl: './choose-installment.component.html',
	styleUrls: ['./choose-installment.component.css']
})
export class ChooseInstallmentComponent implements OnInit {
	transaction: TransactionDetail;
	constructor(
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			const installment: ViewModels.InstallmentData = data.data;
			this.transaction = installment.Transactions[installment.ApplyIndex];
		});
	}
}
