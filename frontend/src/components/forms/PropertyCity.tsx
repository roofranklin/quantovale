import { useState } from "react";



const PropertyCity = () => {

    const [propertyCity, setPropertyCity] = useState("");

    return (
        <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <label className="text-4xl font-semibold tracking-tight text-gray-800">
                  Em qual cidade fica esse imóvel?
                </label>
              </div>
              <div>
                <div className="mt-2 flex gap-x-2">
                  <label htmlFor="propertyCity" className="sr-only">
                    Cidade
                  </label>
                  <input
                    id="propertyCity"
                    value={propertyCity}
                    onChange={(e) => setPropertyCity(e.target.value)}
                    placeholder="Ex: Petrópolis"
                    required
                    type="text"
                    className="min-w-0 flex-auto rounded-md  px-3.5 py-2 text-gray-800 outline-1 border-gray-700 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Avançar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default PropertyCity
