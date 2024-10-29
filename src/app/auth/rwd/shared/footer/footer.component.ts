import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';
import { IsFromApp } from 'app/shared/utilities';

@Component({
	selector: 'app-auth-footer',
	templateUrl: './footer.component.html'
})
export class AuthFooterComponent implements OnInit {
	public IsApp: boolean;

	public constructor() {
		this.IsApp = !!IsFromApp();
	}

	public async ngOnInit() {
	}
}
