import { Component } from '@angular/core';

import { NavController, NavParams, Nav } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { LastPage } from '../lastpage/lastpage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  username:string;
  city:any;
  country:any;
  day:any;
  month:any;
  year:any;

  hosts : Array<{component:any, name:string, country:string, city:string, connection:string, degree:string, intro:string, hostimg:string, sofaimg1:any, sofaimg2:any, sofaimg3:any, phone:string, email:string}>
  constructor(public nav: NavController, public navParams: NavParams, public event: Events) {
    this.event.subscribe('location', (city, country, day, month, year, username) => {
      this.city = city;
      this.country = country;
      console.log(this.city, this.country);
      this.month = month;
      this.day = day;
      this.year = year;
      this.username = username;
    });

    this.hosts=[
      {
       component:LastPage,
       name:'Rachael Ferm',
       country:'United States',
       city: 'Evanston',
       connection:'Jake Ferm',
       degree:"2nd Degree",
       intro: "Hi Friends! I am located in the heart of Evanston and would love to host you! Evanston is only 20 minutes north of the heart of Chicago and is right on Lake Michigan.",
       hostimg:'assets/images/Rachael.jpg',
       sofaimg1:'assets/images/Rachael-Sofa.jpg',
       sofaimg2:'assets/img/sofa.JPG',
       sofaimg3:'assets/img/sofa.JPG',
       phone:'812459342',
       email:'rachael_ferm@gmail.com'
     },

      {
       component:LastPage,
       name:'Naomi Gutstein',
       country: "United States",
       city:"Evanston",
       connection:'198 mutual friends',
       degree:"1st Degree",
       intro:'Hey guys! Thinking of coming to visit Northwestern? I am more than happy to host you and show you around! I can host up to 3 people: one on my couch and two on my air matress.',
       hostimg:'assets/images/Naomi.jpg',
       sofaimg1:'assets/images/Naomi-Sofa.jpg',
       sofaimg2:'assets/img/sofa.JPG',
       sofaimg3:'assets/img/sofa.JPG',
       phone:'982351678',
       email:'naigutstein@gmail.com'
     },

      {
        component:LastPage,
        name:'Jacqueline Korren',
        country:"United States",
        city:"Evanston, Illinois",
        connection:'Verinder Syal',
        degree:"2nd Degree",
        intro:'Hey hey friends! Thinking of coming to visit Northwestern? Come stay with me! I will show you around the campus and can give you a ton of recommendations for things to do in Chicago. I can host up to 2 people.',
        hostimg:'assets/images/Jacqueline.jpg',
        sofaimg1:'assets/images/Jacqueline-Sofa.jpg',
        sofaimg2:'assets/img/sofa.JPG',
        sofaimg3:'assets/img/sofa.JPG',
        phone:'13562453423',
        email:'jkorren@gmail.com'
      }

    ];
  }
  Goback(){
    this.nav.pop();
  }
  GoDetail(page:any){
    this.nav.push(page.component);
    this.event.publish('detail', page.name, page.location, page.connection, page.degree, page.intro, page.hostimg, page.sofaimg1, page.sofaimg2, page.sofaimg3, page.phone, page.email, this.username);
  }

}
