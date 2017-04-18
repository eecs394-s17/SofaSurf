import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { MainSearchPage } from '../pages/main-search/main-search';

import { AF } from '../providers/af';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  rootPage: any = LoginPage;
  public isLoggedIn: boolean;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afService: AF
  ) {

    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null || this.afService.userId == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          this.nav.push( LoginPage );
        }
        else {
          console.log("Successfully Logged in.");
          this.isLoggedIn = true;
          this.nav.push( MainSearchPage );
        }
      }
    );
    this.initializeApp();

    this.pages = [
    { title: 'MainSearch', component: MainSearchPage},
    { title: 'LoginPage', component: LoginPage}]
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    this.nav.setRoot(page.component);
  }
 
}
