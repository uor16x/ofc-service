import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LobbyPageRoutingModule } from './lobby-routing.module';
import { LobbyPage } from './lobby.page';
import { GameItemComponent } from './game/game/game-item.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LobbyPageRoutingModule,
    SharedModule,
  ],
  declarations: [LobbyPage, GameItemComponent],
})
export class LobbyPageModule {}
