import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberfile',
})
export class NumberfilePipe implements PipeTransform {

  transform(value: number,args) {
    
    var valueceilnumber = Math.ceil(value);
    return valueceilnumber
  }
}
