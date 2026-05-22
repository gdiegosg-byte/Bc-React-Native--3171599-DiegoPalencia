// src/types/index.ts
// Interface principal del dominio Vendify — Vending Machines.

export type ProductCategory = 'bebidas' | 'cafe' | 'snacks' | 'dulces' | 'saludable';

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;          // Precio en COP
  category: ProductCategory;
  stock: number;          // Unidades disponibles en máquina
  calories: number;       // Calorías por porción
  emoji: string;          // Representación visual del producto
}
