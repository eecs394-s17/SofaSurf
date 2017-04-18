import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { AutocompletePage } from '../autocomplete/autocomplete';
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
      this.nav.push(ListPage, {
        city: this.address.city,
        country: this.address.country,
        startDate: this.localStartDate,
        endDate: this.localEndDate
      });
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

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      if(data){
        var address = data.split(', ');
        console.log(address[0]);
        console.log(address[address.length - 1]);
        this.address.city = address[0];
        this.address.country = address[address.length - 1];
      }
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
