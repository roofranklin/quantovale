import { FC } from 'react';
import PropertySearchForm from '../../components/forms/PropertySearchForm';

const FormProperty: FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Busca Avançada de Imóveis</h1>
      </header>
      <main>
        <PropertySearchForm />
      </main>
    </div>
  );
}

export default FormProperty;