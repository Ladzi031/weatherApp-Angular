import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { weatherData } from './models/weather.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadImage: "../assets/images/coldWallpaper.jpg" | "../assets/images/hotWallpaper.jpg" = "../assets/images/coldWallpaper.jpg";
  altText: "cold weather image" | "hot weather image" = "cold weather image";

  data !: weatherData;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.fetchWeatherData().subscribe({
      next: (data) => {
        this.data = data;
      }
    });
  }
  displayInfo(data: weatherData) {
    this.data = data;
  }
}

/*
 list: any[] = [
    {
      measurement: "temperature",
      pic: "../assets/images/cold.png",
      altText: "cold weather",
      value: 34
    },
    {
      measurement: "temperature",
      pic: "../assets/images/cold.png",
      altText: "cold weather",
      value: 34
    },
    {
      measurement: "temperature",
      pic: "../assets/images/cold.png",
      altText: "cold weather",
      value: 34
    },
    {
      measurement: "temperature",
      pic: "../assets/images/cold.png",
      altText: "cold weather",
      value: 34
    }
  ];
*/
