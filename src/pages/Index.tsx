
import { useState, useEffect } from 'react';
import { fetchWeatherData } from '@/services/weatherAPI';
import { WeatherData } from '@/types/weather';
import SearchCity from '@/components/SearchCity';
import CurrentWeather from '@/components/CurrentWeather';
import DailyForecast from '@/components/DailyForecast';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('Москва');
  
  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        setError('Не удалось загрузить данные о погоде. Пожалуйста, попробуйте позже.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getWeatherData();
  }, [city]);
  
  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };
  
  const refreshWeather = () => {
    if (city) {
      setLoading(true);
      fetchWeatherData(city)
        .then(data => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Не удалось обновить данные о погоде.');
          setLoading(false);
          console.error(err);
        });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-blue-800">Прогноз погоды</h1>
          <p className="text-gray-600 mb-6">Узнайте текущую погоду и прогноз на неделю</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <SearchCity onCitySelect={handleCitySelect} />
            
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 hover:bg-white"
              onClick={refreshWeather}
            >
              <Icon name="RefreshCw" className="h-5 w-5 text-blue-600" />
              <span className="sr-only">Обновить</span>
            </Button>
          </div>
        </header>
        
        <main className="space-y-6 animate-in fade-in-50 duration-500">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin">
                <Icon name="Loader2" size={48} className="text-blue-600" />
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          ) : weatherData ? (
            <>
              <CurrentWeather data={weatherData.current} />
              <DailyForecast data={weatherData.daily} />
            </>
          ) : null}
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Прогноз погоды | Все данные о погоде предоставлены для демонстрации</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
