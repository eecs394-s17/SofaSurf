import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-main-search',
  templateUrl: 'main-search.html'
})
export class MainSearchPage {
  constructor(public nav: NavController, public event: Events) { }
  search(){
  	this.event.publish('search')
  	this.nav.push(ListPage);
  }
  Goback(){
    this.nav.pop();
  }

}

