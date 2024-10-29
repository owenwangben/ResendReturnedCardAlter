import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

import { GetStmtInstallmentDataResult } from '../../services/typings';

@Component({
	selector: 'app-statement-info',
	templateUrl: './statement-info.component.html'
})
export class StatementInfoComponent implements OnInit {
	@Input() info: any;
	isMobile: boolean = environment.IsMobile;
	constructor() { }

	ngOnInit() {
	}

}
