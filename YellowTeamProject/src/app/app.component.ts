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
        storage.ready().then( _ => {
          let p1 = storage.get('loggedInUserId');
          let p2 = storage.get('loggedInUserDisplayName');

          Promise.all([p1,p2]).then(values => {
            if (values[0] && values[1]){
              this.afService.userId = values[0];
              this.afService.displayName = values[1];
              this.nav.setRoot(MainSearchPage);
            } else {
              this.nav.setRoot(LoginPage);
            }
          });
        });
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
 
}
