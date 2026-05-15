// src/types/index.ts
// Define los tipos de datos del dominio: Vending Machines.

// ============================================
// INTERFACE PRINCIPAL DEL DOMINIO
// ============================================

export interface Item {
  id: string;
  // Nombre del producto (ej: "Coca-Cola 350ml", "Snickers", etc.)
  name: string;
  // Descripción general del producto
  description: string;

  // Campos específicos del dominio Vending Machines:
  price: number;           // Precio en COP (pesos colombianos)
  stock: number;           // Unidades disponibles en la máquina
  category: 'bebida' | 'snack' | 'dulce' | 'saludable';
  calories: number;        // Calorías por porción
  machineId: string;       // ID de la máquina que tiene este producto
}

// ============================================
// INTERFACE DE MÁQUINA EXPENDEDORA
// ============================================

export interface VendingMachine {
  id: string;
  location: string;        // Ubicación física (ej: "Piso 2 - Torre Norte")
  isOnline: boolean;       // Si la máquina está operativa
  totalProducts: number;   // Cantidad de productos distintos
}
