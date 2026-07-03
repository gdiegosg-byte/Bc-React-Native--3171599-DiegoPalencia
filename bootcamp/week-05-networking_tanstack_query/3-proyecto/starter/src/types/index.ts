// src/types/index.ts
// Interfaces del dominio — Máquinas expendedoras (vending machines)
// Entidad principal: Producto (snacks, bebidas, etc. en la máquina)

export interface Producto {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
}

export type CreateProductoPayload = Omit<Producto, 'id'>;
