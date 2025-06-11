import axios from "axios";

interface HandleSubmitParams {
  e: React.FormEvent<HTMLFormElement>;
  propertyGroup: string;
  propertyPath: string;
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
  propertyPath,
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
    let propertyType = "";

    if (propertyGroup === "apartamentos") {
      propertyType = "1020";
    } else if (propertyGroup === "casas") {
      propertyType = "1040";
    }
    
    let minArea = Number(propertyArea * 0.5);
    let maxArea = Number(propertyArea * 1.5);
    if (propertyArea === 0) {
      minArea = 0;
      maxArea = 1000;
    }

    const response = await axios.get(`http://localhost:3001/olx?path=${propertyPath}&tipo=${propertyGroup}&banheiros=${propertyBathrooms}&quartos=${propertyRooms}&vagas=${propertyGarages}&areaMinima=${minArea}&areaMaxima=${maxArea}`);
    
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
