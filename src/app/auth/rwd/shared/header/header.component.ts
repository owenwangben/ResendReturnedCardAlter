import { Component, OnInit, Input } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';
import { IsFromApp } from 'app/shared/utilities';

@Component({
	selector: 'app-auth-header',
	templateUrl: './header.component.html'
})
export class AuthHeaderComponent implements OnInit {
	public IsApp: boolean;

	@Input()
	MasterTitleIntl: string;

	public constructor(public pageinfo: PageInfoService) {
		this.IsApp = !!IsFromApp();
	}

	public async ngOnInit() {
	}
}
