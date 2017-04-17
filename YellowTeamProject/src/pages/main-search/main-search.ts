import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import {googlemaps} from 'googlemaps';
import {AutocompletePage} from '../autocomplete/autocomplete';
import { EditProfile } from '../editProfile/edit-profile';
import { AF } from '../../providers/af';


@Component({
  selector: 'page-main-search',
  templateUrl: 'main-search.html'
})
export class MainSearchPage {
  address: any;

  localStartDate: any;
  localEndDate: any;

  constructor(
    public nav: NavController,
    public event: Events,
    public toast: ToastController,
    public modalCtrl: ModalController,
    public afService: AF
    ) {
    this.address = {
          city: '',
          country: ''
        };

  }
  search(){
    if(this.address.country != ""){
      this.nav.push(ListPage);
      this.event.publish('location', this.address.city, this.address.country, this.localStartDate, this.localEndDate);
    }
    else{
      let toast = this.toast.create({
        message: 'Please select correct date or location',
        position: "middle",
        duration: 1000
      });
      toast.present();
    }
  }
  
  editProfile(){
    this.nav.push(EditProfile);
  }

  Goback(){
    this.nav.pop();
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      var address = data.split(', ');
      console.log(address[0]);
      console.log(address[address.length - 1]);
      this.address.city = address[0];
      this.address.country = address[address.length - 1];
    });
    modal.present();
  }

  setStartDate(data: Date){
    this.localStartDate = data;
  }

  setEndDate(data: Date){
    this.localEndDate = data;
  }


}
