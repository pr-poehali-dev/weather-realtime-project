
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCities } from '@/services/weatherAPI';
import Icon from '@/components/ui/icon';

interface SearchCityProps {
  onCitySelect: (city: string) => void;
}

const SearchCity: React.FC<SearchCityProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Фильтрация городов при вводе
    if (query.length > 0) {
      const filteredCities = getCities().filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredCities);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    
    // Закрытие выпадающего списка при клике вне компонента
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [query]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      onCitySelect(query);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    onCitySelect(city);
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex">
        <Input
          type="text"
          placeholder="Введите название города..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="rounded-r-none bg-white/90 backdrop-blur-sm focus-visible:ring-blue-500"
        />
        <Button 
          type="submit"
          className="rounded-l-none bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="Search" size={18} />
        </Button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border animate-in fade-in-0 zoom-in-95">
          <ul className="py-1">
            {suggestions.map((city, index) => (
              <li 
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => handleSuggestionClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCity;
