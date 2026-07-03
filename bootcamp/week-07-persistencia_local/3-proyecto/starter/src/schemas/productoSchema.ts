// src/schemas/productoSchema.ts
// Schema Zod para validar el formulario de producto (vending machine)

import { z } from 'zod';

export const productoSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre no puede estar vacío')
    .max(80, 'Máximo 80 caracteres'),
  description: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  price: z.coerce
    .number({ invalid_type_error: 'Debe ser un número' })
    .positive('El precio debe ser mayor que 0'),
  stock: z.coerce
    .number({ invalid_type_error: 'Debe ser un número' })
    .int('Debe ser un entero')
    .min(0, 'El stock no puede ser negativo'),
  category: z
    .string({ required_error: 'La categoría es requerida' })
    .min(1, 'La categoría no puede estar vacía')
    .max(50, 'Máximo 50 caracteres'),
});

export type ProductoFormData = z.infer<typeof productoSchema>;
