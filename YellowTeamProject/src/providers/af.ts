import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class AF {
  public hostList: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public userId: string;

  constructor(public af: AngularFire) {
    this.hostList = this.af.database.list('users');
  }

  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then((data) => {
      console.log(data);
      this.userId = data.uid;
      this.displayName = data.auth.displayName;
    });
  }

  logout() {
    return this.af.auth.logout();
  }

  addHost(hostInfo){
    this.hostList.push(hostInfo);
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
