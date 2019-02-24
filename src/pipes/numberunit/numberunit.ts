import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NumberunitPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'numberunit',
})
export class NumberunitPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(parseInt(value) < 1){
      return '1M'
    }else{
      var valuenum = value+'GB'
      return valuenum
    }
  }
}
