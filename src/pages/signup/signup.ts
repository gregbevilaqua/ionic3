import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../providers/email';

import {HomePage}from'../home/home';

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
                public alertCtrl: AlertController) 
                {

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })
    }

    signupUser() {
      if (!this.signupForm.valid) {
          console.log(this.signupForm.value);
      } else {
          this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
              .then(() => {
                  this.loading.dismiss().then(() => {
                      //alert("Conta criada");
                      this.nav.setRoot(HomePage);
                  });
              }, (error) => {
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
}