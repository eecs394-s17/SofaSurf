import { Component } from '@angular/core';
import { MainSearchPage } from '../main-search/main-search';
import { NavController, Events, ToastController } from 'ionic-angular';
import { AngularFire, AuthProviders } from 'angularfire2';
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
  constructor(public nav: NavController, public event: Events, public toast: ToastController, public af: AngularFire) {
    this.username = "";
    this.password = "";
    this.db = firebase.database();
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user.auth.providerData['0'];
        console.log(user);
        console.log(this.user);
        console.log(this.user.displayName);
        this.nav.push(MainSearchPage);
        this.event.publish('login', this.user.displayName);

      }
      else {
        this.user = {};
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook
    });
  }

  logout() {
    this.af.auth.logout();
  }

  add(){
    this.db.ref('User1').set({
      Name : 'MengleiLei'
    });
  }
  search(){
    if(this.username != "" && this.password != ""){
    	this.nav.push(MainSearchPage);
      this.event.publish('login', this.username);
    }
    else{
    let toast = this.toast.create({
      message: 'Please input valid account',
      position: "middle",
      duration: 1000
    });
    toast.present();
    }
  }
}
