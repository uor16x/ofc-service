import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import {
  GameService,
  MenuService,
  SocketService,
  ToastService,
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
    private readonly toastService: ToastService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const storedLanguage = await this.storage.get('lang');
    this.translate.onLangChange.subscribe((langChangeEvent) => {
      this.storage.set('lang', langChangeEvent.lang);
    });
    this.translate.use(storedLanguage || this.translate.defaultLang);
    this.socketService.listenMessages();
    this.socketService.newGameHosted$.subscribe((newGame) => {
      this.gameService.getAllGames();
      this.toastService.showGameHostedToast(newGame.hostName);
    });
    this.socketService.gameDeleted$.subscribe((deletedGameId) => {
      this.gameService.getAllGames();
      // this.toastService.showGameHostedToast(newGame.hostName);
    });
  }
}
