import { Injectable } from '@angular/core';
import { scanData } from "../../models/scan-data.model";
import { ModalController, Platform , ToastController} from "ionic-angular";

//================PLuggins============================
import { Contacts, Contact, ContactName, ContactField} from '@ionic-native/contacts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MapaPage } from "../../pages/index.paginas";
import { EmailComposer } from "@ionic-native/email-composer";

@Injectable()
export class HistorialProvider {


  private _historial : scanData[] = []
  constructor(private inAppBrowser: InAppBrowser,
              private ModalCtrl : ModalController,
              private contacts : Contacts,
            private platform : Platform,
           private toastCtrl : ToastController,
           private emailComposer : EmailComposer) {
   
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
          case "mapa":
          this.ModalCtrl.create( MapaPage, {coords : scanData.info} ).present();
          break;
          case "contacto":
            this.crearContacto(scanData.info);
           break;
           case "email" :
            this.mostrarMail(scanData.info);
           break
          default:
            break;
        }
  }

  private crearContacto(text:string){
    let campos : any = this.parse_vcard(text);

    console.log(campos);
    let nombre = campos['fn'];
    let telefono = campos.tel[0].value[0];

    
    if(!this.platform.is("cordova")){
     console.warn("Estoy en la computadora, no puedo agregar contacto");
     return;
    }
     let contact: Contact = this.contacts.create();

     contact.name = new ContactName(null, nombre);
     contact.phoneNumbers =[new ContactField('mobile', telefono)]; 

     contact.save().then(
       ()=> this.crearToast("Contacto"+ nombre +"creado!" ),
       (error)=> this.crearToast("Error de tipo :"+error)
     );
      
   
  }

  private mostrarMail(texto :string){
      let emailArray : any = this.parse_email(texto); 
    console.log("si esta bien la convercion");


      let email = {
  to: emailArray[0],
  subject: emailArray[1],
  body: emailArray[2],
  isHtml: true
};




  this.emailComposer.open(email);



 


  }

  private crearToast(mensaje:string){
   this.toastCtrl.create({
     message: mensaje,
     duration: 2700
   }).present();

  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

private parse_email( input:string){

  var mail :any[] = input.split(";");
  mail[0] = mail[0].replace("MATMSG:TO:", "");
  mail[1] = mail[1].replace("SUB:", "");
  mail[2] = mail[2].replace("BODY:", "");
      console.log(mail);
   

return mail;
    


}
}
