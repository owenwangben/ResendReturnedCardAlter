import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-reward-redemption-secondmenu',
	templateUrl: './second-menu.component.html'
})
export class SecondMenuComponent implements OnInit {
	@Input() showCartMenu = true;

	constructor() {
	}

	ngOnInit() {
	}
}
