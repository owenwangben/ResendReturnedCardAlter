import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-temp-cli-status',
	templateUrl: './temp-cli-status.component.html'
})
export class TempCLIStatusComponent implements OnInit {
	IsMobile = environment.IsMobile;
	Records: TempCliStatus[];

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.Records = data.data.Items;
		});
	}
}
