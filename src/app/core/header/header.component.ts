import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MemoryStorage, PageInfoService, SsoService } from 'app/shared/shared.module';
import { IsFromApp } from 'app/shared/utilities';
import { environment } from 'environments/environment';

@Component({
	moduleId: module.id,
	selector: 'app-header',
	templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
	@Output() complete = new EventEmitter();
	url: string;

	constructor(
		private storage: MemoryStorage,
		private pageinfo: PageInfoService
	) {
		const resetTimerFunctionName = 'restartExtTimer';
		if (resetTimerFunctionName in window &&	typeof window[resetTimerFunctionName] === 'function') {
			document.addEventListener('mousedown', ($evt) => window[resetTimerFunctionName]());
		}
		// Observable.merge(
		// 	Observable.fromEvent(window, 'load'),
		// 	Observable.fromEvent($('app-load-script'), 'complete')
		// ).subscribe(x => this.LoadComplete());

		const app = IsFromApp();
		if (!app || !app.includes('fun Wallet')) {
			this.url = environment.header.replace("{{UID}}", this.storage.UserId);
		}
	}

	get isMWeb(): boolean {
		return environment.IsMobile && !IsFromApp();
	}

	get hidden(): boolean {
		return !this.pageinfo.header;
	}

	ngOnInit() {
	}

	LoadComplete() {
		if (this.pageinfo.header !== null) {
			try {
				if (environment.IsMobile) {
					if (IsFromApp()) {
						window['cardsetback'](this.pageinfo.name, '');
					}
					else {
						window['setheader']('永豐銀行', this.pageinfo.name, '/m/m_menu.aspx?num=2', '');
					}
				}
				else {
					window['sendMenu']();
				}
			}
			catch (error) {
				console.error(error);
			}
		}

		this.complete.emit();
	}
}
