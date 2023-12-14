import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { config } from 'src/config/config';
import { weatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  nameOfCity: string = "pretoria"; // default

  constructor(private http: HttpClient) { }

  setCityName(cityName: string): void {
    this.nameOfCity = cityName.toLowerCase();
  }
  fetchWeatherData(): Observable<weatherData> {
   // console.log("fetchedWeatherData method called!")
    let headers = new HttpHeaders()
      .set(config.XRapidApiHost_label, config.XRapidApiHost_value)
      .set(config.XRapidApiKey_label, config.XRapidApiKey_value);
    let params = new HttpParams().set('q', this.getNameOfCity());
    return this.http.get<weatherData>(config.apiUrl, { headers: headers, params: params }).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }
  private getNameOfCity(): string {
    return this.nameOfCity;
  }
}
