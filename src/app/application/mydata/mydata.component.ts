import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { CompleteComponent } from './components/complete/complete.component';
import { FailComponent } from './components/fail/fail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-mydata',
	templateUrl: './mydata.component.html',
	styles: []
})
export class MyDataComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	step: number = this.current;
	type: number;

	constructor(
		private route: ActivatedRoute,
		public pageinfo: PageInfoService
	) {
		this.route.params.subscribe(params => this.type = +params.type);
	}

	ngOnInit() {
		this.steps = [
			{ StepName: '驗證結果', Component: CompleteComponent, StepNo: 0 }
		];
		switch (this.type) {
			case 1:
				this.pageinfo.name = "線上辦卡";
				break;
			case 2:
				this.pageinfo.name = "上傳缺補文件";
				break;
			case 3:
				this.pageinfo.name = "永久額度調整";
				break;
			default:
				break;
		}
	}

	onWizardCurrentChange(step: number) {
		console.log('onWizardCurrentChange');
		this.step = step;
	}
}
