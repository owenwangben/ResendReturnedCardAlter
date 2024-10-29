import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mobilecredit'
})
export class MobileCreditPipe implements PipeTransform {

    transform(value: boolean): any {

        if (value !== null && value !== undefined && typeof value !== 'boolean') {
            throw new Error('not supported');
        }

        if (value)
            return '是';
        else
            return '否';
    }

}
