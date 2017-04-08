import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, ToastController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-main-search',
  templateUrl: 'main-search.html'
})
export class MainSearchPage {
  username:string;
  city: string;
  country: string;
  day:any;
  month:any;
  year:any;

  autocompleteLocality: any;
  autocompleteCountry: any;
  localityForm: any;
  countryForm: any;

  constructor(public nav: NavController, public event: Events, public toast: ToastController) {
    this.city = "Evanston";
    this.country = "US";
    this.day = "1";
    this.month = "Jan";
    this.year = "2017";
    this.event.subscribe('login', (username) => {
      this.username = username;
    });

    this.localityForm = {
      locality: 'long_name',
      country: 'long_name'
    };
    this.countryForm = {
      country: 'long_name'
    };

  }
  search(){
    if(this.country != ""){
      this.nav.push(ListPage);
      this.event.publish('location', this.city, this.country, this.day, this.month, this.year, this.username);
    }
    else{
      let toast = this.toast.create({
        message: 'Please select correct date or location',
        position: "middle",
        duration: 1000
      });
      toast.present();
    }
  }
  Goback(){
    this.nav.pop();
  }

  initAutocomplete() {
    this.autocompleteLocality = new google.maps.places.Autocomplete(
        (document.getElementById('locality')),
        {types: ['geocode']});
    this.autocompleteLocality.addListener('place_changed', function(){fillInAddress(this.autocompleteLocality, true)});
    
    this.autocompleteCountry = new google.maps.places.Autocomplete(
        (document.getElementById('country')),
        {types: ['geocode']});
    this.autocompleteCountry.addListener('place_changed', function() {fillInAddress(this.autocompleteCountry, false)});
  }

  fillInAddress(autocomplete, isCity) {
    var place = autocomplete.getPlace();
    var componentForm;
    
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (isCity) {
        componentForm = this.localityForm;
      } else {
        componentForm = this.countryForm;
      }
      if (componentForm[addressType]) {
        document.getElementById(addressType).value = place.address_components[i][componentForm[addressType]];
      }
    }
  };

}
