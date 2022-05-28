import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobbyPageRoutingModule } from './lobby-routing.module';

import { LobbyPage } from './lobby.page';
import { GameItemComponent } from './game/game/game-item.component';
import { HostModalComponent } from './host-modal/host-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LobbyPageRoutingModule],
  declarations: [LobbyPage, GameItemComponent, HostModalComponent],
})
export class LobbyPageModule {}