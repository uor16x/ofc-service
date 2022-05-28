import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentLanguage: string;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.currentLanguage =
      this.translate.currentLang || this.translate.defaultLang;
  }

  segmentChanged(event) {
    this.translate.use(event.detail.value);
  }
}
