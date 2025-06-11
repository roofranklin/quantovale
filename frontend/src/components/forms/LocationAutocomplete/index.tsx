import React, { useState, useEffect, FC } from 'react';
import './style.css';
import { Suggestion, LocationAutocompleteProps } from './types';
const LocationAutocomplete: FC<LocationAutocompleteProps> = ({ onLocationSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    const debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`https://location-autocomplete.olx.com.br/location?q=${inputValue}`);
        if (!response.ok) {
          throw new Error('A resposta da rede não foi bem-sucedida');
        }
        
        const data: Suggestion[] = await response.json();
        
        setSuggestions(data || []);

      } catch (error) {
        console.error("Houve um erro ao buscar as localidades:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.title);
    setSuggestions([]);
    onLocationSelect(suggestion.path);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Digite a localidade..."
        className="autocomplete-input"
      />
      {isLoading && <div className="loading-indicator">Carregando...</div>}
      
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            // 3. MELHORIA: Usando suggestion.id como key
            <li
              key={suggestion.id} 
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              <div className="suggestion-title">{suggestion.title}</div>
              <div className="suggestion-subtitle">{suggestion.subtitle}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
