import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private defaultOptions: ToastOptions = {
    position: 'top',
    duration: 3000,
  };

  constructor(private readonly toastController: ToastController) {}

  async showGameHosted(hostedBy: string) {
    const toast = await this.toastController.create({
      message: `New game was hosted by ${hostedBy}!`,
      ...this.defaultOptions,
    });
    await toast.present();
  }
}
