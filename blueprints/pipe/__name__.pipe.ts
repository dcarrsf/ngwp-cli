import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '<% pipeclassname %>'
})
export class <% pipeclassname %>Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
