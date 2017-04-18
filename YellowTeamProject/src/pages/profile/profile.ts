import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AF } from '../../providers/af';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector:'ProfilePage',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  public currentProfile: FirebaseObjectObservable<any>;

  constructor(
    public nav: NavController,
    public afService: AF
  ){
    this.currentProfile = this.afService.getUserProfile(this.afService.userId);
  };

}
