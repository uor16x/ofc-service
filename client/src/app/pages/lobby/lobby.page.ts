import { Component, OnInit } from '@angular/core';
import { Game } from '../../common/models';
import { GameService } from '../../common/services';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  games: Game[];

  constructor(private readonly gameService: GameService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getGames();
  }

  getGames() {
    this.gameService.getAllGames().subscribe((response) => {
      this.games = response;
      console.log(this.games);
    });
  }

  onHostGame() {}
}
