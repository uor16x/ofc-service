import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PickCard } from '../../../common/models';
import { MenuService } from '../../../common/services/menu.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const ranks = 'AKQJT98765432';
const suitsFull = ['spades', 'clubs', 'diamonds', 'hearts'];

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-cards-picker',
  templateUrl: './cards-picker.component.html',
  styleUrls: ['./cards-picker.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'opened',
        style({
          height: '340px',
          width: '100%',
        })
      ),
      state(
        'closed',
        style({
          height: '57px',
          width: '57px',
        })
      ),
      transition('opened => closed', [animate('300ms ease')]),
      transition('closed => opened', [animate('200ms ease')]),
    ]),
  ],
})
export class CardsPickerComponent implements OnInit {
  isCardsPanelOpened = false;
  allDeck = {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: [],
  };

  @Output('pick') onPick: EventEmitter<{
    card: string;
    action: 'pick' | 'unpick';
  }> = new EventEmitter();
  @Output('clear') onClear: EventEmitter<void> = new EventEmitter();
  @Input('open') openObservable: Observable<boolean>;

  constructor(private readonly menuService: MenuService) {}

  ngOnInit() {
    for (let suit of suitsFull) {
      for (let rank of ranks) {
        this.allDeck[suit].push({ name: rank + suit[0], picked: false });
      }
    }

    this.openObservable.subscribe((shouldOpen) => {
      this.isCardsPanelOpened = shouldOpen;
      this.menuService.isVisible = !shouldOpen;
    });
  }

  isPicked(card: string) {
    return false;
  }

  onCardClick(card: PickCard) {
    this.onPick.emit({
      card: card.name,
      action: this.isPicked(card.name) ? 'unpick' : 'pick',
    });
  }

  toggleCardsTable() {
    if (this.isCardsPanelOpened) {
      this.isCardsPanelOpened = false;
      this.menuService.isVisible = true;
    } else {
      this.isCardsPanelOpened = true;
      this.menuService.isVisible = false;
    }
  }

  clearHand() {
    this.onClear.emit();
  }
}
