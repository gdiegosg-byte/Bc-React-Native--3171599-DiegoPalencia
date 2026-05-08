// ItemCard — Semana 02
// Dominio: Empresa de Vending Machines
// Diego Palencia — 3171599

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Item, EstadoMaquina } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

function getStockColor(porcentaje: number): string {
  if (porcentaje > 50) return COLORS.success;
  if (porcentaje >= 20) return COLORS.warning;
  return COLORS.error;
}

function getEstadoColor(estado: EstadoMaquina): string {
  switch (estado) {
    case 'Operativa': return COLORS.success;
    case 'Mantenimiento': return COLORS.warning;
    case 'Fuera de servicio': return COLORS.error;
  }
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const stockColor = getStockColor(item.stockPorcentaje);
  const estadoColor = getEstadoColor(item.estado);
  const isInactiva = item.estado === 'Fuera de servicio';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        isInactiva && styles.cardInactiva,
      ]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={[styles.badge, { backgroundColor: estadoColor + '22' }]}>
          <Text style={[styles.badgeText, { color: estadoColor }]}>
            {item.estado}
          </Text>
        </View>
      </View>

      {/* Ubicación */}
      <Text style={styles.fieldText}>📍 {item.ubicacion}</Text>
      <Text style={styles.fieldMuted}>{item.zona}</Text>

      {/* Stock y categoría */}
      <View style={styles.footer}>
        <View style={styles.stockContainer}>
          <View style={styles.stockBarFondo}>
            <View style={[styles.stockBarRelleno, {
              width: `${item.stockPorcentaje}%`,
              backgroundColor: stockColor,
            }]} />
          </View>
          <Text style={[styles.stockTexto, { color: stockColor }]}>
            {item.stockPorcentaje}%
          </Text>
        </View>
        <View style={styles.categoriaBadge}>
          <Text style={styles.categoriaTexto}>{item.categoria}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.xs,
  },
  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  cardInactiva: {
    opacity: 0.5,
    borderColor: COLORS.error,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  fieldText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  fieldMuted: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  stockBarFondo: {
    flex: 1,
    height: 5,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  stockBarRelleno: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  stockTexto: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    width: 32,
    textAlign: 'right',
  },
  categoriaBadge: {
    backgroundColor: COLORS.accentDim,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    marginLeft: SPACING.sm,
  },
  categoriaTexto: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
  },
});
