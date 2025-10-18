import { getWeatherInfo } from '@/lib/weatherCodes';
import { convertTemperature, getTemperatureSymbol, TemperatureUnit } from '@/lib/utils';

interface ForecastCardProps {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  unit: TemperatureUnit;
}

export default function ForecastCard({ date, weatherCode, tempMax, tempMin, unit }: ForecastCardProps) {
  const weatherInfo = getWeatherInfo(weatherCode);
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const maxTemp = convertTemperature(tempMax, unit);
  const minTemp = convertTemperature(tempMin, unit);
  const tempSymbol = getTemperatureSymbol(unit);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <div className="text-center">
        <div className="font-bold text-lg text-gray-800 dark:text-white mb-1">
          {dayName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {monthDay}
        </div>
        
        <div className="text-5xl mb-4">
          {weatherInfo.icon}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {weatherInfo.description}
        </div>
        
        <div className="flex justify-center items-center gap-3">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {maxTemp}{tempSymbol}
          </div>
          <div className="text-xl text-gray-400 dark:text-gray-500">
            {minTemp}{tempSymbol}
          </div>
        </div>
      </div>
    </div>
  );
}
