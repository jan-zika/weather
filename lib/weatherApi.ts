import { WeatherData } from './types';

export async function getWeatherData(latitude: number, longitude: number, city: string = 'Unknown', country: string = ''): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`;
  
  const response = await fetch(url, { next: { revalidate: 300 } }); // Cache for 5 minutes
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  
  return {
    current: {
      temperature: Math.round(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      windSpeed: Math.round(data.current.wind_speed_10m),
      humidity: data.current.relative_humidity_2m,
      time: data.current.time,
    },
    daily: {
      time: data.daily.time.slice(1, 6), // Next 5 days
      temperatureMax: data.daily.temperature_2m_max.slice(1, 6).map((t: number) => Math.round(t)),
      temperatureMin: data.daily.temperature_2m_min.slice(1, 6).map((t: number) => Math.round(t)),
      weatherCode: data.daily.weather_code.slice(1, 6),
    },
    location: {
      city,
      country,
    },
  };
}

export async function getCityCoordinates(city: string): Promise<{ latitude: number; longitude: number; name: string; country: string } | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    return null;
  }
  
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    return null;
  }
  
  const result = data.results[0];
  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country || '',
  };
}
