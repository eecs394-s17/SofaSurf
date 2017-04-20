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

}
