// src/screens/DetailScreen.tsx
// Pantalla de detalle — muestra toda la información de un producto de vending machine.

import type { NativeStackRouteProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type DetailScreenRouteProp = NativeStackRouteProp<HomeStackParamList, 'HomeDetail'>;

const CATEGORY_COLORS: Record<string, string> = {
  bebida: COLORS.categoryBebida,
  snack: COLORS.categorySnack,
  dulce: COLORS.categoryDulce,
  saludable: COLORS.categorySaludable,
};

const CATEGORY_EMOJI: Record<string, string> = {
  bebida: '🥤',
  snack: '🍿',
  dulce: '🍫',
  saludable: '🥗',
};

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailScreenRouteProp>();
  const { id, name, price, stock, category, calories, description, machineId } = route.params;

  const categoryColor = CATEGORY_COLORS[category] ?? COLORS.accent;
  const categoryEmoji = CATEGORY_EMOJI[category] ?? '📦';
  const isLowStock = stock <= 5;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Emoji + nombre */}
      <Text style={styles.emoji}>{categoryEmoji}</Text>
      <Text style={styles.name}>{name}</Text>

      {/* Badge de categoría */}
      <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '33' }]}>
        <Text style={[styles.categoryText, { color: categoryColor }]}>
          {category.toUpperCase()}
        </Text>
      </View>

      {/* Descripción */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Descripción</Text>
        <Text style={styles.fieldValue}>{description}</Text>
      </View>

      {/* Precio */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Precio</Text>
        <Text style={[styles.fieldValue, styles.priceValue]}>
          ${price.toLocaleString('es-CO')} COP
        </Text>
      </View>

      {/* Stock */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Disponibilidad</Text>
        <Text style={[styles.fieldValue, isLowStock ? styles.stockLow : styles.stockOk]}>
          {isLowStock
            ? `⚠ Solo quedan ${stock} unidades`
            : `✓ ${stock} unidades disponibles`}
        </Text>
      </View>

      {/* Calorías */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Calorías</Text>
        <Text style={styles.fieldValue}>
          {calories === 0 ? 'Sin calorías' : `${calories} kcal por porción`}
        </Text>
      </View>

      {/* Máquina */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Máquina expendedora</Text>
        <Text style={styles.fieldValue}>{machineId}</Text>
      </View>

      {/* ID interno */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Ref: {id}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.md,
    alignItems: 'flex-start',
  },
  emoji: {
    fontSize: 48,
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  categoryBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    letterSpacing: 0.5,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '100%',
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
  },
  priceValue: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
  },
  stockOk: {
    color: COLORS.success,
  },
  stockLow: {
    color: COLORS.warning,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
  },
});
