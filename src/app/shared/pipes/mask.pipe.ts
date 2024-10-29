import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mask'
})
export class MaskPipe implements PipeTransform {

	transform(value: string, range: string, symbol?: string): any {
		if (!value) {
			return value;
		}
		if (typeof value !== 'string') {
			throw new Error('not supported');
		}
		const ranges = range.split(',');
		let arr: string[], start: number, end: number, maskStr: string;
		for (const r of ranges) {
			arr = r.split('-');
			start = +arr[0];
			end = +arr[arr.length === 2 ? 1 : 0];
			maskStr = '';
			for (let i = start; i <= end; i++) {
				maskStr += symbol;
			}
			value = value.slice(0, start) + maskStr + value.slice(end + 1);
		}
		return value;
	}

}
