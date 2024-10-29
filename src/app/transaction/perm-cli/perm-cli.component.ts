import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardStep, PageInfoService } from 'app/shared/shared.module';
import { EditorComponent } from './components/editor/editor.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';

@Component({
	selector: 'app-perm-cli',
	templateUrl: './perm-cli.component.html'
})
export class PermCLIComponent implements OnInit {
	isHouseFun: boolean;
	current = 0;
	steps: WizardStep[];
	isFromSms = false;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute
	) {
		this.route.data.subscribe(data => this.isHouseFun = data.houseFun);
		this.route.queryParams.subscribe(params => {
			const sms = +params.sms;
			this.isFromSms = sms === 1;
		});
	}

	ngOnInit() {
		this.steps = [
			{ StepName: '填寫資料', Component: EditorComponent },
			{ StepName: '再次確認', Component: ConfirmComponent },
			{ StepName: '申請結果', Component: CompleteComponent }
		];
	}
}
