import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ToastController, MenuController,LoadingController} from "ionic-angular";
import {HomePage} from "../home/home";
import {SignupPage} from "../signup/signup";

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../providers/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  /*private credential: Object = {
    email:'',
    senha:''
  }*/
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
              public authData: AuthData
            ){
                this.menu.swipeEnable(false);
                this.loginForm = formBuilder.group({
                  email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                  password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
              });
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
        console.log(this.loginForm.value);
    } else {
        this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
            this.loading.dismiss().then(() => {
                this.nav.setRoot(HomePage);
            });
        }, error => {
            this.loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        });

        this.loading = this.loadingCtrl.create();
        this.loading.present();
    }
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
