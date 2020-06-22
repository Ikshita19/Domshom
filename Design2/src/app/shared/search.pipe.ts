import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(categories: Array<any>, fieldName: string, value: string): any {
      console.log(fieldName, value);
      return categories.filter(c => c[fieldName].toLowerCase().includes(value.toLowerCase()));     
  }
}


