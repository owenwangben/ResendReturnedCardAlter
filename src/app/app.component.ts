import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { LoaderService, PageInfoService, SsoService } from 'app/shared/shared.module';
import { IsFromApp, SensorsRegisterPage } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
import { SsoResult } from './shared/sso.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
	public showLoader: boolean;
	public navigated = false;	// load MMA header post NavigationEnd
	public css_loaded = true;

	public constructor(
		private router: Router,
		private loader: LoaderService,
		private changeDetector: ChangeDetectorRef,
		private pageinfo: PageInfoService,
		private ssoService: SsoService,
	) {
		this.loader.Status.subscribe((val: boolean) => {
			this.showLoader = val;
		});

		this.router.events.subscribe(async evt => {
			if (evt instanceof NavigationStart) {
				this.navigated = false;
				this.changeDetector.detectChanges();
				this.loadCss();
				const sso = await this.getSsoResult();
				SensorsRegisterPage(!!sso, environment.IsMobile);
			}
			else if (evt instanceof NavigationEnd) {
				$('#overlay').remove();
				swal.close();
				this.autoScaling();
				window.scrollTo(0, 0);
				this.navigated = true;
			}
		});

		$(window).resize(() => this.autoScaling());
	}

	public ngOnInit() {
	}

	public ngAfterViewInit() {
	}

	public ngAfterViewChecked() {
		this.changeDetector.detectChanges();
	}

	private autoScaling() {
		if (this.pageinfo.css.startsWith('rwd')) {
			const $width = $(window).width(), $base = 1024, $mbl = 640;
			let $pcent;
			if ($base > $width && $width > $mbl) {
				$pcent = ($width / $base) * 100;
				$('body').css('font-size', $pcent + '%');
			}
			else if ($mbl >= $width) {
				$pcent = ($width / $mbl) * 100;
				$('body').css('font-size', $pcent + '%');
			}
			else {
				$('body').css('font-size', '');
			}
		}
		else {
			$('body').css('font-size', '');
		}
	}

	public headerComplete() {
		this.css_loaded = true;
	}

	private loadCss() {
		let folder = 'eweb';
		if (this.pageinfo.css) {
			folder = this.pageinfo.css;
		}
		else if (environment.IsMobile) {
			folder = 'mweb';
		}
		const site_styles = $('#site-styles');
		const href = '/mma8/card/css-' + folder + '/index.css';
		if (site_styles.attr('href') !== href) {
			site_styles.attr('href', href);
			this.css_loaded = false;
		}
	}

	private async getSsoResult(): Promise<SsoResult> {
		const result = await this.ssoService.getSsoResult();
		return result;
	}
	
}

