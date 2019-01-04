import {Component} from "@angular/core";
import {NavController, PopoverController, NavParams} from "ionic-angular";

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
//import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import {MarmitariaInfoPage} from "../marmitaria-info/marmitaria-info";

import { Http /*Response */} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
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

  private url:string = 'http://foodtruckceara.com.br/marmitou/api/apiRecupera.php';
  public marmitaria: Array<{}>

  constructor(
              public nav: NavController, 
              public popoverCtrl: PopoverController,
              public navParams: NavParams,
              public http: Http
            ){
              let id = navParams.get('id');
              let nome = navParams.get('nome');

              this.http.get(this.url + '?token=1f3d2gs3f2fg3as2fdg3re2t1we46er45')
              .map(res => res.json())
              .subscribe(data => {
                //console.log(data);
                this.marmitaria = data;               
              })
  }

  // go to result page
  doSearch() {
    //this.nav.push(TripsPage);
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