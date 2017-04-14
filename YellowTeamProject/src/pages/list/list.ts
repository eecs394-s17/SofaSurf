import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LastPage } from '../lastpage/lastpage';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from '../../providers/af';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  // username:string;
  city: string;
  country: string;
  // day:any;
  // month:any;
  // year:any;
  // db:any;
  // hostList: Array<{name:string, city:string, country:string, email:string, canHost:any}>;
  public hostList: FirebaseListObservable<any>;

  constructor(public nav: NavController, public navParams: NavParams, public event: Events, public afService: AF) {
    this.event.subscribe('location', (city, country, day, month, year, username) => {
      this.city = city;
      this.country = country;
      this.hostList = this.afService.hostsByCity(this.city);
    });
  }

  hostsByCountry(country){
    this.hostList = this.afService.af.database.list('users', {
      query: {
        orderByChild: 'Country',
        equalTo: country
      }
    });
  }

  hostsBySofaNum(sofanum){
    this.hostList = this.afService.af.database.list('users', {
      query: {
        orderByChild: 'SofaNum',
        equalTo: sofanum
      }
    });
  }

  hostsByDegree(connectiondegree){
    this.hostList = this.afService.af.database.list('users', {
      query: {
      orderByChild: 'Degree',
      equalTo: connectiondegree
      }
    });
  }

  hostsBycanHost(canhost){
    this.hostList = this.afService.af.database.list('users', {
      query: {
      orderByChild: 'canHost',
      equalTo: canhost
      }
    });
  }

  Goback(){
    this.nav.pop();
  }
  GoDetail(page:any){
    this.nav.push(page.component);
    // this.event.publish('detail', page.first_name, page.last_name, page.location, page.connection, page.degree, page.intro, page.hostimg, page.sofaimg1, page.sofaimg2, page.sofaimg3, page.phone, page.email, this.username);
  }

}
