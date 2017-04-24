import { Component } from '@angular/core';
import { AF } from '../../providers/af';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public afService: AF) {};

  login() {
    this.afService.doFacebookLogin();
  }
}
