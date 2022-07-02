import { Component, OnInit } from '@angular/core';
import { Game } from '../../common/models';
import { GameService } from '../../common/services';
import { Router } from '@angular/router';
import { ModalService } from '../../common/services/modal.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  games: Game[];
  isLoading = true;

  constructor(
    private readonly gameService: GameService,
    private readonly modalService: ModalService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.gameService.games.subscribe((games) => {
      this.games = games;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.getGames();
  }

  getGames() {
    this.gameService.getAllGames();
  }

  async onHostGame() {
    this.modalService.openHostGame();
  }

  openGame(game) {
    this.router.navigate([`game/${game._id}`]);
  }
}
