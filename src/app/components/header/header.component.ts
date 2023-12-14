import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output, inject } from '@angular/core';
 import { Notify } from 'notiflix';
import { weatherData } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';
import { validateCityName } from 'src/app/utils/cityNameValidate';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cityName: string = "";
  weatherService: any;
  @Output() weatherInfo !: EventEmitter<weatherData>;

  constructor() {
    this.weatherService = inject(WeatherService);
    this.weatherInfo = new EventEmitter();
  }

  getWeather() {
    if (validateCityName(this.cityName) && this.cityName.length !== 0) {
      this.weatherService.setCityName(this.cityName);
      this.weatherService.fetchWeatherData().subscribe((data: weatherData) => {
        this.weatherInfo.emit(data)
      },
        (error: HttpErrorResponse) => {
          Notify.failure("No matching location found.");
          //Notify.failure(error.message);
        });
    } else {
      Notify.failure("please double check the name of the city");
    }
  }
}


