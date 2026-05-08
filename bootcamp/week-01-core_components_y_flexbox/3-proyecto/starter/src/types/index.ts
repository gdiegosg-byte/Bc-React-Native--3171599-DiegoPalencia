// Tipos del dominio: Empresa de Vending Machines
// Bootcamp React Native — Diego Palencia 3171599

export type EstadoMaquina = 'Operativa' | 'Mantenimiento' | 'Fuera de servicio';

export interface VendingMachine {
  id: string;
  codigo: string;        // Ej: VM-AND-01
  ubicacion: string;     // Sede donde está instalada
  zona: string;          // Área específica dentro de la sede
  estado: EstadoMaquina;
  stockPorcentaje: number; // 0 a 100
  imagen: string;          // URL de la imagen
  ultimaRevision: string;  // Fecha de última revisión
}
