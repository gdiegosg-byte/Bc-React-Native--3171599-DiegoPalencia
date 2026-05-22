// src/screens/DetailScreen.tsx
// Pantalla de detalle de un producto de la vending machine.
// Permite agregar o quitar el producto de favoritos con Zustand.

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';
import { useSavedStore } from '../stores/savedStore';
import { ITEMS } from '../data/mockData';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name, emoji } = route.params;

  const item = ITEMS.find((i) => i.id === id);

  const isItemSaved = useSavedStore((state) => state.isItemSaved);
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const isSaved = isItemSaved(id);

  const handleToggleSave = (): void => {
    if (isSaved) {
      removeItem(id);
    } else if (item) {
      addItem(item);
    }
  };

  return (
    <View style={styles.container}>
      {/* Emoji del producto */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{emoji}</Text>
      </View>

      {/* Información principal */}
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>

        {item && (
          <>
            {/* Precio */}
            <Text style={styles.price}>
              ${item.price.toLocaleString('es-CO')} COP
            </Text>

            {/* Descripción */}
            <Text style={styles.description}>{item.description}</Text>

            {/* Detalles del producto */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Categoría</Text>
                <Text style={styles.detailValue}>{item.category}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Calorías</Text>
                <Text style={styles.detailValue}>{item.calories} kcal</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Stock</Text>
                <Text style={[
                  styles.detailValue,
                  item.stock === 0 && { color: COLORS.error },
                  item.stock > 0 && { color: COLORS.success },
                ]}>
                  {item.stock === 0 ? 'Agotado' : `${item.stock} unidades`}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>ID Producto</Text>
                <Text style={styles.detailValue}>#{item.id.padStart(4, '0')}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Botón Favorito — conectado al store Zustand */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
        testID="save-button"
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
          {isSaved ? '❤️  En favoritos' : '🤍  Agregar a favoritos'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  hero: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroEmoji: { fontSize: 52 },
  info: { gap: SPACING.sm },
  title: { ...TYPOGRAPHY.h2 },
  price: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginTop: SPACING.sm,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  detailItem: {
    width: '47%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
  },
  detailLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  saveButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  saveButtonPressed: { opacity: 0.7 },
  saveButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  saveButtonTextActive: {
    color: COLORS.background,
  },
});
