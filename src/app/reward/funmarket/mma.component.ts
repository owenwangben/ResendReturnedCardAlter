import { Component, OnInit } from '@angular/core';
import { ErrorPageService, PageInfoService, SharedService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-funmarket-mma',
	templateUrl: './mma.component.html',
	styleUrls: ['./funmarket.css']
})
export class FunMarketMMAComponent implements OnInit {
	agreement = false;

	constructor(
		public pageinfo: PageInfoService,
		private service: SharedService
	) {
	}

	async ngOnInit() {
		await this.service.ClearAuth();
	}
}
