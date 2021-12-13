import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CityWeatherDto } from '../models/city-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
  };

  constructor(private httpClient: HttpClient) { }

  getWeatherForCity(cityName: string): Observable<CityWeatherDto>{
    return this.httpClient.get<any>(`http://localhost:64537/api/weather?cityName=${cityName}`, this.httpOptions)
    .pipe(
      tap(data => console.log(data)),
      map(data => ({
        cityName: data.name,
        cityCountry: data.sys.country,
        cityDescription: data.weather[0].description,
        tempK: data.main.temp,
        tempC: Math.round(data.main.temp - 273.15)
      }) as CityWeatherDto),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    console.error(err);
    return throwError(err.error.message);
  }
}
