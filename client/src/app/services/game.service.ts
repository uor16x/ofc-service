import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Game } from '../shared/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private readonly httpClient: HttpClient) {}

  getGameById(id: string) {
    return this.httpClient.get(environment.api.game.get(id));
  }

  getAllGames() {
    return this.httpClient.get<Game[]>(environment.api.game.getAll).pipe(
      map((games) => {
        games.forEach((game) => {
          game.creationTime = new Date(game.creationTime);
        });
        return games;
      })
    );
  }
}
