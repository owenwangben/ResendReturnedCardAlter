import { Component, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
	moduleId: module.id,
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	providers: [BreadcrumbsService]
})
export class BreadcrumbsComponent {
	@Output() loadComplete = new EventEmitter();
	public breadcrumbs: SafeHtml;
	public commonfunction: SafeHtml;
	public navigated: boolean;

	public constructor(
		private sanitizer: DomSanitizer,
		private service: BreadcrumbsService,
		private router: Router
	) {
		if (!environment.IsMobile) {
			service.BreadcrumbResponse.subscribe(item => {
				this.breadcrumbs = sanitizer.bypassSecurityTrustHtml(item.Breadcrumbs);
				this.commonfunction = sanitizer.bypassSecurityTrustHtml(item.CommonFunction);
				this.loadComplete.emit(item);
			});
		}

		this.router.events.subscribe(evt => {
			if (evt instanceof NavigationStart) {
				this.navigated = false;
			}
			else if (evt instanceof NavigationEnd) {
				this.navigated = true;
			}
		});
	}
}
