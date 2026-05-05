// ============================================================
// MOCK DATA — src/data/mockData.ts
// ============================================================

import { Item } from '../types';

export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Coca-Cola 350ml',
    subtitle: 'Bebida gaseosa refrescante',
    imageUri: 'https://picsum.photos/seed/cocacola/300/200',
    category: 'Bebidas',
    price: 2500,
    stock: 12,
    machine: 'VM-001 — Piso 1',
    available: true,
  },
  {
    id: '2',
    name: 'Papas Margarita',
    subtitle: 'Snack crujiente de papa',
    imageUri: 'https://picsum.photos/seed/papas/300/200',
    category: 'Snacks',
    price: 1800,
    stock: 8,
    machine: 'VM-002 — Piso 2',
    available: true,
  },
  {
    id: '3',
    name: 'Agua Cristal 500ml',
    subtitle: 'Agua purificada sin gas',
    imageUri: 'https://picsum.photos/seed/agua/300/200',
    category: 'Bebidas',
    price: 1500,
    stock: 0,
    machine: 'VM-001 — Piso 1',
    available: false,
  },
  {
    id: '4',
    name: 'Chocolate Jet',
    subtitle: 'Chocolate con leche clásico',
    imageUri: 'https://picsum.photos/seed/chocolate/300/200',
    category: 'Dulces',
    price: 2000,
    stock: 5,
    machine: 'VM-003 — Cafetería',
    available: true,
  },
  {
    id: '5',
    name: 'Jugo Hit Naranja',
    subtitle: 'Jugo de naranja natural',
    imageUri: 'https://picsum.photos/seed/jugo/300/200',
    category: 'Bebidas',
    price: 2200,
    stock: 3,
    machine: 'VM-003 — Cafetería',
    available: true,
  },
];
