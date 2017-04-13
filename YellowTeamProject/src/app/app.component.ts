import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Platform, MenuController, Nav, NavController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { LastPage } from '../pages/lastpage/lastpage';
import { MainSearchPage } from '../pages/main-search/main-search';

import { AF } from '../providers/af';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

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
        if(auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          this.nav.push( LoginPage );
        }
        else {
          console.log("Successfully Logged in.");
          this.afService.displayName = auth.facebook.displayName;
          this.afService.email = auth.facebook.email;
          this.isLoggedIn = true;
          this.nav.push( MainSearchPage );
        }
      }
    );
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
