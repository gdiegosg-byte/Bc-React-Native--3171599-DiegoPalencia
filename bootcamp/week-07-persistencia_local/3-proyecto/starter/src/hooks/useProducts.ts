// src/hooks/useProducts.ts
// TanStack Query hooks con caché AsyncStorage para soporte offline — vending machines.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createProducto, fetchProductoById, fetchProductos, updateProducto } from '../services/api';
import type { Producto, ProductosWithSource } from '../types';

const PRODUCTOS_QUERY_KEY = ['products'] as const;

const CACHE_KEY = '@products_cache';

export function useProductos() {
  return useQuery<ProductosWithSource>({
    queryKey: PRODUCTOS_QUERY_KEY,
    queryFn: async (): Promise<ProductosWithSource> => {
      try {
        const data = await fetchProductos();
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return { items: data, source: 'network' };
      } catch {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return { items: JSON.parse(cached) as Producto[], source: 'cache' };
        }
        throw new Error('Sin red y sin caché disponible');
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductoById(id: number | string | undefined) {
  return useQuery({
    queryKey: [...PRODUCTOS_QUERY_KEY, id],
    queryFn: () => fetchProductoById(id!),
    enabled: id !== undefined,
  });
}

export function useCreateProducto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Producto, 'id'>) => createProducto(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEY });
    },
  });
}

export function useUpdateProducto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number | string } & Partial<Omit<Producto, 'id'>>) =>
      updateProducto(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PRODUCTOS_QUERY_KEY, variables.id] });
    },
  });
}
