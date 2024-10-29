import { Component, OnInit } from '@angular/core';
import { ErrorPageService, WizardStep } from 'app/shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { VerificationComponent } from './verification/verification.component';
import { CompleteComponent } from './complete/complete.component';
import { RedemptionService } from '../../services/redemption.services';

@Component({
	selector: 'app-reward-redemption-redeem',
	templateUrl: './redeem.component.html'
})
export class RedeemComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor() {
	}

	ngOnInit() {
		this.steps = [
			{ StepName: '兌換清單', Component: CartComponent },
			{ StepName: '核對身分', Component: VerificationComponent },
			{ StepName: '兌換結果', Component: CompleteComponent }
		];
	}
}
