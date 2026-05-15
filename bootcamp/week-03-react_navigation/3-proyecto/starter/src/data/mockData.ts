// src/data/mockData.ts
// Datos de prueba para la app de Vending Machines.

import type { Item } from '../types';

// ============================================
// LISTA PRINCIPAL DE PRODUCTOS
// ============================================

export const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Coca-Cola 350ml',
    description: 'Bebida gaseosa clásica, fría y refrescante. La favorita de la oficina.',
    price: 3500,
    stock: 12,
    category: 'bebida',
    calories: 140,
    machineId: 'VM-001',
  },
  {
    id: '2',
    name: 'Snickers',
    description: 'Barra de chocolate con maní, caramelo y nougat. Energía instantánea.',
    price: 2800,
    stock: 8,
    category: 'dulce',
    calories: 250,
    machineId: 'VM-001',
  },
  {
    id: '3',
    name: 'Agua Cristal 600ml',
    description: 'Agua purificada sin gas. Hidratación pura en cualquier momento.',
    price: 2000,
    stock: 20,
    category: 'saludable',
    calories: 0,
    machineId: 'VM-002',
  },
  {
    id: '4',
    name: 'Doritos Nacho',
    description: 'Chips de maíz con sabor a nacho. El snack perfecto para el descanso.',
    price: 3200,
    stock: 6,
    category: 'snack',
    calories: 210,
    machineId: 'VM-001',
  },
  {
    id: '5',
    name: 'Jugo Hit Naranja',
    description: 'Bebida de fruta natural con vitamina C. Sabor a naranja tropical.',
    price: 3000,
    stock: 10,
    category: 'bebida',
    calories: 120,
    machineId: 'VM-002',
  },
  {
    id: '6',
    name: 'Granola Bar Nature Valley',
    description: 'Barra de granola con avena y miel. Opción saludable y nutritiva.',
    price: 4000,
    stock: 5,
    category: 'saludable',
    calories: 190,
    machineId: 'VM-003',
  },
  {
    id: '7',
    name: 'Chitos',
    description: 'Palitos de queso crujientes. Clásico snack colombiano irresistible.',
    price: 1800,
    stock: 15,
    category: 'snack',
    calories: 160,
    machineId: 'VM-002',
  },
  {
    id: '8',
    name: 'Red Bull 250ml',
    description: 'Bebida energizante con taurina y cafeína. Para rendir al máximo.',
    price: 6500,
    stock: 4,
    category: 'bebida',
    calories: 110,
    machineId: 'VM-003',
  },
];

// ============================================
// LISTA DE FAVORITOS
// ============================================
// Productos más populares / destacados.

export const FAVORITES: Item[] = [
  ITEMS[0], // Coca-Cola
  ITEMS[2], // Agua Cristal
  ITEMS[4], // Jugo Hit
];
