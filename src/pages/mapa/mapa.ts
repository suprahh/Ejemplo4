import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';



@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

   title: string = 'My first AGM project';
  lat: number ;
  lng: number;

  constructor( public navParams: NavParams) {

    this.lat  = -33.563570;
    this.lng  = -70.586410
  }

 

}
