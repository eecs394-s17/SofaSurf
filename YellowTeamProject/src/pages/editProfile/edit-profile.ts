import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, ModalController } from 'ionic-angular';
import { NavController, ActionSheetController } from 'ionic-angular';
import { FirebaseObjectObservable } from 'angularfire2';
import { AF } from '../../providers/af';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { Camera } from 'ionic-native';

@Component({
  selector:'editProfile',
  templateUrl: 'edit-profile.html'
})
export class EditProfile{

  private userProfile : FormGroup;
  public currentProfile: FirebaseObjectObservable<any>;
  public base64Image: string;
  public photoarray : Array<string>;
  constructor(
    private formBuilder: FormBuilder,
    public nav: NavController,
    public afService: AF,
    public toast: ToastController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
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
      numBeds: '',
      sofaImages: ['']
    });

    this.currentProfile = this.afService.currentUser;

    this.currentProfile.subscribe(snapshot => {
      console.log(snapshot);
      this.photoarray = snapshot.sofaImages;
      this.userProfile.patchValue({
        'name': snapshot.name,
        'gender': snapshot.gender,
        'city': snapshot.city,
        'country': snapshot.country,
        'aboutMe':  snapshot.aboutMe,
        'email': snapshot.email,
        'phone': snapshot.phone,
        'canHost': snapshot.canHost,
        'numBeds': snapshot.numBeds,
        'sofaImages': snapshot.sofaImages
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
      numBeds: Number(this.userProfile.value.numBeds),
      sofaImages: this.userProfile.value.sofaImages,
    }).then(
      _ => this.nav.pop()
    );
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      if (data) {
        this.userProfile.patchValue({'city':data.city});
        this.userProfile.patchValue({'country':data.country});
      }
    });
    modal.present();
  }

  takePicture(){
    console.log("takePicture function called");
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 500,
        targetHeight: 500
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        if(this.photoarray[0] != '') this.photoarray.push(this.base64Image);
        else this.photoarray[0] = this.base64Image;
        console.log(this.base64Image);
        this.userProfile.patchValue({'sofaImages':this.photoarray});
    }, (err) => {
        console.log(err);
    });
  }

  getPicture(){
    console.log("getPicture function called")
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      targetHeight: 500,
      targetWidth: 500
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      if(this.photoarray[0] != '') this.photoarray.push(this.base64Image);
      else this.photoarray[0] = this.base64Image;
      console.log(this.base64Image);
      this.userProfile.patchValue({'sofaImages':this.photoarray});
    }, (err) => {
      console.log(err);
    });
  }


  openCameraOpt() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePicture();
          }
        },{
          text: 'Choose Photo',
          handler: () => {
            this.getPicture();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
