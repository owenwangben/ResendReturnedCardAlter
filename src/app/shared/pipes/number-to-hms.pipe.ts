import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'number_to_hms'
})
export class NumberToHMSPipe implements PipeTransform {
	transform(value: number): any {
		let result = "";
		const h = Math.floor(value / 3600);
		if (h > 0) { result += h.toString() + "時"; }
		value = value % 3600;
		const m = Math.floor(value / 60);
		if (m > 0) { result += m.toString() + "分"; }
		const s = value % 60;
		if (s > 0) { result += s.toString() + "秒"; }
		return result;
	}
}
