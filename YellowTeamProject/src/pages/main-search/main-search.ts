import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-main-search',
  templateUrl: 'main-search.html'
})
export class MainSearchPage {
  constructor(public nav: NavController) { }
  search(){
  	this.nav.push(ListPage);
  }
}
