export interface FormDataState {
  tipo: 'casa' | 'apartamento' | '';
  quartos: string;
  banheiros: string;
  vagas: string;
  area: string;
}

export interface Ad {
  subject: string;
  price: string;
  url: string;
  thumbnail: string;
}

export interface AdCardProps {
  ad: Ad;
}

export interface BackendApiResponse {
  props: {
    pageProps: {
      ads: Ad[];
    };
  };
}
