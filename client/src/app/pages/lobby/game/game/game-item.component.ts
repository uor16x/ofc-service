import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../../common/models';
import { GameService } from '../../../../common/services';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;

  constructor(private readonly gameService: GameService) {}

  ngOnInit() {
    console.log('game: ', this.game);
  }

  deleteGame(event) {
    event.stopPropagation();
    this.gameService.deleteGame(this.game._id);
  }
}
