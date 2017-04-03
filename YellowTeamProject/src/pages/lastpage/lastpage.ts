import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Platform, Nav, NavController, Events } from 'ionic-angular';
import { ListPage } from '../list/list';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
@Component({
  selector:'LastPage',
  templateUrl: 'lastpage.html'
})
export class LastPage {
  Comments:Array<{headimg:string, name:string, comment:string, rate:any}>;
  newheadimg:string;
  newname:string;
  newcomment:string;
  rate:any;
  warning:string;
  name:string;
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
      {headimg:"http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg", name:"Menglei", comment:"This is good!", rate:"Very Good"},
      {headimg:"http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg", name:"Alex", comment:"This is bad!", rate:"Very Bad"}

    ];
    this.newheadimg = "http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg";
    this.newname = "Random";
    this.newcomment = "";
    this.rate = "";
    this.event.subscribe('detail', (name, location, connection, degree, intro, hostimg, sofaimg1, sofaimg2, sofaimg3, phone, email) => {
      this.name = name;
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
    });
  };


  addComment(){
    if(this.newcomment != "" && this.rate != ""){
      var comment={
          headimg:this.newheadimg,
          name:this.newname,
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
