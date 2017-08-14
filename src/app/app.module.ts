import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//==========Mapas=========================================
import { AgmCoreModule } from '@agm/core';
// ------------------pages ---------------------------
import { GuardadosPage, HomePage, MapaPage , TabsPage } from "../pages/index.paginas";
//---------------------plugins --------------------
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from "@ionic-native/email-composer";


// ----------------- provider --------------------
import { HistorialProvider } from '../providers/historial/historial';


@NgModule({
  declarations: [
    MyApp,
     GuardadosPage, HomePage, MapaPage , TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXntwplbrp2AoiEodousH4UkpyYNL1r4w'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GuardadosPage, HomePage, MapaPage , TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    Contacts,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider
  ]
})
export class AppModule {}
