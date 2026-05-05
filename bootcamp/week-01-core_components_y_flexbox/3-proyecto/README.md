# Proyecto Semana 01 — App de Tarjetas

> **Semana 01 — Fundamentos RN** | Tiempo estimado: 3h

## 🎯 Objetivo

Construir una app de pantalla única que muestre una lista de tarjetas usando los Core Components y Flexbox.

## 📋 Dominio Asignado

**Dominio**: 🎰 Empresa de Vending Machines  
**Aprendiz**: Diego Palencia  
**ID**: 3171599

## 🎰 Elemento del Dominio

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre del producto |
| `subtitle` | Descripción corta |
| `category` | Categoría (Bebidas, Snacks, Dulces) |
| `price` | Precio en COP |
| `stock` | Unidades disponibles |
| `machine` | Ubicación de la máquina |
| `available` | Si está disponible o agotado |

## ✅ Requisitos Funcionales

1. **Pantalla principal** con ScrollView de tarjetas
2. **5 productos** con datos coherentes al dominio
3. Cada tarjeta muestra:
   - Una imagen (URL)
   - Nombre y categoría con estilos distintos
   - Precio, stock y ubicación de la máquina
   - Un `Pressable` con feedback visual (comprar / agotado)
4. **Header** con el nombre del dominio
5. Estilos con `StyleSheet.create` (sin estilos inline)
6. TypeScript: interfaz `Item` definida en `src/types/index.ts`

## 📁 Estructura del proyecto

```
starter/
├── App.tsx
├── package.json
├── tsconfig.json
├── app.json
└── src/
    ├── types/
    │   └── index.ts
    ├── data/
    │   └── mockData.ts
    ├── components/
    │   └── ItemCard.tsx
    └── screens/
        └── HomeScreen.tsx
```

## 🚀 Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

## 🛠️ Entregables

1. App funcional en simulador iOS y/o Android
2. 5 tarjetas de productos de vending machines
3. Código subido al repositorio
4. Screenshot o grabación de la app en simulador

## 📌 Restricciones

- ❌ No usar `position: 'absolute'` (solo Flexbox)
- ❌ No usar librerías de UI externas
- ❌ No usar estilos inline
- ✅ Todo el código en TypeScript con tipos explícitos
