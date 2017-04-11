import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Platform, Nav, NavController, Events } from 'ionic-angular';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';
@Component({
  selector:'LastPage',
  templateUrl: 'lastpage.html'
})
export class LastPage {
  Comments:Array<{headimg:string, first_name:string, last_name:string, comment:string, rate:any}>;
  newheadimg:string;
  newname:string;
  newcomment:string;
  rate:any;
  warning:string;
  first_name:string;
  last_name:string;
  location:string;
  connection:string;
  degree:string;
  intro:string;
  hostimg:string;
  sofa1:string;
  sofa2:string;
  sofa3:string;
  phone:string;
  email:string;
  constructor(
    public toastCtrl: ToastController,
    public nav: NavController,
    public event: Events
  ){
    this.Comments=[
      {headimg:"http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg", first_name:"Menglei", last_name:"Smith", comment:"This is good!", rate:"Very Good"},
      {headimg:"http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg", first_name:"Alex", last_name:"Joe", comment:"This is bad!", rate:"Very Bad"}

    ];
    this.newheadimg = "http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg";
    this.newcomment = "";
    this.rate = "";
    this.event.subscribe('detail', (first_name, last_name, location, connection, degree, intro, hostimg, sofaimg1, sofaimg2, sofaimg3, phone, email, username) => {
      this.first_name = first_name;
      this.last_name = last_name;
      this.location = location;
      this.connection = connection;
      this.degree = degree;
      this.intro = intro;
      this.hostimg = hostimg;
      this.sofa1 = sofaimg1;
      this.sofa2 = sofaimg2;
      this.sofa3 = sofaimg3;
      this.phone = phone;
      this.email = email;
      this.newname = username;
    });
  };


  addComment(){
    if(this.newcomment != "" && this.rate != ""){
      var comment={
          headimg:this.newheadimg,
          first_name:this.first_name,
          last_name:this.last_name,
          comment:this.newcomment,
          rate:this.rate
      };
      this.Comments.push(comment);
      this.newcomment = "";
      this.rate = "";
      this.warning = "";
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Input Comment and Rate',
        position: "middle",
        duration: 1000
      });
      toast.present();
    }
  }

  Goback(){
    this.nav.pop();
  }
}
