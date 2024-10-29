import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';

const componentbase = {
	selector: 'app-home',
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './home.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './home.component.mobile.html'
};
const blankComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './home.component.blank.html'
};
@Component(environment.production ? blankComponent : environment.IsMobile ? mobileComponent : component)
export class HomeComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
		if (environment.home) {
			window.location.href = environment.home;
		}
	}
}
