// src/hooks/usePreferences.ts
// Hook de preferencias del usuario almacenadas con MMKV — vending machines.

import { useMMKVString, useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';

const PREF_KEYS = {
  SORT_ORDER:      'pref_sortOrder',
  COMPACT_MODE:    'pref_compactMode',
  ITEMS_PER_PAGE:  'pref_itemsPerPage',
  SHOW_LOW_STOCK:  'pref_showLowStock',
} as const;

export type SortOrder = 'asc' | 'desc';

export function usePreferences() {
  const [sortOrder, setSortOrder]       = useMMKVString(PREF_KEYS.SORT_ORDER, storage);
  const [compactMode, setCompactMode]   = useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage);
  const [itemsPerPage, setItemsPerPage] = useMMKVNumber(PREF_KEYS.ITEMS_PER_PAGE, storage);
  const [showLowStock, setShowLowStock] = useMMKVBoolean(PREF_KEYS.SHOW_LOW_STOCK, storage);

  return {
    sortOrder: (sortOrder ?? 'asc') as SortOrder,
    setSortOrder: (value: SortOrder) => setSortOrder(value),

    compactMode: compactMode ?? false,
    setCompactMode,

    itemsPerPage: itemsPerPage ?? 10,
    setItemsPerPage: (value: number) => setItemsPerPage(value),

    showLowStock: showLowStock ?? false,
    setShowLowStock,
  };
}
