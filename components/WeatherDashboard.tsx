'use client';

import { useState, useEffect } from 'react';
import { WeatherData } from '@/lib/types';
import { TemperatureUnit } from '@/lib/utils';
import { getWeatherData, getCityCoordinates } from '@/lib/weatherApi';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import SearchBar from './SearchBar';
import Chatbot from './Chatbot';
import { Loader2, AlertCircle } from 'lucide-react';

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const fetchWeatherForCity = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const coordinates = await getCityCoordinates(cityName);
      
      if (!coordinates) {
        setError(`City "${cityName}" not found. Please try another city.`);
        setIsLoading(false);
        return;
      }
      
      const data = await getWeatherData(
        coordinates.latitude,
        coordinates.longitude,
        coordinates.name,
        coordinates.country
      );
      
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherForLocation = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(latitude, longitude, 'Your Location');
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Try to get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherForLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // If geolocation fails, default to New York
          fetchWeatherForCity('New York');
        }
      );
    } else {
      // If geolocation not supported, default to New York
      fetchWeatherForCity('New York');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
              Weather Dashboard
            </h1>
            <button
              onClick={toggleUnit}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
              aria-label="Toggle temperature unit"
            >
              °{unit === 'celsius' ? 'C' : 'F'}
            </button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get real-time weather updates for any city
          </p>
        </header>

        <SearchBar onSearch={fetchWeatherForCity} isLoading={isLoading} />

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-200 text-lg">{error}</p>
            </div>
          </div>
        )}

        {!isLoading && weatherData && (
          <div className="space-y-8">
            <CurrentWeather data={weatherData} unit={unit} />
            <Forecast data={weatherData} unit={unit} />
          </div>
        )}
      </div>
      
      <Chatbot />
    </div>
  );
}
