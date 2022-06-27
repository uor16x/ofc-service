import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  latestVersion;

  constructor() { }

  ngOnInit() {}

  onDownload() {
    window.open(environment.latestApkLink(this.latestVersion), '_system');
  }

  onClose() {
    navigator['app']?.exitApp();
  }
}
