
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CurrentWeather as CurrentWeatherType } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { formatDate } from '@/lib/utils';
import Icon from '@/components/ui/icon';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const getWeatherGradient = () => {
    // Выбор градиента в зависимости от погоды
    if (data.icon.includes('01') || data.icon.includes('02')) {
      return 'bg-gradient-to-br from-blue-400 to-blue-600'; // Ясно или малооблачно
    } else if (data.icon.includes('09') || data.icon.includes('10')) {
      return 'bg-gradient-to-br from-gray-400 to-gray-600'; // Дождь
    } else if (data.icon.includes('13')) {
      return 'bg-gradient-to-br from-indigo-300 to-indigo-500'; // Снег
    } else {
      return 'bg-gradient-to-br from-blue-300 to-blue-500'; // По умолчанию
    }
  };

  return (
    <Card className={`w-full overflow-hidden shadow-lg hover-scale ${getWeatherGradient()}`}>
      <CardContent className="p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-start">
              <WeatherIcon iconCode={data.icon} size={64} className="mr-4" />
              <div>
                <h2 className="text-3xl font-bold">{data.temperature}°C</h2>
                <p className="text-lg font-medium capitalize">{data.description}</p>
                <p className="text-sm opacity-90">Ощущается как {data.feels_like}°C</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-2xl font-bold">{data.location}</h3>
              <p className="text-sm opacity-90">{formatDate(data.dt)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Icon name="Droplets" className="mr-2" />
              <div>
                <p className="font-medium">Влажность</p>
                <p>{data.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="Wind" className="mr-2" />
              <div>
                <p className="font-medium">Ветер</p>
                <p>{data.wind_speed} м/с</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="Gauge" className="mr-2" />
              <div>
                <p className="font-medium">Давление</p>
                <p>{data.pressure} гПа</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="MapPin" className="mr-2" />
              <div>
                <p className="font-medium">Местоположение</p>
                <p>{data.country}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
