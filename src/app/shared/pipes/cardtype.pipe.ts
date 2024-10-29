import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cardtype'
})
export class CardTypePipe implements PipeTransform {

    transform(value): any {
        if (value === null || value === undefined) {
            throw new Error('not supported');
        }

        if (value == 1)
            return '正卡';
        else if(value == 2)
			return '附卡';
		else
			return '';
    }

}
