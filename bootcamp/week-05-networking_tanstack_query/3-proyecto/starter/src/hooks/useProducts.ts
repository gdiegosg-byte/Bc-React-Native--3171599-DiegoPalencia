// src/hooks/useProducts.ts
// Custom hooks para el dominio de productos de vending machines.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateProductoPayload, Producto } from '../types';

export const PRODUCTOS_QUERY_KEY = ['products'] as const;

export function useProductos() {
  return useQuery<Producto[]>({
    queryKey: PRODUCTOS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Producto[]>('/products?_limit=15');
      return data;
    },
  });
}

export function useProductoById(id: string | number) {
  return useQuery<Producto>({
    queryKey: [...PRODUCTOS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Producto>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateProducto() {
  const queryClient = useQueryClient();

  return useMutation<Producto, Error, CreateProductoPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Producto>('/products', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error al crear producto:', error.message);
    },
  });
}

export function useDeleteProducto() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEY });
    },
  });
}
