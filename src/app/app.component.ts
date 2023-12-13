import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadImage: "../assets/images/coldWallpaper.jpg" | "../assets/images/hotWallpaper.jpg" = "../assets/images/coldWallpaper.jpg";
  altText: "cold weather image" | "hot weather image" = "cold weather image";

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

}
