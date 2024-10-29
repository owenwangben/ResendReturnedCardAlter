import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenLightbox } from 'app/shared/utilities';
import { PageInfoService } from 'app/shared/shared.module';

@Component({
	selector: 'app-auth-select',
	templateUrl: './select.component.html'
})
export class AuthSelectComponent implements OnInit, OnDestroy {
	private returnUrl: string;

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute, private router: Router
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
			console.log(this.returnUrl);
		});
	}

	public async ngOnInit() {
		setTimeout(() => {
			OpenLightbox('#choose-auth-method');
		}, 2000);
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	public submit(method: string) {
		$('.lboxed').trigger('close');
		this.router.navigateByUrl(this.returnUrl + '/' + method);
	}
}
