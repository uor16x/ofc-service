import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../../common/models';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;

  constructor() {}

  ngOnInit() {
    console.log('game: ', this.game);
  }
}
