// src/navigation/types.ts
// Tipos de navegación — dominio vending machines

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: string | number; name: string };
  Create: undefined;
};
