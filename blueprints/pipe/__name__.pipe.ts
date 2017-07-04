import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '<% name %>'
})
export class <% classname %> implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
