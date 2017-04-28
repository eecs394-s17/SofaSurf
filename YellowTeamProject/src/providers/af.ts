import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Facebook, Device } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';
import { Http, Response, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';

@Injectable()

export class AF {
  public hostList: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public userId: string;
  public currentUser: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public platform : Platform, private http: Http) {
    this.hostList = this.af.database.list('users');
    this.af.auth.subscribe((data) => {
      console.log('constructor set or create called');
      if (data != null) {
        this.setOrCreateUser(data);
      }
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
      if (!obj.$exists()) {
        let newUser = {
          name: data.auth.displayName,
          email: (data.auth.email) ? data.auth.email : "",
          photoURL: data.auth.photoURL,
          gender: '',
          city: '',
          country: '',
          aboutMe: '',
          phone: '',
          canHost: '',
          numBeds: '',
          sofaImages: [''],
          numMutual: ''
        };
        console.log(newUser);
        this.currentUser.update(newUser);
      };
    });
  }


  doFacebookLogin() {
        if (this.platform.is('cordova')) {
          console.log("cordova platform");
          return Facebook.login(['public_profile', 'email', 'user_friends']).then(facebookData => {
            let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
            firebase.auth().signInWithCredential(provider);
          }, error => {
            console.log(error);
          });
        } else {
          console.log("non-cordova platform");
          this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
          }).then((facebookData) => {
          }).catch((error) => {
            console.info("error", error);
          });
        }
    }

  getMutualFriends(userId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = {
      userId1: this.userId,
      userId2: userId,
      accessToken: ''
    };

    return this.http.post('/mutualFriends',
      JSON.stringify(data),
      options)
      .toPromise()
      .then(data=>{
       	return Promise.resolve(data.json());
      });
    }
}
