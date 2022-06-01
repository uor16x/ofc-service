import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from './user.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game, Hand } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  currentGame$ = new BehaviorSubject(null);
  newGameHosted$ = new Subject<Game>();
  socketState$ = new Subject();

  constructor(
    private readonly socket: Socket,
    private readonly userService: UserService
  ) {}

  listenMessages() {
    this.socket.on('game-update', (game) => {
      this.currentGame$.next(game);
    });
    this.socket.on('game-hosted', (newGame) => {
      this.newGameHosted$.next(newGame)
    });
    this.socket.on('socketState', (state) => {
      this.socketState$.next(state);
    });
  }

  async joinGame(gameId: string) {
    this.socket.emit('joinGame', {
      gameId: gameId,
      playerName: await this.userService.getNickname(),
    });
  }

  async updateHand(gameId: string, hand: Hand) {
    this.socket.emit('updateHand', {
      gameId: gameId,
      playerName: await this.userService.getNickname(),
      hand,
    });
  }

  showState() {
    this.socket.emit('showCurrentState');
  }
}
