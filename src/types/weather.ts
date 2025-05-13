
export interface CurrentWeather {
  temperature: number;
  description: string;
  icon: string;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  location: string;
  country: string;
  dt: number;
}

export interface DailyForecast {
  dt: number;
  day: string;
  min: number;
  max: number;
  icon: string;
  description: string;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
}
