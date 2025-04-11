import React, { useState } from "react";

import PropertyStreet from "../../components/forms/PropertyStreet";
import PropertyCity from "../../components/forms/PropertyCity";
import PropertyGroup from "../../components/forms/PropertyGroup";
import PropertyState from "../../components/forms/PropertyState";
import PropertyQtdRooms from "../../components/forms/PropertyQtdRooms";

import handlePropertySubmit from "../../helpers/handlePropertySubmit";

interface FormPropertyProps {
  propertyGroup: string;
  propertyState: string;
}

const FormProperty: React.FC<FormPropertyProps> = ({ propertyGroup, propertyState }) => {
   
  const [propertyArea, setPropertyArea] = useState(0);
  const [propertyRooms, setPropertyRooms] = useState("02");
  const [propertyBathrooms, setPropertyBathrooms] = useState("01");
  const [propertyGarages, setPropertyGarages] = useState("01");
  const [responseData, setResponseData] = useState(null);  // Estado para armazenar a resposta da API
  const [loading, setLoading] = useState(false);  // Estado para controlar o estado de carregamento
  const [error, setError] = useState<string | null>(null);  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handlePropertySubmit({
      e,
      propertyGroup,
      propertyState,
      propertyStreet,
      propertyCity,
      propertyArea,
      propertyRooms,
      propertyBathrooms,
      propertyGarages,
      setResponseData,
      setLoading,
      setError,
    });
  };

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <h2 className="text-base/7 font-semibold text-indigo-600">Vamos começar a calcular?</h2>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
        Preencha as informações do imóvel
      </p>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <PropertyGroup />
        <PropertyStreet />
        <PropertyCity />
      </form>
    </div>


    // <div className="overflow-hidden bg-white py-24 sm:py-32">
    //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //     <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
    //       <div className="lg:pt-4 lg:pr-8">
    //         <div className="lg:max-w-lg">
    //           <h2 className="text-base/7 font-semibold text-indigo-600">Vamos começar a calcular?</h2>
    //           <p className="mt-2 text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
    //             Preencha as informações do imóvel
    //           </p>
    //           <form
    //             noValidate
    //             autoComplete="off"
    //             onSubmit={handleSubmit}
    //           >
    //             <div>
    //               <PropertyGroup />
    //               <label htmlFor="propertyStreet">Em qual rua fica esse imóvel?</label>
    //               <input
    //                 id="propertyStreet"
    //                 value={propertyStreet}
    //                 onChange={(e) => setPropertyStreet(e.target.value)}
    //                 placeholder="Ex: Rua das Acácias  (não precisa colocar o número)"
    //                 required
    //               />
    //               <label htmlFor="propertyCity">Em qual cidade fica esse imóvel?</label>
    //               <input
    //                 id="propertyCity"
    //                 value={propertyCity}
    //                 onChange={(e) => setPropertyCity(e.target.value)}
    //                 placeholder="Ex: Petrópolis"
    //                 required
    //               />
    //               <PropertyState />
    //               <label htmlFor="propertyRooms">Quantos quartos tem esse imóvel?</label>
    //               <PropertyQtdRooms
    //                 roomDefaultValue={ propertyRooms }
    //                 setRoomType={ setPropertyRooms }
    //                 roomType="quarto"            
    //               />
    //               <label htmlFor="propertyBathrooms">Quantos banheiros tem esse imóvel?</label>
    //               <PropertyQtdRooms
    //                 roomType="banheiro"
    //                 setRoomType={ setPropertyBathrooms }
    //                 roomDefaultValue={ propertyBathrooms }
    //               />
    //               <label htmlFor="propertyGarages">Quantas vagas de garagem tem esse imóvel?</label>
    //               <PropertyQtdRooms
    //                 roomType="vaga"
    //                 setRoomType={ setPropertyGarages }
    //                 roomDefaultValue={ propertyGarages }
    //               />
    //               <label htmlFor="propertyArea">Qual a area do imóvel?</label>
    //               <input
    //                 id="propertyArea"
    //                 value={propertyArea}
    //                 onChange={(e) => setPropertyArea(parseInt(e.target.value))}
    //                 placeholder="Ex: 80 (somente o número)"
    //                 required
    //               />
    //               <br />
    //               <button type="submit" disabled={loading}>
    //                 {loading ? "Carregando..." : "Buscar"}
    //               </button>
    //             </div>
    //           </form>

    //           {error && <p style={{ color: "red" }}>{error}</p>}

    //           {responseData && (
    //             <div>
    //               <h2>Dados Obtidos:</h2>
    //               <pre>{JSON.stringify(responseData, null, 2)}</pre>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //       <img
    //         alt="Product screenshot"
    //         src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
    //         width={2432}
    //         height={1442}
    //         className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default FormProperty;
