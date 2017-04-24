import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from '../../providers/af';
import { ProfilePage } from '../profile/profile'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  city: string;
  country: string;
  public hostList: FirebaseListObservable<any>;
  newhost:any;
  constructor(public nav: NavController, public navParams: NavParams, public afService: AF) {
    this.city = this.navParams.get('city');
    this.country = this.navParams.get('country');
    this.hostsByCountry(this.country);
  }

  hostsByCountry(country){
    this.hostList = this.afService.af.database.list('users', {
      query: {
        orderByChild: 'country',
        equalTo: country
      }
    });
  }

  hostsByNumBeds(){
    debugger;
    this.hostList = this.afService.af.database.list('users', {
      query: {
        orderByChild: 'numBeds'
      }
    });
  }

  hostsByCanHost(){
    this.hostList = this.afService.af.database.list('users', {
      query: {
      orderByChild: 'canHost',
      equalTo: true
      }
    });
  }

  viewHost(hostIdVal){
    this.nav.push(ProfilePage, {userId: hostIdVal});
  }

}
