import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplicity'
})
export class MultiplicityPipe implements PipeTransform {

  transform(value: {plural:string,singular:string}, arg1:number): string {
    return  arg1>1?value.plural:value.singular
  }

}
