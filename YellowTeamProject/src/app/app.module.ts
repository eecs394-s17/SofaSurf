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
// import { AngularFireModule} from 'angularfire2';

const cloudSettings : CloudSettings = {
  'core': {
    'app_id': '14e6e7d0'
  }
};

// export const firebaseConfig = {
  // apiKey: "AIzaSyAV3cWD0196M3beNLyST1tx6MozgQ-eAnI",
  // authDomain: "sofasurf-9d718.firebaseapp.com",
  // databaseURL: "https://sofasurf-9d718.firebaseio.com",
  // projectId: "sofasurf-9d718",
  // storageBucket: "sofasurf-9d718.appspot.com",
  // messagingSenderId: "161909916669"
// }

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
    CloudModule.forRoot(cloudSettings)
    // AngularFireModule.initializeApp(firebaseConfig)
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
