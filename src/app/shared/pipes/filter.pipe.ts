import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], propertyName: string, filterValue: any): any[] {
    const result = arr && arr.filter(item => item[propertyName] === filterValue);
    return result;
  }

}
