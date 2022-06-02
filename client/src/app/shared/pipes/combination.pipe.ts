import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../common/services';
import { combinationTranslations } from '../combination-translations';

@Pipe({
  name: 'combination',
})
export class CombinationPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  transform(comb): string {
    const userLanguage = this.userService.settings.language;
    const translation = combinationTranslations[comb];
    if (!translation) {
      return `Missing translation of ${comb}`
    }
    return translation[userLanguage];
  }
}
