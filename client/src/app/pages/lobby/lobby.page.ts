import { Component, OnInit } from '@angular/core';
import { Game } from '../../common/models';
import { GameService } from '../../common/services';
import { ModalController } from '@ionic/angular';
import { HostModalComponent } from './host-modal/host-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  games: Game[];

  constructor(
    private readonly gameService: GameService,
    private readonly modalController: ModalController,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.gameService.games.subscribe((games) => (this.games = games));
  }

  ionViewWillEnter() {
    this.getGames();
  }

  getGames() {
    this.gameService.getAllGames();
  }

  async onHostGame() {
    const modal = await this.modalController.create({
      component: <any>HostModalComponent,
    });
    return await modal.present();
  }

  openGame(game) {
    this.router.navigate([`game/${game._id}`]);
  }
}
