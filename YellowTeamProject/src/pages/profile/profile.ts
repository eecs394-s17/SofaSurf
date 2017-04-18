import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController, Events } from 'ionic-angular';
import { AF } from '../../providers/af';

@Component({
  selector:'ProfilePage',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  constructor(
    public toastCtrl: ToastController,
    public nav: NavController,
    public event: Events,
    public afService: AF
  ){};

  Goback(){
    this.nav.pop();
  }
}
