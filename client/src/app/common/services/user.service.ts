import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  nickname: string;

  constructor(private readonly storage: Storage) {}

  getNickname(): string | Promise<string> {
    return this.nickname || this.storage.get('username');
  }

  async setNickname(newNick: string) {
    this.nickname = newNick;
    await this.storage.set('username', newNick);
  }
}
