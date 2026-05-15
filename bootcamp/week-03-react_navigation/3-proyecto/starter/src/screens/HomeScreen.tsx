// src/screens/HomeScreen.tsx
// Pantalla de catálogo — muestra todos los productos disponibles en las máquinas.
// Al presionar un producto navega al DetailScreen con sus datos.

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeList'
>;

// Mapa de colores por categoría
const CATEGORY_COLORS: Record<Item['category'], string> = {
  bebida: COLORS.categoryBebida,
  snack: COLORS.categorySnack,
  dulce: COLORS.categoryDulce,
  saludable: COLORS.categorySaludable,
};

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  function handleItemPress(item: Item): void {
    navigation.navigate('HomeDetail', {
      id: item.id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      category: item.category,
      calories: item.calories,
      description: item.description,
      machineId: item.machineId,
    });
  }

  function renderItem({ item }: { item: Item }): React.JSX.Element {
    const categoryColor = CATEGORY_COLORS[item.category];
    const isLowStock = item.stock <= 5;

    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => handleItemPress(item)}
        testID={`item-${item.id}`}
      >
        {/* Badge de categoría */}
        <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '33' }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {item.category.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Fila de precio y stock */}
        <View style={styles.row}>
          <Text style={styles.price}>${item.price.toLocaleString('es-CO')}</Text>
          <Text style={[styles.stock, isLowStock && styles.stockLow]}>
            {isLowStock ? `⚠ Solo ${item.stock}` : `✓ ${item.stock} disponibles`}
          </Text>
        </View>

        <Text style={styles.chevron}>{'›'}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Text style={styles.header}>🏪 {ITEMS.length} productos disponibles</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay productos disponibles</Text>
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
  header: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  list: {
    padding: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: COLORS.surfaceAlt,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    marginBottom: SPACING.xs,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    letterSpacing: 0.5,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
  },
  stock: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.success,
  },
  stockLow: {
    color: COLORS.warning,
  },
  chevron: {
    position: 'absolute',
    right: SPACING.base,
    top: '50%',
    fontSize: TYPOGRAPHY.size.xl,
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
