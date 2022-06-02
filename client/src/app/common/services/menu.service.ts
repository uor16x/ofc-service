import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  isVisible = false;
  currentGameId;

  constructor(private readonly storage: Storage) {}

  saveCurrentGameId(newGameId: string) {
    this.currentGameId = newGameId;
    this.storage.set('lastGameId', newGameId);
  }

  removeCurrentGameId() {
    this.storage.remove('lastGameId');
    this.currentGameId = null;
  }

  async init() {
    this.currentGameId = await this.storage.get('lastGameId');
  }
}
