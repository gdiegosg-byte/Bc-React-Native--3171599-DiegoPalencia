// src/navigation/types.ts
// Define los tipos de parámetros para cada navigator.

// ============================================
// TAB NAVIGATOR — pantallas de nivel raíz
// ============================================

export type RootTabParamList = {
  // Pestaña principal: catálogo de productos
  Home: undefined;
  // Pestaña de productos favoritos/guardados
  Favorites: undefined;
};

// ============================================
// STACK NAVIGATOR — anidado dentro de la pestaña Home
// ============================================

export type HomeStackParamList = {
  // Pantalla de lista de productos (sin params)
  HomeList: undefined;
  // Pantalla de detalle del producto seleccionado
  HomeDetail: {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: 'bebida' | 'snack' | 'dulce' | 'saludable';
    calories: number;
    description: string;
    machineId: string;
  };
};
