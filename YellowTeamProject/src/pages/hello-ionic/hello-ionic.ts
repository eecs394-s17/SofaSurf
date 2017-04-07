import { Component } from '@angular/core';
import { MainSearchPage } from '../main-search/main-search';
import { NavController, Events, ToastController } from 'ionic-angular';
import { AF } from '../../providers/af';
import firebase from 'firebase';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})
export class HelloIonicPage {
  username:string;
  password:string;
  user:any;
  db:any;
  constructor(public nav: NavController, public event: Events, public toast: ToastController, public afService: AF) {
    this.username = "";
    this.password = "";
    this.db = firebase.database();
  };

  login(){
    this.afService.loginWithFacebook().then((data) => {
      console.log(data);
      this.afService.displayName = data.auth.displayName;
      this.afService.email = data.auth.email;
      this.afService.addUserInfo();
      this.event.publish('login', data.auth.displayName);
      this.nav.push(MainSearchPage);
    })
  };

  add(){
    let newUserRef = this.db.ref('/users').push();
    newUserRef.set({
      Name : 'Alex Wang',
      Email : '456@gmail.com',
      Country:'US',
      City:'Chicago',
      canHost:true
    });
  }

}
