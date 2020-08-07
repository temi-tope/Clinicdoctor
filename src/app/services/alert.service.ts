import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private response;
  // To alert the user
  constructor(private toastController: ToastController) { }



  getResponse() {
      return this.response;
  }

  setResponse(newResponse) {
          this.response = newResponse;
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

}
