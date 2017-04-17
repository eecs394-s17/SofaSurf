import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { FirebaseObjectObservable } from 'angularfire2';
import { AF } from '../../providers/af';
import {AutocompletePage} from '../autocomplete/autocomplete';

@Component({
  selector:'editProfile',
  templateUrl: 'edit-profile.html'
})
export class EditProfile{
  
  private userProfile : FormGroup;
  public currentProfile: FirebaseObjectObservable<any>;
  
  constructor(
    private formBuilder: FormBuilder,
    public nav: NavController,
    public afService: AF,
    public toast: ToastController,
    public modalCtrl: ModalController
    ) {

    this.userProfile = this.formBuilder.group({
      aboutMe: ['', Validators.required],
      gender: [''],
      phone: [''],
      numBeds: [''],
      city: [''],
      country: ['']
    });

    this.currentProfile = this.afService.getUserProfile(this.afService.userId);
    this.currentProfile.subscribe(snapshot => {
      this.userProfile.patchValue({
        'aboutMe':  snapshot.aboutMe,
        'gender': snapshot.gender,
        'phone': snapshot.phone,
        'numBeds': snapshot.numBeds,
        'city': snapshot.city,
        'country': snapshot.country
      });
    });
  }

  updateUser() {
    this.currentProfile.update({
      aboutMe: this.userProfile.value.aboutMe,
      gender: this.userProfile.value.gender,
      phone: this.userProfile.value.phone,
      numBeds: this.userProfile.value.numBeds,
      city: this.userProfile.value.city,
      country: this.userProfile.value.country
    }).then(
      _ => console.log(this.currentProfile)
    );
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      var address = data.split(', ');
      this.userProfile.patchValue({'city':address[0]});
      this.userProfile.patchValue({'country':address[address.length - 1]});
    });
    modal.present();
  }


  Goback(){
    this.nav.pop();
  }
}

