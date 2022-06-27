import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuService, UserService } from '../../common/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentLanguage: string;
  appVersion: string;

  constructor(
    private readonly translate: TranslateService,
    private readonly userService: UserService,
    private readonly menuService: MenuService
  ) {}

  ngOnInit() {
    this.currentLanguage =
      this.translate.currentLang || this.translate.defaultLang;
    this.appVersion = this.menuService.appVersion;
  }

  segmentChanged(event) {
    this.translate.use(event.detail.value);
    this.userService.settings.language = event.detail.value;
  }
}
