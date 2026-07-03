// src/schemas/productoSchema.ts
// Schema Zod para formulario de producto de vending machine.

import { z } from 'zod';

export const productoSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(80, 'Máx. 80 caracteres'),

  description: z
    .string()
    .max(500, 'Máx. 500 caracteres')
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
    .string()
    .min(1, 'La categoría es requerida')
    .max(50, 'Máx. 50 caracteres'),
});

export type ProductoFormData = z.infer<typeof productoSchema>;
