import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Platform, Nav, NavController, Events } from 'ionic-angular';

@Component({
  selector:'editProfile',
  templateUrl: 'edit-profile.html'
})
export class EditProfile{
  
  private userprofile : FormGroup;
  
  constructor( private formBuilder: FormBuilder, public nav: NavController) {
    this.userprofile = this.formBuilder.group({
      aboutMe: ['', Validators.required],
      gender: [''],
      phone: [''],
      numBeds: ['']
    });
  }

  logForm(){
    console.log(this.userprofile.value)
  }
 

  Goback(){
    this.nav.pop();
  }
}

