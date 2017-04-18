import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AF } from '../../providers/af';
import { FirebaseObjectObservable } from 'angularfire2';
import { EditProfile } from "../editProfile/edit-profile";

@Component({
  selector:'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  public currentProfile: FirebaseObjectObservable<any>;
  public isMyProfile: boolean;

  constructor(
    public nav: NavController,
    public afService: AF,
    public navParams: NavParams
  ){
    this.currentProfile = this.afService.getUserProfile(this.navParams.get('userId'));
    this.isMyProfile = (this.navParams.get('userId') == this.afService.userId);
  };

  editProfile(){
    this.nav.push(EditProfile);
  }
}
