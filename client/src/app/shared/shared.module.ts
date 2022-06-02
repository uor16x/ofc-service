import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StatPipe } from './pipes/stat.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CombinationPipe } from './pipes/combination.pipe';

@NgModule({
  declarations: [StatPipe, CombinationPipe, SpinnerComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [TranslateModule, StatPipe, CombinationPipe, SpinnerComponent],
})
export class SharedModule {}
