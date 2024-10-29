import { Component, OnInit, Input } from '@angular/core';
import { LocaleMessages, GetLanguage } from './LocaleMessages';

@Component({
	selector: 'app-mobile-statement-nav',
	templateUrl: './mobile-statement-nav.component.html',
	styles: []
})
export class MobileStatementNavComponent implements OnInit {
	@Input() Index: number;
	@Input() Token: string;
	language;
	messages;
	menuTextStyles: string;
	constructor() { }

	ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].Nav;
		this.menuTextStyles = LocaleMessages[this.language].Nav.MenuTextStyles;
	}
}
