import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-perm-cli-status',
	templateUrl: './perm-cli-status.component.html'
})
export class PermCLIStatusComponent implements OnInit {
	Records: PermCliStatus[];

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.Records = data.data.Items;
		});
	}
}
