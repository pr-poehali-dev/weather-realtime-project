
import React from 'react';
import Icon from '@/components/ui/icon';

type WeatherIconProps = {
  iconCode: string;
  size?: number;
  className?: string;
};

const iconMap: Record<string, string> = {
  '01d': 'Sun',
  '01n': 'Moon',
  '02d': 'CloudSun',
  '02n': 'CloudMoon',
  '03d': 'Cloud',
  '03n': 'Cloud',
  '04d': 'Cloudy',
  '04n': 'Cloudy',
  '09d': 'CloudDrizzle',
  '09n': 'CloudDrizzle',
  '10d': 'CloudRain',
  '10n': 'CloudRain',
  '11d': 'CloudLightning',
  '11n': 'CloudLightning',
  '13d': 'CloudSnow',
  '13n': 'CloudSnow',
  '50d': 'Mist',
  '50n': 'Mist',
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = 24, className = '' }) => {
  const iconName = iconMap[iconCode] || 'Cloud';
  
  return (
    <Icon 
      name={iconName} 
      size={size} 
      className={`text-blue-600 ${className}`} 
    />
  );
};

export default WeatherIcon;
