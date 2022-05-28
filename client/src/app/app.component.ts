import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import { UserService } from './common/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private storage: Storage,
    public userService: UserService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const storedLanguage = await this.storage.get('lang');
    this.translate.onLangChange.subscribe((langChangeEvent) => {
      this.storage.set('lang', langChangeEvent.lang);
    });
    this.translate.use(storedLanguage || this.translate.defaultLang);
  }
}
