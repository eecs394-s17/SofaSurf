import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';

@Injectable()
export class AF {
  public hostList: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public userId: string;
  public photoURL: string;

  constructor(public af: AngularFire, public storage: Storage) {
    this.hostList = this.af.database.list('users');
    this.storage.ready().then(_=>{
      this.storage.get('loggedInUserId').then((val)=>
        this.userId = val
      );
      this.storage.get('loggedInUserDisplayName').then((val)=>
        this.displayName = val
      );
      this.storage.get('loggedInUserPhotoURL').then((val)=>
        this.photoURL = val
      );
    });
  }

  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then((data) => {
      this.userId = data.uid;
      this.displayName = data.auth.displayName;
      this.photoURL = data.auth.photoURL;
      return this.storage.ready();
    }).then(_=>{
      this.storage.set('loggedInUserId', this.userId);
      this.storage.set('loggedInUserDisplayName', this.displayName);
      this.storage.set('loggedInUserPhotoURL', this.photoURL);
      return Promise.resolve();
    });
  }

  logout() {
    return this.af.auth.logout().then(_=>{
      this.storage.ready().then(_=>{
        this.storage.remove('loggedInUserId');
        this.storage.remove('loggedInUserDisplayName');
        this.storage.remove('loggedInUserPhotoURL');
      });
    });
  }

  hostsByCity(city){
    return this.af.database.list('users', {
      query: {
        orderByChild: 'City',
        equalTo: city
      }
    });
  }

  getUserProfile(userId){
    console.log('retrieving user profile for ' + userId);
    return this.af.database.object('users/' + userId);
  }


}
