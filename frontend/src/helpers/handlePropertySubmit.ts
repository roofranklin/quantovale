import axios from "axios";
import formatText from "../utils/utils";

interface HandleSubmitParams {
  e: React.FormEvent<HTMLFormElement>;
  propertyGroup: string;
  propertyState: string;
  propertyStreet: string;
  propertyCity: string;
  propertyArea: number;
  propertyRooms: string;
  propertyBathrooms: string;
  propertyGarages: string;
  setResponseData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const handlePropertySubmit = async ({
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
}: HandleSubmitParams) => {
  e.preventDefault();

  setLoading(true);
  setError(null);

  try {
    let propertyType = "imoveis";

    if (propertyGroup === "apartamentos") {
      propertyType = "apartamento_residencial";
    } else if (propertyGroup === "casas") {
      propertyType = "casa_residencial";
    }

    const formattedStreet = formatText(propertyStreet);
    const formattedCity = formatText(propertyCity);
    const formattedState = formatText(propertyState).toLowerCase();
    
    let minArea = Number(propertyArea * 0.5);
    let maxArea = Number(propertyArea * 1.5);
    if (propertyArea === 0) {
      minArea = 0;
      maxArea = 1000;
    }

    const response = await axios.get(`http://127.0.0.1:3000/zap?tipo=${propertyGroup}&estado=${formattedState}&cidade=${formattedCity}&endereco=${formattedStreet}&tipos=${propertyType}&pagina=1&banheiros=${propertyBathrooms}&quartos=${propertyRooms}&vagas=${propertyGarages}&areaMinima=${minArea}&areaMaxima=${maxArea}`);
    
    const data = response.data?.props?.pageProps?.initialProps?.data;
    if (Array.isArray(data) && data.length > 0) {
      setResponseData(data);
    } else {
      setError("Não foi possível encontrar os dados dos imóveis.");
    }
  } catch (err) {
    setError("Erro ao acessar os dados. Tente novamente.");
    console.error("Erro ao fazer a requisição:", err);
  } finally {
    setLoading(false);
  }
};

export default handlePropertySubmit;
