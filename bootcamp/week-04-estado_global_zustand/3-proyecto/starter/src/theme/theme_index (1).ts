// src/theme/index.ts
// Sistema de diseño centralizado de Vendify.
// Paleta industrial oscura con acento amarillo dorado.

export const COLORS = {
  // Fondos
  background: '#0A0A0A',
  surface: '#141414',
  card: '#1A1A1A',

  // Texto
  textPrimary: '#F0F0F0',
  textSecondary: '#888888',
  textMuted: '#444444',

  // Acento Vendify — amarillo dorado
  accent: '#F5C842',

  // Feedback
  success: '#22C55E',
  warning: '#F97316',
  error: '#EF4444',

  // Borde
  border: '#2A2A2A',
} as const;

export const TYPOGRAPHY = {
  h1: { fontSize: 28, fontWeight: '700' as const, color: COLORS.textPrimary },
  h2: { fontSize: 22, fontWeight: '600' as const, color: COLORS.textPrimary },
  h3: { fontSize: 18, fontWeight: '600' as const, color: COLORS.textPrimary },
  body: { fontSize: 16, fontWeight: '400' as const, color: COLORS.textPrimary },
  caption: { fontSize: 13, fontWeight: '400' as const, color: COLORS.textSecondary },
  label: { fontSize: 12, fontWeight: '500' as const, color: COLORS.textMuted },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;
