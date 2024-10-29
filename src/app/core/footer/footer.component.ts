import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';

@Component({
	moduleId: module.id,
	selector: 'app-footer',
	templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
	url = environment.footer;

	constructor(private pageinfo: PageInfoService) { }

	get hidden(): boolean {
		return !this.pageinfo.header;
	}

	ngOnInit() {
	}
}
