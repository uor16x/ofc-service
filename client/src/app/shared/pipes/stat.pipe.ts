import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stat',
})
export class StatPipe implements PipeTransform {
  transform(stat): string {
    return typeof stat === 'number'
      ? stat > 0
        ? `+${stat}`
        : stat.toString()
      : '';
  }
}
