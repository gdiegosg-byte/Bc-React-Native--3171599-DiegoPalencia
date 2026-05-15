// src/screens/FavoritesScreen.tsx
// Segunda pestaña del Tab Navigator.
// Muestra los productos favoritos / más populares de las máquinas.

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FAVORITES } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';

const CATEGORY_COLORS: Record<Item['category'], string> = {
  bebida: COLORS.categoryBebida,
  snack: COLORS.categorySnack,
  dulce: COLORS.categoryDulce,
  saludable: COLORS.categorySaludable,
};

const CATEGORY_EMOJI: Record<Item['category'], string> = {
  bebida: '🥤',
  snack: '🍿',
  dulce: '🍫',
  saludable: '🥗',
};

export function FavoritesScreen(): React.JSX.Element {
  function renderFavorite({ item }: { item: Item }): React.JSX.Element {
    const categoryColor = CATEGORY_COLORS[item.category];
    const categoryEmoji = CATEGORY_EMOJI[item.category];

    return (
      <View style={styles.card}>
        <Text style={styles.heartIcon}>♥</Text>
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Text style={styles.emoji}>{categoryEmoji}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '33' }]}>
              <Text style={[styles.categoryText, { color: categoryColor }]}>
                {item.category.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.price}>${item.price.toLocaleString('es-CO')}</Text>
            <Text style={styles.calories}>{item.calories} kcal</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Favoritos</Text>
      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes productos favoritos todavía</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  heartIcon: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.error,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  emoji: {
    fontSize: TYPOGRAPHY.size.lg,
  },
  categoryBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    letterSpacing: 0.5,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  price: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
  },
  calories: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textMuted,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});
