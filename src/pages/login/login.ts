import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ToastController, MenuController,LoadingController} from "ionic-angular";
import {HomePage} from "../home/home";
import {SignupPage} from "../signup/signup";

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { FormBuilder, Validators } from '@angular/forms';
//import { AuthData } from '../../providers/auth-data';

import { EmailValidator } from '../../providers/email';

import { AngularFireAuth } from '@angular/fire/auth';
import { ConsumoProvider } from "../../providers/consumo/consumo";
//import { auth } from 'firebase/app';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm;
  loading: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController, 
              public http: Http,
              public forgotCtrl: AlertController,
              public menu: MenuController,
              public toastCtrl: ToastController,
              public navCtrl: NavController, 
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public afData: AngularFireAuth,
              public consumoProvider: ConsumoProvider,
              public events: Events
            ){
                this.menu.swipeEnable(false);
                this.loginForm = formBuilder.group({
                  email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                  password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
              });
  }

  createUser(user) {
    this.events.publish('user:created', user, Date.now());
  }

  loginUser(){
    this.afData.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    .then((response) => {
      this.createUser(this.loginForm.value.email);
      this.consumoProvider.email = this.loginForm.value.email;
      this.nav.setRoot(HomePage);
    })
    .catch((error) => {
      if(error.code == 'auth/wrong-password'){
        this.presentAlert('Erro','A senha digitada está incorreta');
        this.loginForm.controls['password'].setValue(null);
      }else if(error.code == 'auth/user-not-found'){
        this.presentAlert('Erro','Usuário não encontrado');
      }else if(error.code == 'auth/user-disabled'){
        this.presentAlert('Erro','Usuário desabilitado temporariamente');
      }
      
    })
  }

  presentAlert(title: string, subtitle: string){
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['OK']
    });
    alert.present();
}

  goToSignup(): void {
      this.nav.push(SignupPage);
  }

  goToResetPassword(): void {
      //this.nav.push(ResetPassword);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Esqueceu a senha?',
      message: "Digite o seu email e enviaremos um link para o cadastro da nova senha",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'E-mail enviado com Sucesso!',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
