import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/page-info.service';
import { SharedService } from 'app/shared/shared.module';

@Component({
	selector: 'app-housefun',
	templateUrl: './housefun.component.html'
})
export class HouseFunComponent implements OnInit {

	constructor(
		public pageinfo: PageInfoService,
		private service: SharedService
	) {}

	async ngOnInit() {
		await this.service.ClearAuth();
	}
}
