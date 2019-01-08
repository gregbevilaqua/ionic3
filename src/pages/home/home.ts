import {Component} from "@angular/core";
import {NavController, PopoverController, NavParams} from "ionic-angular";

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
//import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import {MarmitariaInfoPage} from "../marmitaria-info/marmitaria-info";

import { Http /*Response */} from '@angular/http';
import 'rxjs/add/operator/map';
import { ConsumoProvider } from "../../providers/consumo/consumo";
//import { MyApp } from "../../app/app.component";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ConsumoProvider
  ]
})

export class HomePage {
  public slides = [
    {
      src: 'assets/img/bugger.jpg'
    },
    {
      src: 'assets/img/drink.jpg'
    },
    {
      src: 'assets/img/entree.jpg'
    }
  ];

  public marmitaria: Array<{}>

  constructor(
              public nav: NavController, 
              public popoverCtrl: PopoverController,
              public navParams: NavParams,
              public http: Http,
              public consumoProvider: ConsumoProvider 
            ){

  }

  ionViewDidLoad(){
    this.consumoProvider.getMarmitarias().subscribe(
      data=>{
        this.marmitaria = (data as any);
      }
    );
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  selecionarMarmitaria(id, nome_fantasia, status){
    this.nav.push(MarmitariaInfoPage,{
      id: id,
      nome_fantasia:nome_fantasia,
      status: status
    });
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}