import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'creditcard'
})
export class CreditcardPipe implements PipeTransform {
	private pattern1 = /(\d{4}) ?(\d{4}) ?(\d{4}) ?(\d{4})/;
	private pattern2 = /(\d{4}) ?(\d{6}) ?(\d{5})/;

	transform(value: string): any {
		const replace1 = '$1 **** **** $4';
		const replace2 = '$1 ****** $3';
		if (value && value.length >= 15) {
			if (value.length === 16) {
				return value.replace(this.pattern1, replace1);
			}
			else {
				return value.replace(this.pattern2, replace2);
			}
		}
		return value;
	}

}
