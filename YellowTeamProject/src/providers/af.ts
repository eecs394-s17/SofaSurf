import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';

@Injectable()
export class AF {
  public hostList: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public userId: string;

  constructor(public af: AngularFire, public storage: Storage) {
    this.hostList = this.af.database.list('users');
  }

  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then((data) => {
      this.userId = data.uid;
      this.displayName = data.auth.displayName;
      this.storage.ready().then(() => {
        this.storage.set('loggedInUserId', this.userId);
        this.storage.set('loggedInUserDisplayName', this.displayName);
      })
    });
  }

  logout() {
    return this.af.auth.logout();
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
