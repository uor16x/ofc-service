import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../common/models';
import { GameService } from '../../common/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  game: Game;
  openCardsSubject: Subject<boolean> = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService
  ) {}

  ngOnInit() {
    const gameId = this.route.snapshot.params?.id;
    if (!gameId) {
      //error toast
      //redirect to lobby
    }
    this.gameService.getGameById(gameId).subscribe((response) => {
      this.game = response;
      console.log(response);
    });
  }
}
