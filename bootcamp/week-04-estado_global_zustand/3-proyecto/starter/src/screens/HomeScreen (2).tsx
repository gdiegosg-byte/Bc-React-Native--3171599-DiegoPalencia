// src/screens/HomeScreen.tsx
// Pantalla principal: catálogo de productos de la vending machine.

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

const CATEGORY_LABEL: Record<string, string> = {
  bebidas: '💧 Bebidas',
  cafe: '☕ Café',
  snacks: '🥔 Snacks',
  dulces: '🍫 Dulces',
  saludable: '🌾 Saludable',
};

interface ItemCardProps {
  item: Item;
  onPress: () => void;
}

function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const outOfStock = item.stock === 0;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        outOfStock && styles.cardDisabled,
      ]}
      onPress={onPress}
      disabled={outOfStock}
      testID={`item-card-${item.id}`}
    >
      {/* Emoji del producto */}
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailEmoji}>{item.emoji}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardMeta}>
          <Text style={styles.cardCategory}>
            {CATEGORY_LABEL[item.category] ?? item.category}
          </Text>
          <Text style={styles.cardCalories}>{item.calories} kcal</Text>
        </View>
      </View>

      <View style={styles.cardRight}>
        <Text style={styles.cardPrice}>
          ${item.price.toLocaleString('es-CO')}
        </Text>
        <Text style={[styles.cardStock, outOfStock && { color: COLORS.error }]}>
          {outOfStock ? 'Agotado' : `${item.stock} disp.`}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavProp>();
  const items = ITEMS;

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ItemCard
      item={item}
      onPress={() =>
        navigation.navigate('HomeDetail', {
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          emoji: item.emoji,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>
            {items.length} producto{items.length !== 1 ? 's' : ''} disponibles
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay productos disponibles.</Text>
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
  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  separator: {
    height: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardPressed: { opacity: 0.7 },
  cardDisabled: { opacity: 0.4 },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailEmoji: { fontSize: 28 },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  cardDescription: {
    ...TYPOGRAPHY.caption,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: 2,
  },
  cardCategory: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
  },
  cardCalories: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.accent,
  },
  cardStock: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.success,
  },
  chevron: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textMuted,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
});
