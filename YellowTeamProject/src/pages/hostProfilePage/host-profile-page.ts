import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController, NavParams} from 'ionic-angular';
import { AF } from '../../providers/af';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector:'HostProfilePage',
  templateUrl: 'host-profile-page.html'
})
export class HostProfilePage {
  hostProfile: FirebaseObjectObservable<any>;


  constructor(
    public toastCtrl: ToastController,
    public nav: NavController,
    public navParams: NavParams,
    public afService: AF
  ){
    this.hostProfile = this.afService.getUserProfile(this.navParams.get('hostId'));
  };


  // addComment(){
  //   if(this.newcomment != "" && this.rate != ""){
  //     var comment={
  //         headimg:this.newheadimg,
  //         first_name:this.first_name,
  //         last_name:this.last_name,
  //         comment:this.newcomment,
  //         rate:this.rate
  //     };
  //     this.Comments.push(comment);
  //     this.newcomment = "";
  //     this.rate = "";
  //     this.warning = "";
  //   }
  //   else{
  //     let toast = this.toastCtrl.create({
  //       message: 'Input Comment and Rate',
  //       position: "middle",
  //       duration: 1000
  //     });
  //     toast.present();
  //   }
  // }
}
