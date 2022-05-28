import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nickname: string;

  constructor(
    private readonly storage: Storage,
    private readonly menuService: MenuService
  ) {}

  async getNickname(): Promise<string> {
    const username = this.nickname || (await this.storage.get('username'));
    this.menuService.isVisible = !!username;
    return username;
  }

  async setNickname(newNick: string) {
    this.nickname = newNick;
    this.menuService.isVisible = true;
    await this.storage.set('username', newNick);
  }
}
