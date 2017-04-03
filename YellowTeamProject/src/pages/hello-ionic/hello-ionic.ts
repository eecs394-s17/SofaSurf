import { Component } from '@angular/core';
import { MainSearchPage } from '../main-search/main-search';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})
export class HelloIonicPage {
  constructor(public nav: NavController) { }
  search(){
  	this.nav.push(MainSearchPage);
  }
}



