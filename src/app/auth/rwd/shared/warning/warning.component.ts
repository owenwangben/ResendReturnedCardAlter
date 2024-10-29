import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';

@Component({
	selector: 'app-auth-warning',
	templateUrl: './warning.component.html'
})
export class AuthWarningComponent implements OnInit {
	public constructor() { }

	public async ngOnInit() {
	}
}
