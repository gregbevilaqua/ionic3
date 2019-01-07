import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutoPage} from "../produto/produto";

import { Http /*Response */} from '@angular/http';
import 'rxjs/add/operator/map';
import { ConsumoProvider } from '../../providers/consumo/consumo';

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
  providers: [
    ConsumoProvider
  ]
})
export class MarmitariaInfoPage {

  opcao: string = "cardapio";
  public id_marmitaria: any;
  public nome_fantasia: any;
  public status: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ConsumoProvider: ConsumoProvider,
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
    this.ConsumoProvider.getMarmitaria(this.id_marmitaria).subscribe(
      data=>{
        const resposta = (data as any);
        //console.log(resposta);
      }, error => {
        console.log("erro foda");
      });
  }

  selecionarMarmita(){
    this.navCtrl.push(ProdutoPage);
  }

}
