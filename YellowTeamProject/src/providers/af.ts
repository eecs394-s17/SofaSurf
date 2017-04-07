import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class AF {
  public hostList: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public users: FirebaseListObservable<any>;
  public user: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
    });

    this.users = this.af.database.list('users');

    this.hostList = this.af.database.list('users');

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

  addUserInfo(){
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

}
