import { Component } from '@angular/core';
import { MainSearchPage } from '../main-search/main-search';
import { NavController, Events, ToastController } from 'ionic-angular';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})
export class HelloIonicPage {
  username:string;
  password:string;
  user = {};
  constructor(public nav: NavController, public event: Events, public toast: ToastController, public af: AngularFire) {
    this.username = "";
    this.password = "";
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        console.log('success');
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
