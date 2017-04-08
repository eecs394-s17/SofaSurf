import { Component } from '@angular/core';

import { NavController, NavParams, Nav } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { LastPage } from '../lastpage/lastpage';
// import firebase from 'firebase';
// import { AngularFireModule } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from '../../providers/af';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  // username:string;
  // city:any;
  // country:any;
  // day:any;
  // month:any;
  // year:any;
  // db:any;
  // hostList: Array<{name:string, city:string, country:string, email:string, canHost:any}>;
  public hostList: FirebaseListObservable<any>;

  constructor(public nav: NavController, public navParams: NavParams, public event: Events, public afService: AF) {
    this.hostList = this.afService.hostList;
    // this.event.subscribe('location', (city, country, day, month, year, username) => {
    //   this.city = city;
    //   this.country = country;
    //   console.log(this.city, this.country);
    //   this.month = month;
    //   this.day = day;
    //   this.year = year;
    //   this.username = username;
    // });
    // this.hostList = [];
    // this.db = firebase.database();
    // this.db.ref('/users').orderByChild('City').equalTo('Chicago').on("value", function(snapshot){
    //   snapshot.forEach(function(data){
    //     console.log(data.key + "," + data.val().Name);
    //     this.hostList.push({
    //       name: data.val().Name,
    //       city: data.val().City,
    //       country : data.val().Country,
    //       email: data.val().Email,
    //       canHost: data.val().canHost
    //     });
    //   });
    // });
  }
  Goback(){
    this.nav.pop();
  }
  GoDetail(page:any){
    this.nav.push(page.component);
    // this.event.publish('detail', page.first_name, page.last_name, page.location, page.connection, page.degree, page.intro, page.hostimg, page.sofaimg1, page.sofaimg2, page.sofaimg3, page.phone, page.email, this.username);
  }

}
