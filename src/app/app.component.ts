import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events } from "ionic-angular";

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

import { AngularFireAuth } from '@angular/fire/auth';
import { ConsumoProvider } from "../providers/consumo/consumo";
 
export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html',
  providers: [
    ConsumoProvider
  ]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TutorialPage;
  Page;
  appMenuItems: Array<MenuItem>;
  usuario = [
    {
      'id_usuario':0,
      'nome':"",
      'endereco':"",
      'cpf':"",
      'telefone':""
    }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public afData: AngularFireAuth,
    public consumoProvider: ConsumoProvider,
    public events: Events
  ){
    events.subscribe('user:created', (user, time) => {
      console.log('Welcome', user, 'at', time);
      this.consumoProvider.pesquisarUsuario(user).subscribe(
        data=>{
          const usuario = (data as any);
          this.consumoProvider.setUsuario(usuario);
        }
      );
      this.usuario = this.consumoProvider.getUsuario();
      //console.log(this.usuario[0].nome);
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

  ionViewDidLoad(){
    //this.usuario = this.consumoProvider.getUsuario();
    //console.log(this.usuario[0]);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.afData.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

}
