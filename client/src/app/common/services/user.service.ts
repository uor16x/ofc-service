import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nickname: string;
  isLoggedIn = false;

  constructor(private readonly storage: Storage) {}

  getNickname(): string | Promise<string> {
    const username = this.nickname || this.storage.get('username');
    this.isLoggedIn = !!username;
    return username;
  }

  async setNickname(newNick: string) {
    this.nickname = newNick;
    this.isLoggedIn = true;
    await this.storage.set('username', newNick);
  }
}
