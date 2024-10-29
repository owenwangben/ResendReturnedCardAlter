import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IsFromApp } from 'app/shared/utilities';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-complete',
	templateUrl: './complete.component.html',
	styles: [`
		@media (max-width: 960px)
		.icon-error {
			width: 6.0416666667vw;
			height: 6.0416666667vw;
		}
		.icon-error {
			display: inline-block;
			width: 58px;
			height: 58px;
			background: url(/mma8/card/images/icon-no-bordered.svg) no-repeat center center;
			background-size: 100% 100%;
		}
	`]
})
export class CompleteComponent implements OnInit {
	success: boolean;
	c3mode: boolean;
  errCode: string;
	IsMobile = environment.IsMobile;
	public isApp = IsFromApp();

	constructor(private route: ActivatedRoute) {
		this.route.queryParams.subscribe(params => {
			this.success = params.rc !== '1';
			this.c3mode = params.mode === '2';
      this.errCode = params.code;
		});
	}

	ngOnInit() {
	}

	ExitWebView() {
		window['ExitWebview']();
	}
}
