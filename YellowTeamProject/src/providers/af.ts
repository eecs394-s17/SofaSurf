import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class AF {
  public hostList: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public userId: string;
  public currentUser: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.hostList = this.af.database.list('users');
    this.af.auth.subscribe((auth) => {
      if (auth != null) {
        this.setOrCreateUser(auth);
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

  setOrCreateUser(auth){
    this.userId = auth.uid;
    this.currentUser = this.af.database.object('users/' + auth.uid);
    this.currentUser.subscribe((obj)=>{
      if (!obj.$exists()) {
        this.currentUser.update({
          name: auth.displayName,
          email: auth.email,
          photoURL: auth.photoURL
        });
      };
    });
  }

}
