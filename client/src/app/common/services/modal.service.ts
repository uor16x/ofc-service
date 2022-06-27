import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly modalController: ModalController) {}

  async openVersionMismatch(latestVersion: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      canDismiss: false,
      componentProps: { latestVersion },
    });
    modal.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
