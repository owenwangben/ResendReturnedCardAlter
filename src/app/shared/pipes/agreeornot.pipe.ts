import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'agreeornot'
})
export class AgreeOrNotPipe implements PipeTransform {

    transform(value: boolean): any {

        if (value !== null && value !== undefined && typeof value !== 'boolean') {
            throw new Error('not supported');
        }

        if (value)
            return '同意';
        else
            return '不同意';
    }

}
