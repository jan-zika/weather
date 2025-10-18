import { WeatherData } from '@/lib/types';
import { getWeatherInfo } from '@/lib/weatherCodes';
import { convertTemperature, getTemperatureSymbol, TemperatureUnit } from '@/lib/utils';
import { Wind, Droplets, MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const weatherInfo = getWeatherInfo(data.current.weatherCode);
  const date = new Date(data.current.time);
  const temperature = convertTemperature(data.current.temperature, unit);
  const tempSymbol = getTemperatureSymbol(unit);
  
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5" />
        <h2 className="text-2xl font-bold">
          {data.location.city}
          {data.location.country && `, ${data.location.country}`}
        </h2>
      </div>
      
      <div className="text-sm opacity-90 mb-6">
        {date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-7xl font-bold mb-2">
            {temperature}{tempSymbol}
          </div>
          <div className="text-xl opacity-90">
            {weatherInfo.description}
          </div>
        </div>
        
        <div className="text-8xl">
          {weatherInfo.icon}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
        <div className="flex items-center gap-3">
          <Wind className="w-6 h-6 opacity-80" />
          <div>
            <div className="text-sm opacity-80">Wind Speed</div>
            <div className="text-xl font-semibold">{data.current.windSpeed} km/h</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Droplets className="w-6 h-6 opacity-80" />
          <div>
            <div className="text-sm opacity-80">Humidity</div>
            <div className="text-xl font-semibold">{data.current.humidity}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
