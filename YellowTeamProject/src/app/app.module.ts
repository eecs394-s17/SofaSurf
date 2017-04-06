import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { MainSearchPage } from '../pages/main-search/main-search';
import { ListPage } from '../pages/list/list';
import { FormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LastPage } from '../pages/lastpage/lastpage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings : CloudSettings = {
  'core': {
    'app_id': '14e6e7d0'
  }
};

import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from "angularfire2";

const firebaseConfig = {
  apiKey: "AIzaSyD3cLDMHMx5L92kWzgXA1ThCkrIEzuksKo",
  authDomain: "test-d85aa.firebaseapp.com",
  databaseURL: "https://test-d85aa.firebaseio.com",
  projectId: "test-d85aa",
  storageBucket: "test-d85aa.appspot.com",
  messagingSenderId: "264129880167"
};


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    MainSearchPage,
    ListPage,
    LastPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    MainSearchPage,
    ListPage,
    LastPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
