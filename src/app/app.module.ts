import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../pages/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

import { HttpModule } from '@angular/http';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {CarrinhoPage} from "../pages/carrinho/carrinho";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {HistoricoPage} from "../pages/historico/historico";
import {TutorialPage } from "../pages/tutorial/tutorial";
import {PagamentoPage} from "../pages/pagamento/pagamento";
import {InfoPage} from "../pages/info/info";
import {MarmitariaInfoPage} from "../pages/marmitaria-info/marmitaria-info";
import {ProdutoPage} from "../pages/produto/produto";
import {SignupPage} from "../pages/signup/signup";

import { AuthData } from '../providers/auth-data';
import { ConsumoProvider } from '../providers/consumo/consumo';
 
@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CarrinhoPage,
    HomePage,
    LoginPage,
    PagamentoPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    HistoricoPage,
    TutorialPage,
    InfoPage,
    MarmitariaInfoPage,
    ProdutoPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    CarrinhoPage,
    HomePage,
    LoginPage,
    PagamentoPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    HistoricoPage,
    TutorialPage,
    InfoPage,
    MarmitariaInfoPage,
    ProdutoPage,
    SignupPage
  ],
  providers: [
    AuthData,
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    AngularFireAuth,
    ConsumoProvider
  ]
})

export class AppModule {
}
