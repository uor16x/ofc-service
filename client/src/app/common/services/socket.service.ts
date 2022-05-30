import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from './user.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Hand } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  currentGamePlayers$ = new BehaviorSubject([]);
  socketState$ = new Subject();

  constructor(
    private readonly socket: Socket,
    private readonly userService: UserService
  ) {}

  listenMessages() {
    this.socket.on('players-update', (players) => {
      this.currentGamePlayers$.next(players);
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
