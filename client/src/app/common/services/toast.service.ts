import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastController: ToastController) {}

  async showGameHostedToast(hostedBy: string) {
    const toast = await this.toastController.create({
      message: `New game was hosted by ${hostedBy}!`,
      position: 'top',
      duration: 3000,
    });
    await toast.present();
  }
}
