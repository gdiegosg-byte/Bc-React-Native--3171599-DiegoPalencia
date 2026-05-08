// Datos de ejemplo — Flota de máquinas vending
// Bootcamp React Native — Diego Palencia 3171599

import { VendingMachine } from '@/types';

export const maquinas: VendingMachine[] = [
  {
    id: 'vm-001',
    codigo: 'VM-AND-01',
    ubicacion: 'C.C. Andino',
    zona: 'Piso 2 — Zona de Comidas',
    estado: 'Operativa',
    stockPorcentaje: 82,
    imagen: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400',
    ultimaRevision: '2025-05-01',
  },
  {
    id: 'vm-002',
    codigo: 'VM-UNI-01',
    ubicacion: 'Universidad Nacional',
    zona: 'Edificio Cafetería — Planta Baja',
    estado: 'Operativa',
    stockPorcentaje: 55,
    imagen: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400',
    ultimaRevision: '2025-04-28',
  },
  {
    id: 'vm-003',
    codigo: 'VM-OFC-01',
    ubicacion: 'Torre Empresarial Centro',
    zona: 'Lobby Principal',
    estado: 'Mantenimiento',
    stockPorcentaje: 15,
    imagen: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400',
    ultimaRevision: '2025-05-06',
  },
  {
    id: 'vm-004',
    codigo: 'VM-AER-01',
    ubicacion: 'Aeropuerto El Dorado',
    zona: 'Terminal 1 — Sala de Abordaje',
    estado: 'Fuera de servicio',
    stockPorcentaje: 0,
    imagen: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400',
    ultimaRevision: '2025-04-20',
  },
  {
    id: 'vm-005',
    codigo: 'VM-HOS-01',
    ubicacion: 'Hospital Universitario',
    zona: 'Pasillo Urgencias — Piso 1',
    estado: 'Operativa',
    stockPorcentaje: 70,
    imagen: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400',
    ultimaRevision: '2025-05-03',
  },
];
