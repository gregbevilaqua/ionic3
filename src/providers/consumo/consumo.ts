import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsumoProvider {
  baseApiPath="http://foodtruckceara.com.br/marmitou/api/";
  token="1f3d2gs3f2fg3as2fdg3re2t1we46er45";
  usuarioL = [
    {
      'id_usuario':0,
      'nome':"Como prefere ser chamado?",
      'endereco':"",
      'cpf':"__.__.__-_",
      'telefone':""
    }
  ];
  email="";

  constructor(public http: HttpClient) {
    //console.log('Hello ConsumoProvider Provider');
  }

  pesquisarUsuario(email){
    return this.http.get(this.baseApiPath+"recuperaUsuario.php?token="+this.token+"&email="+email);
  }
  setUsuario(usuario){
    this.usuarioL[0].id_usuario = usuario[0].id_cliente;
    this.usuarioL[0].nome = usuario[0].nome;
    this.usuarioL[0].cpf = usuario[0].cpf;
    this.usuarioL[0].endereco = usuario[0].endereco;
    this.usuarioL[0].telefone = usuario[0].telefone;
  }
  getUsuario(){
    return this.usuarioL;
  }
  getMarmitarias(){
    return this.http.get(this.baseApiPath+"recuperaMarmitarias.php?token="+this.token);
  }
  getMarmitaria(idMarmitaria){
    return this.http.get(this.baseApiPath + "recuperaMarmitaria.php?token="+this.token+"&id_marmitaria="+idMarmitaria);
  }
  cadastraUsuarioApi(nome, cpf, email, senha){
    return this.http.get(this.baseApiPath+"cadastrarUsuarioApi.php?token="+this.token+"&nome="+nome+"&cpf="+cpf+"&email="+email+"&senha="+senha);
  }

}
