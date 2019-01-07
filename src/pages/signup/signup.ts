import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../providers/email';

//import {HomePage}from'../home/home';

import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
//import { auth } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

    public signupForm;
    loading: any;

    constructor(public nav: NavController,
                public authData: AuthData,
                public formBuilder: FormBuilder, 
                public loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                public afData: AngularFireAuth) 
                {

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })
    }

    signupUser() {
        //console.log(email.value);
        this.afData.auth.createUserWithEmailAndPassword(this.signupForm.value.email,this.signupForm.value.password)
            .then((response) => {
                this.presentAlert('Usuário Cadastrado', 'Parabéns você já tem acesso ao aplicativo.');
                this.nav.push(LoginPage);
            })
            .catch((error) => {
                if(error.code == 'auth/email-already-in-use'){
                    this.presentAlert('Erro','E-mail já cadastrado em nossa base');
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
}
