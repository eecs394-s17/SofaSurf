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

  hosts : Array<{component:any, name:string, location:string, connection:string, degree:string, intro:string, hostimg:string, sofaimg1:any, sofaimg2:any, sofaimg3:any, phone:string, email:string}>
  constructor(public nav: NavController, public navParams: NavParams, public event: Events) {

    this.hosts=[
      {
       component:LastPage,
       name:'Marty McFly',
       location:"Evanston",
       connection:'Menglei Lei',
       degree:"2nd Degree",
       intro:'some introduction to the sofa11',
       hostimg:'assets/img/menglei.jpeg',
       sofaimg1:'assets/img/sofa.JPG',
       sofaimg2:'assets/img/sofa.JPG',
       sofaimg3:'assets/img/sofa.JPG',
       phone:'812459342',
       email:'11111@gmail.com'
     },

      {
       component:LastPage,
       name:'AAAAA BBBBB',
       location:"Los Angeles",
       connection:'Menglei Lei',
       degree:"1st Degree",
       intro:'some introduction to the sofa22',
       hostimg:'assets/img/menglei.jpeg',
       sofaimg1:'assets/img/sofa.JPG',
       sofaimg2:'assets/img/sofa.JPG',
       sofaimg3:'assets/img/sofa.JPG',
       phone:'982351678',
       email:'222222@gmail.com'
     },

      {
        component:LastPage,
        name:'CCCCC DDDDD',
        location:"San Jose",
        connection:'Menglei Lei',
        degree:"3rd Degree",
        intro:'some introduction to the sofa33',
        hostimg:'../../assets/img/menglei.jpeg',
        sofaimg1:'../../assets/img/sofa.JPG',
        sofaimg2:'../../assets/img/sofa.JPG',
        sofaimg3:'../../assets/img/sofa.JPG',
        phone:'13562453423',
        email:'33333@gmail.com'
      },

      {
        component:LastPage,
        name:'EEEEE FFFFFF',
        location:"Chicago",
        connection:'Menglei Lei',
        degree:"4th Degree",
        intro:'some introduction to the sofa44',
        hostimg:'../../assets/img/menglei.jpeg',
        sofaimg1:'../../assets/img/sofa.JPG',
        sofaimg2:'../../assets/img/sofa.JPG',
        sofaimg3:'../../assets/img/sofa.JPG',
        phone:'44542362246',
        email:'444444@gmail.com'
      }

    ];
  }
  Goback(){
    this.nav.pop();
  }
  GoDetail(page:any){
    console.log('got the detail.');
    this.nav.push(page.component);
    this.event.publish('detail', page.name, page.location, page.connection, page.degree, page.intro, page.hostimg, page.sofaimg1, page.sofaimg2, page.sofaimg3, page.phone, page.email);
  }

}
