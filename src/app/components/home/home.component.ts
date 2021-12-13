import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityWeatherDto } from 'src/app/models/city-weather';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jwtCookie: any;
  searchCityName: string;
  errorMessage: string;
  currentCity: CityWeatherDto;
  subscriotion: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getWeatherForCity(): void {
    this.currentCity = null;
    if (!this.searchCityName) {
      this.errorMessage = 'Input field is required';
    } else {
      this.subscriotion = this.weatherService.getWeatherForCity(this.searchCityName)
      .subscribe(data => {
        this.currentCity = data;
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err;
      });
      this.searchCityName = '';
    }
  }

}
