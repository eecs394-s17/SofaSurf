import { Component } from '@angular/core';
import { MainSearchPage } from '../main-search/main-search';
import { NavController, Events, ToastController } from 'ionic-angular';
import { AF } from '../../providers/af';
import firebase from 'firebase';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public nav: NavController, public event: Events, public toast: ToastController, public afService: AF) {
  };

  login() {
    this.afService.loginWithFacebook().then((data) => {
      this.nav.push(MainSearchPage);
    })
  }

  logout() {
    this.afService.logout();
  }

  // add(){
  //   let newUserRef = this.db.ref('/users').push();
  //   newUserRef.set({
  //     Name : 'Alex Wang',
  //     Email : '456@gmail.com',
  //     Country:'US',
  //     City:'Chicago',
  //     canHost:true
  //   });
  // }

}
