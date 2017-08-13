import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//---plugins-------------------------------
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController , Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// -----------provider ---------------
import { HistorialProvider } from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
               public barcodeScan : BarcodeScanner,
              public toastCtrl : ToastController,
              public platform : Platform,
              private _historialProvider : HistorialProvider,
              private inAppBrowser : InAppBrowser) {

  }

  Scan(){
    console.log("realizando scan");


if (!this.platform.is('cordova')) {
  this._historialProvider.agregarHistorial("http://google.com");
  
  return;
}
    this.barcodeScan.scan().then((barcodeData) => {
 // si sale todo bien
 console.log("Data del scan ", barcodeData);
 console.log("result : "+JSON.stringify(barcodeData.text) );
 console.log("Formato : "+ JSON.stringify(barcodeData.format) );
 console.log("Cancelar : "+JSON.stringify(barcodeData.cancelled));

 if (barcodeData.cancelled === false && barcodeData.text != null) {
   this._historialProvider.agregarHistorial(barcodeData.text);
 }
}, (err) => {
    // Si algo sale mal
    this.presentToast(err)
});
  }

  presentToast(error :string ) {
  let toast = this.toastCtrl.create({
    message: "Error de tipo "+error,
    duration: 2500,
    position: 'bottom'
  });

     toast.onDidDismiss(() => {
    console.log('Se cierra el toast');
  });

  toast.present();


  }
}
