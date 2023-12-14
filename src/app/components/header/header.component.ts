import { Component } from '@angular/core';
import { Notify } from 'notiflix';
import { validateCityName } from 'src/app/utils/cityNameValidate';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cityName: string = "";
  constructor() {

  }

  getWeather() {
    if (validateCityName(this.cityName) && this.cityName.length !== 0) {
      // call weatherservice,  to lowercase
      Notify.success("correct fetchingdata");

      /*something interesting:
      city with one of the shortest name in the world is "Å" located in Norway.
       */
    } else {
      Notify.failure("please double check the name of the city");
    }
  }

}
