import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mobile'
})
export class MobilePipe implements PipeTransform {
	private pattern = /(\d{4})-?(\d{3})-?(\d{3})/;

	transform(value: any, args?: any): any {
		const replace = '$1-xxx-$3';
		return value ? value.replace(this.pattern, replace) : value;
	}
}
