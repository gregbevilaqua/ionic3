import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { TutorialPage } from "../pages/tutorial/tutorial";
import { PagamentoPage } from "../pages/pagamento/pagamento";
import { CarrinhoPage } from "../pages/carrinho/carrinho";
import { HistoricoPage } from "../pages/historico/historico";
import {SettingsPage} from "../pages/settings/settings";
import {InfoPage} from "../pages/info/info";
//so para teste
import {MarmitariaInfoPage} from "../pages/marmitaria-info/marmitaria-info";

import firebase from 'firebase';

 
export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TutorialPage;
  Page;
  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAvkGdNY_r4SGmDBPYZNVztUvJceX_qvnE",
      authDomain: "marmitou-ifce.firebaseapp.com",
      databaseURL: "https://marmitou-ifce.firebaseio.com",
      projectId: "marmitou-ifce",
      storageBucket: "marmitou-ifce.appspot.com",
      messagingSenderId: "263302474777"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            //this.rootPage = TutorialPage;
            //console.log("not login");
            this.rootPage = HomePage;
        } else {
            //console.log("login");
            this.rootPage = HomePage;
        }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.appMenuItems = [
      {title: 'Inicio', component: HomePage, icon: 'home'},
      {title: 'Carrinho de Compra', component: CarrinhoPage, icon: 'cart'},
      {title: 'Histórico', component: HistoricoPage, icon: 'timer'},
      {title: 'Método de Pagamento', component: PagamentoPage, icon: 'card'},
      {title: 'Configurações', component: SettingsPage, icon: 'lock'},
      {title: 'Info', component: InfoPage, icon: 'information-circle'}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

}
