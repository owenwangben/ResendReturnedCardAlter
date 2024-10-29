import { Component, OnInit, Input } from '@angular/core';
import { GetLanguage, LocaleMessages } from './LocaleMessages';

@Component({
	selector: 'app-mobile-statement-header',
	templateUrl: './mobile-statement-header.component.html',
	styles: []
})
export class MobileStatementHeadervComponent implements OnInit {
	@Input() Title: string;
	language;
	title: string;

	constructor() { }

	ngOnInit() {
		this.language = GetLanguage();
		this.title = LocaleMessages[this.language].Header.Title;
	}
}
