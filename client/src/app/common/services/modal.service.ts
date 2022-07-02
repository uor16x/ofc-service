import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HostModalComponent, ModalComponent } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly modalController: ModalController) {}

  async openVersionMismatch(latestVersion: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'short-modal',
      canDismiss: false,
      componentProps: { latestVersion },
    });
    modal.present();
  }

  async openHostGame() {
    const modal = await this.modalController.create({
      component: HostModalComponent,
      cssClass: 'high-modal',
    });
    modal.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
