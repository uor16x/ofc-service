import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Player } from '../../common/models';
import { GameService, SocketService, UserService } from '../../common/services';
import { filter, Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  game: Game;
  openCardsSubject: Subject<boolean> = new Subject();
  selectedCard = {
    line: '',
    index: 0,
  };
  username;
  isHost = false;
  isNextEnabled = false;
  hero: Player;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly socketService: SocketService,
    private readonly userService: UserService
  ) {}

  async ngOnInit() {
    const gameId = this.route.snapshot.params?.id;
    if (!gameId) {
      //error toast
      //redirect to lobby
    }
    this.username = await this.userService.getNickname();
    this.socketService.currentGame$
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((updatedGame) => {
        this.game = updatedGame;
        this._sortPlayers();
        this.isHost = this.game.hostName === this.username;
      });
    this.socketService.joinGame(gameId);
    this.socketService.socketState$
      .pipe(untilDestroyed(this))
      .subscribe((state) => this.displaySocketState(state));
  }

  private _sortPlayers() {
    this.game.players = this.game.players.sort((a, b) =>
      a.name === this.username ? -1 : 1
    );
    this.hero = this.game.players[0];
  }

  private _initSelected() {
    let line = this._getCardRow('');
    if (line !== 'none') {
      this._setSelected(
        line,
        this.hero.hand[line].cards.findIndex((card) => card === '')
      );
    } else {
      this._setSelected('top', 0);
    }
  }

  private _finishEditing() {
    this.selectedCard.line = '';
    this.selectedCard.index = 0;
    this.openCardsSubject.next(false);
  }

  private _startEditing() {
    this._initSelected();
    this.openCardsSubject.next(true);
  }

  private _isHandFull(): boolean {
    return this._getCardRow('') === 'none';
  }

  private _getCardRow(card: string) {
    if (this.hero.hand.top.cards.includes(card)) {
      return 'top';
    }
    if (this.hero.hand.middle.cards.includes(card)) {
      return 'middle';
    }
    if (this.hero.hand.bottom.cards.includes(card)) {
      return 'bottom';
    }

    return 'none';
  }

  private _setSelected(line: string, index: number) {
    this.selectedCard = {
      line: line,
      index: index,
    };
  }

  private _setNextSelected(): void {
    let { line, index } = this.selectedCard;
    switch (line) {
      case 'top': {
        if (index < 2) {
          index++;
        } else {
          line = 'middle';
          index = 0;
        }
        break;
      }
      case 'middle': {
        if (index < 4) {
          index++;
        } else {
          line = 'bottom';
          index = 0;
        }
        break;
      }
      case 'bottom': {
        if (index < 4) {
          index++;
        } else {
          line = 'top';
          index = 0;
        }
        break;
      }
    }
    this._setSelected(line, index);
  }

  private _updateHand() {
    this.socketService.updateHand(this.game._id, this.hero.hand);
  }

  private _getEmptyHand() {
    return {
      isDone: false,
      isScoop: false,
      nextIsFantasy: false,
      top: {
        combination: null,
        cards: ['', '', ''],
        stats: {
          bonus: 0,
          line: 0,
          total: 0,
        },
      },
      middle: {
        combination: null,
        cards: ['', '', '', '', ''],
        stats: {
          bonus: 0,
          line: 0,
          total: 0,
        },
      },
      bottom: {
        combination: null,
        cards: ['', '', '', '', ''],
        stats: {
          bonus: 0,
          line: 0,
          total: 0,
        },
      },
    };
  }

  onCardSelect(event) {
    if (
      this.selectedCard.line === event.line &&
      this.selectedCard.index === event.index
    ) {
      this.selectedCard.line = '';
      this.selectedCard.index = 0;
    } else {
      this.selectedCard.line = event.line;
      this.selectedCard.index = event.index;
    }
    if (this.selectedCard.line !== '') {
      this.openCardsSubject.next(true);
    }
  }

  onPlayerDone() {
    this.hero.hand.isDone = !this.hero.hand.isDone;
    this.hero.hand.isScoop = false;
    if (this.hero.hand.isDone) {
      this._finishEditing();
      this.hero.hand.isScoop = !this._isHandFull();
    } else {
      this._startEditing();
    }
    this._updateHand();
  }

  onCardPick(event) {
    if (!this.hero.hand.isDone) {
      if (event.action === 'pick') {
        if (this.selectedCard.line === '') {
          this._initSelected();
        }
        this.hero.hand[this.selectedCard.line].cards[this.selectedCard.index] =
          event.card;
        this._setNextSelected();
      } else {
        let line = this._getCardRow(event.card);
        if (line === 'none') {
          // not our card
          return;
        }
        let i = this.hero.hand[line].cards.findIndex(
          (card) => card === event.card
        );
        this.hero.hand[line].cards[i] = '';
        this._setSelected(line, i);
      }
      console.log(this.game);
      this._updateHand();
    }
  }

  onClearHand() {
    this.hero.hand = this._getEmptyHand();
    this._updateHand();
  }

  getSocketState() {
    this.socketService.showState();
  }

  displaySocketState(state) {
    const statePrettified = JSON.stringify(state, null, 2);
    console.log(statePrettified);
  }

  onCalc() {}

  onNext() {}
}
