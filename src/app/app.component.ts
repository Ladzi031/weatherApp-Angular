import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { weatherData } from './models/weather.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  whiteText: boolean = false;
  loadImage = "../assets/images/coldWallpaper.jpg";

  altText: "cold weather image" | "hot weather image" = "cold weather image";

  data !: weatherData;

  private renderImage = {
    hot: "../assets/images/hotWallpaper.jpg",
    cold: "../assets/images/coldWallpaper.jpg"
  }

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.fetchWeatherData().subscribe({
      next: (data) => {
        this.data = data;
        let currentTemp_c = data.current.temp_c;
        let isSunny: boolean = this.isHotWeather(currentTemp_c);
        this.displayImage(isSunny);
      }
    });
  }
  displayInfo(data: weatherData) {
    this.data = data;
    let currentTemp_c = data.current.temp_c;
    let isSunny: boolean = this.isHotWeather(currentTemp_c);
    this.displayImage(isSunny);
  }

  private isHotWeather(temp: number): boolean {
    this.whiteText = temp > 15;
    return temp > 15;
  }
  private displayImage(isSunny: boolean): void {
    this.loadImage = isSunny ? this.renderImage.hot : this.renderImage.cold;
  }
}