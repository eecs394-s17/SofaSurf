import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AF } from '../providers/af';

import { LoginPage } from '../pages/login/login';
import { MainSearchPage } from '../pages/main-search/main-search';
import { EditProfile } from '../pages/editProfile/edit-profile';

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
    storage: Storage
  ) {

    this.afService.af.auth.subscribe((auth) => {
      if (auth == null) {
        this.nav.setRoot(LoginPage);
      } else {
        // TODO: add photoURL to below test if needed
        if (this.afService.userId && this.afService.displayName){
          this.nav.setRoot(MainSearchPage);
        } else {
          this.nav.setRoot(LoginPage);
        }
      }
    });

    this.initializeApp();

    this.pages = [
      { title: 'Search', component: MainSearchPage},
      { title: 'Edit My Profile', component: EditProfile }
    ]
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
 
  logout() {
    this.afService.logout();
  }


}
