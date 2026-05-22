// src/navigation/types.ts
// Tipos de parámetros para los navigators de Vendify.

export type RootTabParamList = {
  Home: undefined;
  Saved: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    name: string;
    price: number;
    category: string;
    emoji: string;
  };
};
