import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'camera.html'
})

export class CameraPage{
  base64Image: string;
  constructor(){}

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.FILE_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        return this.base64Image;
    }, (err) => {
        console.log(err);
    });
  }
}
