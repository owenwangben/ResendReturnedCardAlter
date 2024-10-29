import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardStep } from 'app/shared/shared.module';
import { CompleteComponent } from './complete/complete.component';
import { ContentComponent } from './content/content.component';
import { VerificationComponent } from './verification/verification.component';

@Component({
	selector: 'app-activity-register',
	templateUrl: './register.component.html'
})
export class ActivityRegisterComponent implements OnInit {
	current = 0;
	steps: WizardStep[] = [];
	IsVipActivity = false;

	constructor(private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.IsVipActivity = data.data.IsVipActivity;
			this.steps.push({ StepName: '核對身分', Component: VerificationComponent });
			if (data.data.IsVipActivity) {
				this.steps.push({ StepName: '活動內容', Component: ContentComponent });
			}
			this.steps.push({ StepName: '登錄結果', Component: CompleteComponent });
		});
	}
}
