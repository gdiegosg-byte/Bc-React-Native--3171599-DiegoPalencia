// src/hooks/useProducts.ts
// Custom hooks para CRUD de productos (vending machines) con TanStack Query + Axios

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../services/api';
import type { CreateProductoPayload, Producto, UpdateProductoPayload } from '../types';

export const PRODUCTOS_QUERY_KEY = ['products'] as const;

export function useProductos() {
  return useQuery<Producto[]>({
    queryKey: PRODUCTOS_QUERY_KEY,
    queryFn: () => apiClient.get<Producto[]>('/products?_limit=15').then(r => r.data),
  });
}

export function useProductoById(id: number | string) {
  return useQuery<Producto>({
    queryKey: [...PRODUCTOS_QUERY_KEY, id],
    queryFn: () => apiClient.get<Producto>(`/products/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

export function useCreateProducto() {
  const queryClient = useQueryClient();
  return useMutation<Producto, Error, CreateProductoPayload>({
    mutationFn: (payload) =>
      apiClient.post<Producto>('/products', payload).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEY });
    },
  });
}

export function useUpdateProducto() {
  const queryClient = useQueryClient();
  return useMutation<Producto, Error, UpdateProductoPayload>({
    mutationFn: (payload) =>
      apiClient.put<Producto>(`/products/${payload.id}`, payload).then(r => r.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PRODUCTOS_QUERY_KEY, variables.id] });
    },
  });
}
