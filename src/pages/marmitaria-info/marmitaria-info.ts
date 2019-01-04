import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutoPage} from "../produto/produto";

import { Http /*Response */} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MarmitariaInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marmitaria-info',
  templateUrl: 'marmitaria-info.html',
})
export class MarmitariaInfoPage {
  //pet: string = "puppies";
  opcao: string = "cardapio";
  //private url:string = 'http://foodtruckceara.com.br/marmitou/api/recuperaMarmitaria.php';
  //public marmitaria: Array<{}>
  public id_marmitaria: any;
  public nome_fantasia: any;
  public status: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
    ) {
      this.id_marmitaria = navParams.get('id');
      this.nome_fantasia = navParams.get('nome_fantasia');
      this.status = navParams.get('status');

      if(this.status==="1"){
        this.status="ABERTO";
      }else{
        this.status="FECHADO";
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarmitariaInfoPage');
  }

  selecionarMarmita(){
    this.navCtrl.push(ProdutoPage);
  }

}
