import { Component } from '@angular/core';
import { HistorialProvider } from "../../providers/historial/historial";
 import { scanData } from "../../models/scan-data.model";



@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial : scanData[]= [];

  constructor( private _historialProviuder : HistorialProvider ) {

  }

  ionViewDidLoad() {
    this.historial = this._historialProviuder.cargar_historial();
  }

 abrirScan(valor){
   this._historialProviuder.abrirScan(valor);
 }

}
