import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import { MenuService, SocketService } from './common/services';

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
    private readonly socketService: SocketService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const storedLanguage = await this.storage.get('lang');
    this.translate.onLangChange.subscribe((langChangeEvent) => {
      this.storage.set('lang', langChangeEvent.lang);
    });
    this.translate.use(storedLanguage || this.translate.defaultLang);
    this.socketService.listenMessages();
  }
}
