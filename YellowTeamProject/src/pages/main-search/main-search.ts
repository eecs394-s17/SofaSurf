import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import {googlemaps} from 'googlemaps';
import {AutocompletePage} from '../autocomplete/autocomplete';
// import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-main-search',
  templateUrl: 'main-search.html'
})
export class MainSearchPage {
  username:string;
  day:any;
  month:any;
  year:any;
  address:any;
  autocompleteLocality: any;
  autocompleteCountry: any;
  localityForm: any;
  countryForm: any;
  localDate: any;
  constructor(public nav: NavController, public event: Events, public toast: ToastController, public modalCtrl: ModalController) {
    this.address = {
          city: '',
          country: ''
        };
    this.day = "1";
    this.month = "Jan";
    this.year = "2017";
    this.event.subscribe('login', (username) => {
      this.username = username;
    });

    this.localityForm = {
      locality: 'long_name',
      country: 'long_name'
    };
    this.countryForm = {
      country: 'long_name'
    };

    // this.localDate = new Date();

  //   this.datePicker.show({
  //   date: new Date(),
  //   mode: 'date',
  //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  // }).then(
  //   date => console.log('Got date: ', date),
  //   err => console.log('Error occurred while getting date: ', err)
  // );

  }
  search(){
    if(this.address.country != ""){
      this.nav.push(ListPage);
      this.event.publish('location', this.address.city, this.address.country, this.day, this.month, this.year, this.username);
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
  Goback(){
    this.nav.pop();
  }
  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      var address = data.split(', ');
      console.log(address[0]);
      console.log(address[address.length - 1]);
      this.address.city = address[0];
      this.address.country = address[address.length - 1];
    });
    modal.present();
  }

  setDate(data: Date){
    this.localDate = data;

  }


}
