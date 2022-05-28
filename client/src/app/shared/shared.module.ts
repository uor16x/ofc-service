import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StatPipe } from './pipes/stat.pipe';

@NgModule({
  declarations: [StatPipe],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [TranslateModule, StatPipe],
})
export class SharedModule {}
