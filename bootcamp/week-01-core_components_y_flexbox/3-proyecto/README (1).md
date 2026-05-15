# Proyecto Semana 01 — App de Tarjetas de Máquinas Vending

**Semana 01 — Fundamentos RN** | ⏱️ Tiempo estimado: 3h

---

## 🎯 Objetivo

Construir una app de pantalla única que muestre una lista de tarjetas de **máquinas vending** usando los Core Components y Flexbox. Cada tarjeta representa una máquina de la flota con su información clave: ubicación, estado operativo y nivel de stock.

---

## 📋 Dominio Asignado

**Dominio:** 🥤 Empresa de Vending Machines  
**Estudiante:** Diego Palencia  
**Código:** 3171599

La empresa opera una red de máquinas vending distribuidas en distintas sedes (universidades, oficinas, centros comerciales). La app permite al personal visualizar rápidamente el estado de cada máquina.

---

## 🗂️ Elemento del Dominio

| Campo | Descripción |
|-------|-------------|
| **Elemento** | Máquina Vending |
| **Nombre** | Identificador de la máquina (ej: VM-CEN-01) |
| **Ubicación** | Sede donde está instalada |
| **Estado** | Operativa / Fuera de servicio / Mantenimiento |
| **Stock** | Porcentaje de capacidad disponible (0–100%) |
| **Imagen** | Foto o ícono representativo de la máquina |

---

## ✅ Requisitos Funcionales

- Pantalla principal con `ScrollView` mostrando tarjetas de máquinas vending
- Mínimo **3 tarjetas** con datos coherentes al dominio (máquinas reales de la flota)
- Cada tarjeta debe mostrar:
  - Una imagen representativa de la máquina (local o URL)
  - Nombre/código de la máquina (texto principal)
  - Ubicación y estado operativo (textos secundarios con estilos distintos)
  - Indicador visual de nivel de stock (barra o texto con color semafórico)
  - Un botón **"Ver Detalle"** (`Pressable`) con feedback visual al presionar
- Header de la app con el nombre **"VendApp — Gestión de Máquinas"**
- Estilos definidos con `StyleSheet.create` (sin estilos inline)
- TypeScript: interfaces definidas para los datos de la máquina vending

---

## 📁 Estructura del Starter

```
starter/
├── App.tsx                   # Punto de entrada
├── package.json              # Dependencias exactas
├── tsconfig.json             # Configuración TypeScript
├── app.json                  # name: "VendApp" (requerido en entregables)
└── src/
    ├── types/
    │   └── index.ts          # Interface VendingMachine
    ├── data/
    │   └── mockData.ts       # Datos de 4+ máquinas de la flota
    ├── components/
    │   └── VendingCard.tsx   # Componente tarjeta reutilizable
    └── screens/
        └── HomeScreen.tsx    # Pantalla principal con la lista
```

### Ejemplo de Interface TypeScript

```typescript
// src/types/index.ts
export interface VendingMachine {
  id: string;
  nombre: string;       // Ej: "VM-CEN-01"
  ubicacion: string;    // Ej: "Centro Comercial Andino - Piso 2"
  estado: 'Operativa' | 'Fuera de servicio' | 'Mantenimiento';
  stockPorcentaje: number;  // 0 a 100
  imagen: string;       // URL o ruta local
}
```

### Ejemplo de Mock Data

```typescript
// src/data/mockData.ts
import { VendingMachine } from '../types';

export const maquinas: VendingMachine[] = [
  {
    id: 'vm-001',
    nombre: 'VM-AND-01',
    ubicacion: 'Centro Comercial Andino - Piso 2',
    estado: 'Operativa',
    stockPorcentaje: 85,
    imagen: 'https://...',
  },
  {
    id: 'vm-002',
    nombre: 'VM-UNI-01',
    ubicacion: 'Universidad Nacional - Cafetería',
    estado: 'Mantenimiento',
    stockPorcentaje: 10,
    imagen: 'https://...',
  },
  {
    id: 'vm-003',
    nombre: 'VM-OFC-01',
    ubicacion: 'Edificio Corporativo Centro - Lobby',
    estado: 'Operativa',
    stockPorcentaje: 60,
    imagen: 'https://...',
  },
  {
    id: 'vm-004',
    nombre: 'VM-AER-01',
    ubicacion: 'Aeropuerto El Dorado - Terminal 1',
    estado: 'Fuera de servicio',
    stockPorcentaje: 0,
    imagen: 'https://...',
  },
];
```

---

## 🚀 Cómo Ejecutar

```bash
cd starter
pnpm install
pnpm start
```

Luego escanea el QR con **Expo Go** en tu celular, o presiona `a` para Android / `i` para iOS en el emulador.

---

## 🛠️ Entregables

- [ ] App funcional en simulador iOS y/o Android
- [ ] Mínimo 3 tarjetas con datos reales de máquinas vending
- [ ] `app.json` con `name: "VendApp"`
- [ ] Código subido al repositorio: `week-01-introduccion/3-proyecto/`
- [ ] Screenshot o grabación de la app en simulador (guardar en `0-assets/`)

---

## 📊 Criterios de Evaluación

Ver [`../../rubrica-evaluacion.md`](../../rubrica-evaluacion.md)

---

## 📌 Restricciones

| | Restricción |
|--|-------------|
| ❌ | No usar `position: 'absolute'` — solo Flexbox esta semana |
| ❌ | No usar librerías de UI externas (solo componentes nativos de RN) |
| ❌ | No usar estilos inline (`style={{ ... }}` directo en JSX) |
| ✅ | Todo el código en TypeScript con tipos explícitos |
| ✅ | El color del indicador de stock debe cambiar según el nivel: 🟢 verde > 50%, 🟡 amarillo 20–50%, 🔴 rojo < 20% |

---

## 💡 Tips para el Dominio Vending

- Usa códigos para las máquinas tipo `VM-XXX-NN` (VM = Vending Machine, XXX = sede, NN = número)
- El estado `'Fuera de servicio'` puede mostrarse con una tarjeta visualmente diferenciada (opacidad reducida o borde rojo)
- Para las imágenes puedes usar íconos de máquinas vending de [flaticon.com](https://www.flaticon.com) o URLs de Unsplash

---

*Bootcamp React Native 2025 — Empresa de Vending Machines*
