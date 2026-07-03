// src/storage/mmkv.ts
// Instancia global de MMKV para toda la app — vending machines.
// ⚠️  Requiere build nativo — no funciona con Expo Go.

import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'vending-app-storage' });
