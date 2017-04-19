import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { AF } from '../providers/af';

import { LoginPage } from '../pages/login/login';
import { MainSearchPage } from '../pages/main-search/main-search';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afService: AF,
  ) {
    this.afService.af.auth.subscribe((auth) => {
      if (auth == null) {
        this.nav.setRoot(LoginPage);
      } else {
        this.nav.setRoot(MainSearchPage);
      }
    });
    this.initializeApp();
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openSearchPage() {
    this.nav.setRoot(MainSearchPage);
  }

  openMyProfile() {
    this.nav.setRoot(ProfilePage, {userId: this.afService.userId});
  }
 
  logout() {
    this.afService.logout();
  }


}
