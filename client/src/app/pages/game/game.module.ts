import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { CardsPickerComponent } from './cards-picker/cards-picker.component';
import { SharedModule } from '../../shared/shared.module';
import { PlayerHandComponent } from './player-hand/player-hand.component';
import { GameStateComponent } from './game-state/game-state.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    SharedModule,
    NgJsonEditorModule,
  ],
  declarations: [
    GamePage,
    CardsPickerComponent,
    PlayerHandComponent,
    GameStateComponent,
  ],
})
export class GamePageModule {}
