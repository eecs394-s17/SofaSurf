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
    this.userId = data.uid;
    this.currentUser = this.af.database.object('users/' + data.uid);
    this.currentUser.subscribe((obj)=>{
      console.log(data);
      console.log(data.auth.displayName);
      console.log(data.auth.email);
      console.log(data.auth.photoURL);

      if (!obj.$exists()) {

        let newUser = {
          name: data.auth.displayName,
          email: data.auth.email,
          photoURL: data.auth.photoURL,
          gender: '',
          city: '',
          country: '',
          aboutMe: '',
          phone: '',
          canHost: '',
          numBeds: '',
          sofaImages: ''
        };
        console.log(newUser);
        debugger;
        this.currentUser.update(newUser);
      };
    });
  }


  doFacebookLogin() {
        if (this.platform.is('cordova')) {
          console.log("cordova platform");
          Facebook.login(['public_profile', 'email']).then(facebookData => {
            let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
            firebase.auth().signInWithCredential(provider).then(firebaseData => {
              this.setOrCreateUser(firebaseData);
            });
          }, error => {

          });
        } else {
          console.log("non-cordova platform");
          this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
          }).then((facebookData) => {
            this.setOrCreateUser(facebookData);
          }).catch((error) => {
            console.info("error", error);
          });
        }
    }
}
