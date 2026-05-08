// TYPES — Semana 02
// Dominio: Empresa de Vending Machines
// Diego Palencia — 3171599

export type EstadoMaquina = 'Operativa' | 'Mantenimiento' | 'Fuera de servicio';
export type CategoriaMaquina = 'Bebidas' | 'Snacks' | 'Mixta' | 'Saludable';

export interface Item {
  id: string;
  name: string;           // Código de la máquina: VM-AND-01
  ubicacion: string;      // Sede donde está instalada
  zona: string;           // Área específica dentro de la sede
  estado: EstadoMaquina;
  stockPorcentaje: number; // 0 a 100
  categoria: CategoriaMaquina;
  ultimaRevision: string;
}
