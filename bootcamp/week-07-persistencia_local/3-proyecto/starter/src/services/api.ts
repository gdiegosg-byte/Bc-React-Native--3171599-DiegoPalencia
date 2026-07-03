// src/services/api.ts
import axios from 'axios';
import type { Producto } from '../types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchProductos(): Promise<Producto[]> {
  const { data } = await api.get<Producto[]>('/posts', { params: { _limit: 15 } });
  return data;
}

export async function fetchProductoById(id: number | string): Promise<Producto> {
  const { data } = await api.get<Producto>(`/posts/${id}`);
  return data;
}

export async function createProducto(
  payload: Omit<Producto, 'id'>,
): Promise<Producto> {
  const { data } = await api.post<Producto>('/posts', payload);
  return data;
}

export async function updateProducto(
  id: number | string,
  payload: Partial<Omit<Producto, 'id'>>,
): Promise<Producto> {
  const { data } = await api.put<Producto>(`/posts/${id}`, payload);
  return data;
}
