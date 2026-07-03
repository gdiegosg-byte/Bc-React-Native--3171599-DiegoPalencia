// src/types/index.ts
// Tipos globales del dominio — Máquinas expendedoras (vending machines)

export interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface ProductosWithSource {
  items: Producto[];
  source: 'network' | 'cache';
}
