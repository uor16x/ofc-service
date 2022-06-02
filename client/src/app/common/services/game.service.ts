import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Game } from '../models';
import { CreateGameDto } from '../dtos';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  games = new BehaviorSubject<Game[]>([]);

  constructor(private readonly httpClient: HttpClient) {}

  getGameById(id: string) {
    return this.httpClient.get<Game>(environment.api.game.get(id));
  }

  getAllGames() {
    this.httpClient
      .get<Game[]>(environment.api.game.getAll)
      .pipe(
        map((games) => {
          games.forEach((game) => {
            game.creationTime = new Date(game.creationTime);
          });
          return games;
        })
      )
      .subscribe((games) => this.games.next(games));
  }

  hostGame(gameData: CreateGameDto) {
    return this.httpClient.post(environment.api.game.create, gameData);
  }

  deleteGame(gameId) {
    this.httpClient.delete(environment.api.game.delete(gameId)).subscribe();
  }
}
