import { WeatherData } from '@/lib/types';
import { TemperatureUnit } from '@/lib/utils';
import ForecastCard from './ForecastCard';

interface ForecastProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export default function Forecast({ data, unit }: ForecastProps) {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        5-Day Forecast
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.daily.time.map((date, index) => (
          <ForecastCard
            key={date}
            date={date}
            weatherCode={data.daily.weatherCode[index]}
            tempMax={data.daily.temperatureMax[index]}
            tempMin={data.daily.temperatureMin[index]}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}
