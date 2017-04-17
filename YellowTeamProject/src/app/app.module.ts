import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MainSearchPage } from '../pages/main-search/main-search';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LastPage } from '../pages/lastpage/lastpage';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { AngularFireModule,AuthProviders,AuthMethods } from 'angularfire2';
import { AF } from "../providers/af";
import { DatePickerModule } from 'datepicker-ionic2';

import { EditProfile } from '../pages/editProfile/edit-profile';
const cloudSettings : CloudSettings = {
  'core': {
    'app_id': '14e6e7d0'
  }
};

export const firebaseConfig = {
  apiKey: "AIzaSyDCUt0-01e297EZyGx6QOMGkzevYwMDH1w",
  authDomain: "sofasurf-3848c.firebaseapp.com",
  databaseURL: "https://sofasurf-3848c.firebaseio.com",
  projectId: "sofasurf-3848c",
  storageBucket: "",
  messagingSenderId: "75660741480"
};



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MainSearchPage,
    ListPage,
    LastPage,
    AutocompletePage,
    EditProfile
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }),
    DatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainSearchPage,
    ListPage,
    LastPage,
    AutocompletePage,
    EditProfile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AF
  ]
})
export class AppModule {}
