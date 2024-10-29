import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, ErrorPageButton } from './errorpage.service';

@Component({
	selector: 'app-errorpage',
	templateUrl: './errorpage.component.html'
})
export class ErrorPageComponent implements OnInit {
	funcName: string;
	errMessage: string;
	buttons: Array<ErrorPageButton>;

	constructor(private errorPageService: ErrorPageService) {
	}

	ngOnInit() {
		this.funcName = this.errorPageService.funcName;
		this.errMessage = this.errorPageService.errMessage;
		this.buttons = this.errorPageService.buttons;
	}

	loadComplete($event) {
		// const links = $event
		// 	.replace(/((<li)|(<\/?(a|ul|div|span|input))).*?>/gi, "")
		// 	.replace(/<\/(li).*?>/gi, "|").split("|");
		// this.funcName = this.findLastLink(links);
	}

	// private findLastLink(links): string {
	// 	for (let i = links.length - 1; i >= 0; i--) {
	// 		if (links[i].trim() !== "") { return links[i]; }
	// 	}
	// 	return "";
	// }
}
