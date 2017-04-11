import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { MainSearchPage } from '../pages/main-search/main-search';
import { ListPage } from '../pages/list/list';
import { FormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LastPage } from '../pages/lastpage/lastpage';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { AngularFireModule,AuthProviders,AuthMethods } from 'angularfire2';
import { AF } from "../providers/af";

const cloudSettings : CloudSettings = {
  'core': {
    'app_id': '14e6e7d0'
  }
};

export const firebaseConfig = {
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
    MainSearchPage,
    ListPage,
    LastPage,
    AutocompletePage
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
    MainSearchPage,
    ListPage,
    LastPage,
    AutocompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AF
  ]
})
export class AppModule {}
