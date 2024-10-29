import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ApplyPage1Component } from './component/apply-page1/apply-page1.component';
import { ApplyPage2Component } from './component/apply-page2/apply-page2.component';

@Component({
	selector: 'app-apply',
	templateUrl: './apply.component.html',
	styles: []
})
export class ApplyComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	step: number;
	homeUrl: string;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private idle: Idle,
		private keepalive: Keepalive
	) { }

	async ngOnInit() {
		this.route.data.subscribe(data => {
			this.step = data.step;
			if (this.step >= 0) {
				this.steps = [
					{ StepName: '資料填寫1', Component: ApplyPage1Component },
					{ StepName: '資料填寫2', Component: ApplyPage2Component }
				];
				this.current = this.step;
				this.homeUrl = "/DebitCard/Apply";
			};
		});
	}
}
