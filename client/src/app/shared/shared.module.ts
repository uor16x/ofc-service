import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StatPipe } from './pipes/stat.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [StatPipe, SpinnerComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [TranslateModule, StatPipe, SpinnerComponent],
})
export class SharedModule {}
