import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Facebook, Device } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';
@Injectable()
export class AF {
  public hostList: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public userId: string;
  public currentUser: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public platform : Platform) {
    this.hostList = this.af.database.list('users');
    this.af.auth.subscribe((data) => {
      console.log('constructor set or create called');
      if (data != null) {
        this.setOrCreateUser(data);
      }
    });
  }

  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
  }

  logout() {
    return this.af.auth.logout();
  }

  hostsByCity(city){
    return this.af.database.list('users', {
      query: {
        orderByChild: 'city',
        equalTo: city
      }
    });
  }

  getUserProfile(userId){
    return this.af.database.object('users/' + userId);
  }

  setOrCreateUser(data){
    console.log(data.uid);
    this.userId = data.uid;
    this.currentUser = this.af.database.object('users/' + data.uid);
    this.currentUser.subscribe((obj)=>{
      if (!obj.$exists()) {
      console.log(data);
        let newUser = {
          name: data.auth.displayName,
          email: data.auth.email,
          photoURL: data.auth.photoURL
        };
        console.log(newUser);
        debugger;
        this.currentUser.update(newUser);
      };
    });
  }


//test!!!!!!!!
  // doFacebookLogin() {
  //   var _authInfo
  //
  //   Facebook.login(['email'])
  //     .then((_response) => {
  //       console.log(_response)
  //       //
  //       // _authInfo = _response
  //       //
  //       // return this._FBUserProfile();
  //
  //     }).then((success) => {
  //       //let p: any = firebase.auth.FacebookAuthProvider as firebase.auth.FacebookAuthProvider_Instance
  //       //this.fbProfile = success;
  //       let creds = (firebase.auth.FacebookAuthProvider as any).credential(_authInfo.authResponse.accessToken)
  //       let providerConfig = {
  //         provider: AuthProviders.Facebook,
  //         method: AuthMethods.OAuthToken,
  //         remember: 'default',
  //         scope: ['email'],
  //       };
  //       this.af.auth.login(creds, providerConfig)
  //         .then((success) => {
  //           this.setOrCreateUser(success);
  //         //   console.log("Firebase success: " + JSON.stringify(success));
  //         //
  //         //   alert(JSON.stringify(success))
  //         //
  //         //   // return this._setUpUser(creds, success.auth)
  //         })
  //         // .catch((error) => {
  //         //   console.log("Firebase failure: " + JSON.stringify(error));
  //         //   alert(JSON.stringify(error))
  //         // });
  //
  //     })
  //     .catch((_error) => { console.log(_error) })
  // }

  doFacebookLogin() {
      console.log("enter facebook login function");
      // Observable.create(observer => {
      //   console.log("enter observable");
        if (this.platform.is('cordova')) {
          console.log("cordova platform");
          Facebook.login(['public_profile', 'email']).then(facebookData => {
            let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
            firebase.auth().signInWithCredential(provider).then(firebaseData => {
              this.af.database.list('users').update(firebaseData.auth.uid, {
                name: firebaseData.displayName,
                email: firebaseData.email,
                provider: 'facebook',
                image: firebaseData.photoURL
              });
              // observer.next();
            });
          }, error => {
            // observer.error(error);
          });
        } else {
          console.log("non-cordova platform");
          this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
          }).then((facebookData) => {
            this.af.database.list('users').update(facebookData.uid, {
              name: facebookData.auth.displayName,
              email: facebookData.auth.email,
              provider: 'facebook',
              image: facebookData.auth.photoURL
            });
            // observer.next();
          }).catch((error) => {
            console.info("error", error);
            // observer.error(error);
          });
        }
      //});
    }


}
