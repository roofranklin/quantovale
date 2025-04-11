import { useState } from "react";

const PropertyState = () => {
    const propertyStateOptions = [
        {
          value: 'SP',
          label: 'São Paulo',
        },
        {
          value: 'RJ',
          label: 'Rio de Janeiro',
        },
        {
          value: 'MG',
          label: 'Minas Gerais',
        },
        {
          value: 'RS',
          label: 'Rio Grande do Sul',
        },
        {
          value: 'SC',
          label: 'Santa Catarina',
        },
        {
          value: 'PR',
          label: 'Paraná',
        },
        {
          value: 'MS',
          label: 'Mato Grosso do Sul',
        },
        {
          value: 'MT',
          label: 'Mato Grosso',
        },
        {
          value: 'GO',
          label: 'Goiás',
        },
        {
          value: 'DF',
          label: 'Distrito Federal',
        },
        {
          value: 'ES',
          label: 'Espírito Santo',
        },
        {
          value: 'BA',
          label: 'Bahia',
        },
        {
          value: 'CE',
          label: 'Ceará',
        },
        {
          value: 'PE',
          label: 'Pernambuco',
        },
        {
          value: 'AL',
          label: 'Alagoas',
        },
        {
          value: 'PB',
          label: 'Paraíba',
        },
        {
          value: 'RN',
          label: 'Rio Grande do Norte',
        },
        {
          value: 'SE',
          label: 'Sergipe',
        },
        {
          value: 'PI',
          label: 'Piauí',
        },
        {
          value: 'MA',
          label: 'Maranhão',
        },
        {
          value: 'TO',
          label: 'Tocantins',
        },
        {
          value: 'RO',
          label: 'Rondônia',
        },
        {
          value: 'AC',
          label: 'Acre',
        },
        {
          value: 'AM',
          label: 'Amazonas',
        },
        {
          value: 'RR',
          label: 'Roraima',
        },
        {
          value: 'PA',
          label: 'Pará',
        },
        {
          value: 'AP',
          label: 'Amapá',
        }
    ];

    const [propertyState, setPropertyState] = useState("RJ"); 

    return (
        <select
            id="propertyState"
            name="propertyState"
            defaultValue={propertyState}
            onChange={(e) => setPropertyState(e.target.value)}
            required
          >
            {propertyStateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
    )
}

export default PropertyState