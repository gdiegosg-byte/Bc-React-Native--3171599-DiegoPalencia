// src/types/index.ts
// Tipos del dominio — Máquinas expendedoras (vending machines)

export interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface CreateProductoPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductoPayload {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}
