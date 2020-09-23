import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../util/Constants';

@Pipe({
  name: 'DataFormatadaPipe'
})
export class DataFormatadaPipePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
     return super.transform(value, Constants.DATA_FORMATADA);
  }

}
