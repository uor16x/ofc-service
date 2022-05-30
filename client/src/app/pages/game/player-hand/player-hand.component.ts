import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../../common/models';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss'],
})
export class PlayerHandComponent implements OnInit {
  isEditable = false;
  roundTotal;

  @Input('player') player: Player;
  @Input('selectedCard') selectedCard;
  @Input('isHero') isHero: boolean = false;
  @Output('done') onDone = new EventEmitter();
  @Output('select') onSelect: EventEmitter<{ line: string; index: number }> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.isEditable = !this.player.hand.isDone;
    if (typeof this.player.hand.top.stats.total === 'number') {
      this.roundTotal =
        this.player.hand.top.stats.total +
        this.player.hand.middle.stats.total +
        this.player.hand.bottom.stats.total;
    }
  }

  select(line: string, index: number) {
    if (this.isHero && this.isEditable) {
      this.onSelect.emit({ line, index });
    }
  }

  onDoneClick() {
    this.onDone.emit();
  }

  getCardSrc(card: string): string {
    return `assets/cards/${card}.png`;
  }
}
