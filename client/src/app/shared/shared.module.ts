import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    // OverlayMenuComponent,
  ],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [
    // OverlayMenuComponent,
    TranslateModule,
  ],
})
export class SharedModule {}
