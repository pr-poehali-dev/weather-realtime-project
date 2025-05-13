
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyForecast as DailyForecastType } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { formatDay } from '@/lib/utils';

interface DailyForecastProps {
  data: DailyForecastType[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Прогноз на 7 дней</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
          {data.map((day, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg transition-all ${
                index === 0 ? 'bg-blue-50' : 'hover:bg-blue-50'
              }`}
            >
              <p className="font-medium text-center">{day.day}</p>
              <div className="flex justify-center my-2">
                <WeatherIcon iconCode={day.icon} size={36} />
              </div>
              <p className="text-xs text-center text-gray-600 mb-2">{day.description}</p>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{Math.round(day.max)}°</span>
                <span className="text-gray-500">{Math.round(day.min)}°</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyForecast;
