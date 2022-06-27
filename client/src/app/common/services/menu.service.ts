import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  isVisible = false;
  currentGameId;
  appVersion;

  constructor(
    private readonly storage: Storage,
    private readonly httpClient: HttpClient,
    private readonly modalService: ModalService
  ) {}

  saveCurrentGameId(newGameId: string) {
    this.currentGameId = newGameId;
    this.storage.set('lastGameId', newGameId);
  }

  removeCurrentGameId() {
    this.storage.remove('lastGameId');
    this.currentGameId = null;
  }

  async init() {
    this.appVersion = environment.version;
    this.currentGameId = await this.storage.get('lastGameId');
  }

  async checkVersion() {
    this.httpClient.get<any>(environment.api.version).subscribe({
      next: (response) => {
        const latestVersion = response.version;
        if (latestVersion !== this.appVersion) {
          this.modalService.openVersionMismatch(latestVersion);
        }
      },
      error: (error) => {
        //todo err
      },
    });
  }
}
