import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StatPipe } from './pipes/stat.pipe';
import { CombinationPipe } from './pipes/combination.pipe';
import {
  HostModalComponent,
  ModalComponent,
  SpinnerComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StatPipe,
    CombinationPipe,
    SpinnerComponent,
    ModalComponent,
    HostModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TranslateModule,
    StatPipe,
    CombinationPipe,
    SpinnerComponent,
    ModalComponent,
    HostModalComponent,
  ],
})
export class SharedModule {}
