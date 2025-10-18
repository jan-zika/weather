export interface WeatherData {
  current: {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    humidity: number;
    time: string;
  };
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    weatherCode: number[];
  };
  location: {
    city: string;
    country: string;
  };
}

export interface WeatherCodeInfo {
  description: string;
  icon: string;
}
