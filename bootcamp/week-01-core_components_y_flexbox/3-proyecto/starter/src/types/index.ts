// ============================================================
// TYPES — src/types/index.ts
// ============================================================

export interface Item {
  id: string;
  name: string;
  imageUri: string;
  subtitle: string;
  category: string;
  price: number;
  stock: number;
  machine: string;
  available: boolean;
}
