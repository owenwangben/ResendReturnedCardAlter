import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-rwd-footer',
	templateUrl: './rwd-footer.component.html',
	styleUrls: []
})
export class RwdFooterComponent implements OnInit {

	@Input() ieBrowser = true;
	constructor() { }

	ngOnInit() {
	}

}
