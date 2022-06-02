import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../common/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentLanguage: string;

  constructor(
    private readonly translate: TranslateService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.currentLanguage =
      this.translate.currentLang || this.translate.defaultLang;
  }

  segmentChanged(event) {
    this.translate.use(event.detail.value);
    this.userService.settings.language = event.detail.value;
    window.location.reload();
  }
}
