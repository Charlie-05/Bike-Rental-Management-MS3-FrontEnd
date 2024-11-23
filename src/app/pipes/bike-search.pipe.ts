import { Pipe, PipeTransform } from '@angular/core';
import { IBike } from '../modals/bike';

@Pipe({
  name: 'bikeSearch'
})
export class BikeSearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let searchText = args[0];
    console.log(args);
    console.log(value);
    if (!searchText) {
      return value;
    }
    return value.filter((e: IBike) => e.model.toLowerCase().includes(searchText.toLowerCase()) || e.type.toLowerCase().includes(searchText.toLowerCase()))
  }

}
