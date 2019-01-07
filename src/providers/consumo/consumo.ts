import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsumoProvider {
  baseApiPath="http://foodtruckceara.com.br/marmitou/api/";
  token="1f3d2gs3f2fg3as2fdg3re2t1we46er45";

  constructor(public http: HttpClient) {
    console.log('Hello ConsumoProvider Provider');
  }

  getUsuario(email){
    return this.http.get(this.baseApiPath+"recuperaUsuario.php?token="+this.token+"&email="+email);
  }
  getMarmitarias(){
    return this.http.get(this.baseApiPath+"recuperaMarmitarias.php?token="+this.token);
  }
  getMarmitaria(idMarmitaria){
    return this.http.get(this.baseApiPath + "recuperaMarmitaria.php?token="+this.token+"&id_marmitaria="+idMarmitaria);
  }

}
