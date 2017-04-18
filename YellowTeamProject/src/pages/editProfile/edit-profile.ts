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
      name: [''],
      gender: [''],
      city: [''],
      country: [''],
      aboutMe: [''],
      email: [''],
      phone: [''],
      canHost: [''],
      numBeds: ['']
    });

    this.currentProfile = this.afService.getUserProfile(this.afService.userId);
    this.currentProfile.subscribe(snapshot => {
      console.log(snapshot);
      this.userProfile.patchValue({
        'name': snapshot.name,
        'gender': snapshot.gender,
        'city': snapshot.city,
        'country': snapshot.country,
        'aboutMe':  snapshot.aboutMe,
        'email': snapshot.email,
        'phone': snapshot.phone,
        'canHost': snapshot.canHost,
        'numBeds': snapshot.numBeds
      });
    });
  }

  updateUser() {
    this.currentProfile.update({
      name: this.userProfile.value.name,
      gender: this.userProfile.value.gender,
      city: this.userProfile.value.city,
      country: this.userProfile.value.country,
      aboutMe: this.userProfile.value.aboutMe,
      email: this.userProfile.value.email,
      phone: this.userProfile.value.phone,
      canHost: this.userProfile.value.canHost,
      numBeds: this.userProfile.value.numBeds
    }).then(
      _ => console.log(this.currentProfile)
    );
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      if (data) {
        var address = data.split(', ');
        this.userProfile.patchValue({'city':address[0]});
        this.userProfile.patchValue({'country':address[address.length - 1]});
      }
    });
    modal.present();
  }
}

