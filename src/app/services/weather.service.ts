import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  nameOfCity: string = "pretoria"; // default

  constructor(private http: HttpClient) { }

  setCityName(cityName: string): void {
    this.nameOfCity = cityName.toLowerCase().trim();
    this.fetchWeatherData();
  }
  fetchWeatherData(): Observable<any> {
    // set name of city, with other data... and get data
    return this.http.get<any>("").pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
