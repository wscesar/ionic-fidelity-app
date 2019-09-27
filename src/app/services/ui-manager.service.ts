import { Injectable } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiManagerService {

    constructor(
        private navCtrl: NavController,
        private loading: LoadingController,
        private alertCtrl: AlertController ) {}


    showLoading() {
        this.loading.create().then( loadingEl => {
            loadingEl.present()
        });
    }


    hideProgressBar() {
        this.loading.dismiss()
    }


    alert(header: string, message: string) {
        this.alertCtrl
            .create({
                header: header,
                message: message
            })
            .then(alertEl => {
                this.loading.dismiss();
                alertEl.present();
            });
    }

    navigateTo(route: string){
        this.navCtrl.navigateForward(route)
    }
}

