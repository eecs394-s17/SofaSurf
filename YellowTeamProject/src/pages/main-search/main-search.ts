import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, ToastController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-main-search',
  templateUrl: 'main-search.html'
})
export class MainSearchPage {
  username:string;
  city:any;
  country:any;
  day:any;
  month:any;
  year:any;
  constructor(public nav: NavController, public event: Events, public toast: ToastController) {
    this.city = "";
    this.country = "";
    this.day = "";
    this.month = "";
    this.year = "";
    this.event.subscribe('login', (username) => {
      this.username = username;
    });
  }
  search(){
    if(this.city != "" && this.country != "" && this.day != "" && this.month != "" && this.year != ""){
      this.nav.push(ListPage);
      this.event.publish('location', this.city, this.country, this.day, this.month, this.year, this.username);
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

}
