import { Component } from '@angular/core';
import { NavParams , ViewController} from 'ionic-angular';



@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

   title: string = 'My first AGM project';
  lat: number ;
  lng: number;

  constructor( public navParams: NavParams,
              private viewCtrl : ViewController) {

    //this.lat  = -33.563570;
    //this.lng  = -70.586410
    let coordsArray = this.navParams.get("coords").split(",");
    this.lat =Number(coordsArray[0].replace("geo:","")) ;
    this.lng =Number(coordsArray[1]) ;

    console.log(this.lat, this.lng);
  }

  cerrarMapa(){
       this.viewCtrl.dismiss();
  }

 

}
