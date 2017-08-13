import { Injectable } from '@angular/core';
import { scanData } from "../../models/scan-data.model";
import { InAppBrowser } from '@ionic-native/in-app-browser';



@Injectable()
export class HistorialProvider {


  private _historial : scanData[] = []
  constructor(private inAppBrowser: InAppBrowser) {
   
  }

  agregarHistorial(texto:string){


    let data = new scanData( texto);

      this._historial.unshift(data);

      console.log(this._historial);

      this.abrirScan(0);



  }

  cargar_historial(){
    return this._historial;
  }

  abrirScan( index :number){
        let scanData = this._historial[index];
        console.log(scanData.tipo);

        switch (scanData.tipo) {
          case "http":
            this.inAppBrowser.create(scanData.info, "_system");
            break;
        
          default:
            break;
        }
  }
}
