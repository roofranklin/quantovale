import React, { useState, FC, FormEvent } from 'react';
import LocationAutocomplete from '../LocationAutocomplete';
import AdCard from '../../AdCard';

import { Ad, FormDataState, BackendApiResponse } from './types';
import './style.css';


const ImovelSearchForm: FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    tipo: '',
    quartos: '0',
    banheiros: '0',
    vagas: '0',
    area: '',
  });
  const [selectedLocationPath, setSelectedLocationPath] = useState<string>('');
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelected = (path: string) => {
    setSelectedLocationPath(path);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedLocationPath) {
      setError("Por favor, selecione uma localidade primeiro.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAds([]);

    const areaNum = parseFloat(formData.area) || 0;
    const areaMinima = Math.round(areaNum * 0.7);
    const areaMaxima = Math.round(areaNum * 1.3);

    const params = new URLSearchParams();
    params.set('path', selectedLocationPath);
    if (formData.tipo) params.set('tipos', formData.tipo);
    if (formData.banheiros !== '0') params.set('banheiros', formData.banheiros);
    if (formData.quartos !== '0') params.set('quartos', formData.quartos);
    if (formData.vagas !== '0') params.set('vagas', formData.vagas);
    if (areaNum > 0) {
      params.set('areaMinima', areaMinima.toString());
      params.set('areaMaxima', areaMaxima.toString());
    }
    
    const url = `http://localhost:3001/olx?${params.toString()}`;
    console.log("Requisitando URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data: BackendApiResponse = await response.json();
      
      const foundAds = data?.props?.pageProps?.ads || [];
      setAds(foundAds);
      if (foundAds.length === 0) {
        setError("Nenhum anúncio encontrado com esses critérios.");
      }

    } catch (err: any) {
      setError(`Falha ao buscar anúncios: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectOptions = ['0', '1', '2', '3', '4', '5'];
  const isFormDisabled = !selectedLocationPath;

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-grid">
          <div className="grid-item-full">
            <label>Localização</label>
            <LocationAutocomplete onLocationSelect={handleLocationSelected} />
          </div>

          <div className="grid-item">
            <label htmlFor="tipo">Tipo</label>
            <select name="tipo" id="tipo" value={formData.tipo} onChange={handleInputChange} disabled={isFormDisabled}>
              <option value="">Todos</option>
              <option value="1040">Casa</option>
              <option value="1020">Apartamento</option>
            </select>
          </div>
          
          <div className="grid-item">
            <label htmlFor="quartos">Quartos</label>
            <select name="quartos" id="quartos" value={formData.quartos} onChange={handleInputChange} disabled={isFormDisabled}>
              {selectOptions.map(n => <option key={n} value={n}>{n === '0' ? 'Todos' : `${n}+`}</option>)}
            </select>
          </div>

          <div className="grid-item">
            <label htmlFor="banheiros">Banheiros</label>
            <select name="banheiros" id="banheiros" value={formData.banheiros} onChange={handleInputChange} disabled={isFormDisabled}>
              {selectOptions.map(n => <option key={n} value={n}>{n === '0' ? 'Todos' : `${n}+`}</option>)}
            </select>
          </div>

          <div className="grid-item">
            <label htmlFor="vagas">Vagas</label>
            <select name="vagas" id="vagas" value={formData.vagas} onChange={handleInputChange} disabled={isFormDisabled}>
              {selectOptions.map(n => <option key={n} value={n}>{n === '0' ? 'Todas' : `${n}+`}</option>)}
            </select>
          </div>
          
          <div className="grid-item">
            <label htmlFor="area">Área (m²)</label>
            <input type="number" name="area" id="area" value={formData.area} onChange={handleInputChange} placeholder="Ex: 70" disabled={isFormDisabled} />
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isFormDisabled || isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar Imóveis'}
        </button>
      </form>
      
      <div className="results-section">
        {error && <p className="error-message">{error}</p>}
        <div className="ads-grid">
          {ads.map((ad, index) => (
            <AdCard key={`${ad.url}-${index}`} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImovelSearchForm;
