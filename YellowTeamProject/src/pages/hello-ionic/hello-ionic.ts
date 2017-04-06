import { Component } from '@angular/core';
import { MainSearchPage } from '../main-search/main-search';
import { NavController, Events, ToastController } from 'ionic-angular';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';



@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})
export class HelloIonicPage {
  username:string;
  password:string;
  // users: FirebaseListObservable<any>;

  constructor(public nav: NavController, public event: Events,
    public toast: ToastController) {
    this.username = "";
    this.password = "";

    firebase.database().ref('users/' + "1").set({
      name: 'john',
      email: 'test@gmail.com'
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
