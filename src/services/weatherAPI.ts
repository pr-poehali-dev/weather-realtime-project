
import { WeatherData, CurrentWeather, DailyForecast } from '@/types/weather';

// Для тестирования используем моковые данные, в реальном проекте заменить на API
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  // В реальном приложении здесь будет запрос к API
  // return await fetch(`https://api.example.com/weather?city=${city}`).then(res => res.json());
  
  return getMockWeatherData(city);
};

// Моковые данные для демонстрации
const getMockWeatherData = (city: string): WeatherData => {
  const cities: Record<string, WeatherData> = {
    'Москва': {
      current: {
        temperature: 18,
        description: 'Облачно с прояснениями',
        icon: '04d',
        feels_like: 16,
        humidity: 65,
        pressure: 1013,
        wind_speed: 4.5,
        location: 'Москва',
        country: 'RU',
        dt: Date.now()
      },
      daily: [
        { dt: Date.now(), day: 'Сегодня', min: 14, max: 20, icon: '04d', description: 'Облачно с прояснениями' },
        { dt: Date.now() + 86400000, day: 'Завтра', min: 15, max: 22, icon: '01d', description: 'Ясно' },
        { dt: Date.now() + 86400000 * 2, day: 'Ср', min: 16, max: 23, icon: '01d', description: 'Ясно' },
        { dt: Date.now() + 86400000 * 3, day: 'Чт', min: 17, max: 24, icon: '02d', description: 'Малооблачно' },
        { dt: Date.now() + 86400000 * 4, day: 'Пт', min: 14, max: 20, icon: '10d', description: 'Дождь' },
        { dt: Date.now() + 86400000 * 5, day: 'Сб', min: 13, max: 19, icon: '10d', description: 'Дождь' },
        { dt: Date.now() + 86400000 * 6, day: 'Вс', min: 15, max: 21, icon: '04d', description: 'Облачно' }
      ]
    },
    'Санкт-Петербург': {
      current: {
        temperature: 15,
        description: 'Пасмурно',
        icon: '09d',
        feels_like: 13,
        humidity: 80,
        pressure: 1008,
        wind_speed: 5.2,
        location: 'Санкт-Петербург',
        country: 'RU',
        dt: Date.now()
      },
      daily: [
        { dt: Date.now(), day: 'Сегодня', min: 12, max: 16, icon: '09d', description: 'Пасмурно' },
        { dt: Date.now() + 86400000, day: 'Завтра', min: 13, max: 17, icon: '10d', description: 'Дождь' },
        { dt: Date.now() + 86400000 * 2, day: 'Ср', min: 14, max: 18, icon: '04d', description: 'Облачно с прояснениями' },
        { dt: Date.now() + 86400000 * 3, day: 'Чт', min: 15, max: 19, icon: '02d', description: 'Малооблачно' },
        { dt: Date.now() + 86400000 * 4, day: 'Пт', min: 14, max: 18, icon: '01d', description: 'Ясно' },
        { dt: Date.now() + 86400000 * 5, day: 'Сб', min: 13, max: 17, icon: '10d', description: 'Дождь' },
        { dt: Date.now() + 86400000 * 6, day: 'Вс', min: 12, max: 16, icon: '09d', description: 'Дождь' }
      ]
    },
    'Новосибирск': {
      current: {
        temperature: 20,
        description: 'Ясно',
        icon: '01d',
        feels_like: 19,
        humidity: 50,
        pressure: 1012,
        wind_speed: 3.0,
        location: 'Новосибирск',
        country: 'RU',
        dt: Date.now()
      },
      daily: [
        { dt: Date.now(), day: 'Сегодня', min: 16, max: 22, icon: '01d', description: 'Ясно' },
        { dt: Date.now() + 86400000, day: 'Завтра', min: 17, max: 23, icon: '01d', description: 'Ясно' },
        { dt: Date.now() + 86400000 * 2, day: 'Ср', min: 18, max: 24, icon: '02d', description: 'Малооблачно' },
        { dt: Date.now() + 86400000 * 3, day: 'Чт', min: 19, max: 25, icon: '02d', description: 'Малооблачно' },
        { dt: Date.now() + 86400000 * 4, day: 'Пт', min: 18, max: 24, icon: '04d', description: 'Облачно с прояснениями' },
        { dt: Date.now() + 86400000 * 5, day: 'Сб', min: 16, max: 22, icon: '10d', description: 'Дождь' },
        { dt: Date.now() + 86400000 * 6, day: 'Вс', min: 17, max: 23, icon: '04d', description: 'Облачно с прояснениями' }
      ]
    }
  };

  // Если город не найден, возвращаем данные для Москвы
  return cities[city] || cities['Москва'];
};

export const getCities = (): string[] => {
  return ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 
          'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'];
};
