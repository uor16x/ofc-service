import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import {
  GameService,
  MenuService,
  SocketService,
  ToastService,
  UserService,
} from './common/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly translate: TranslateService,
    private readonly storage: Storage,
    public readonly menuService: MenuService,
    private readonly socketService: SocketService,
    private readonly gameService: GameService,
    private readonly toastService: ToastService,
    private readonly userService: UserService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const storedLanguage = await this.storage.get('lang');
    this.translate.onLangChange.subscribe((langChangeEvent) => {
      this.storage.set('lang', langChangeEvent.lang);
    });
    this.translate.use(storedLanguage || this.translate.defaultLang);
    this.userService.settings.language =
      storedLanguage || this.translate.defaultLang;
    await this.menuService.init();
    await this.menuService.checkVersion();
    this.initSockets();
  }

  initSockets() {
    this.socketService.listenMessages();
    this.socketService.newGameHosted$.subscribe((newGame) => {
      this.gameService.getAllGames();
      this.toastService.showGameHosted(newGame.hostName);
    });
    this.socketService.gameDeleted$.subscribe((deletedGameId) => {
      if (deletedGameId === this.menuService.currentGameId) {
        this.menuService.removeCurrentGameId();
      }
      this.gameService.getAllGames();
    });
  }
}
