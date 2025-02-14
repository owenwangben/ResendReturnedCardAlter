import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { FormControlDirective, FormControlName } from '@angular/forms';

import { AppModule } from './app/app.module';
import { environment } from 'environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// const origAlert = window.alert;
// window.alert = function(message) {
// 	window.setTimeout(function() { origAlert(message); }, 100);
// }

Date.prototype.toJSON = function () {
	const timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); // UTC minus local time
	const sign = timezoneOffsetInHours >= 0 ? '+' : '-';
	const leadingZero = (timezoneOffsetInHours < 10) ? '0' : '';

	// It's a bit unfortunate that we need to construct a new Date instance
	// (we don't want _this_ Date instance to be modified)
	const correctedDate = new Date(this.getFullYear(), this.getMonth(), this.getDate(),
		this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
	correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
	const iso = correctedDate.toISOString().replace('Z', '');

	return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ':00';
};
