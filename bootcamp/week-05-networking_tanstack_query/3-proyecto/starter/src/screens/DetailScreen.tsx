// src/screens/DetailScreen.tsx
// Pantalla de detalle de un producto de vending machine

import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  const isLoading = false;
  const isError = false;
  const producto = null;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el detalle</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.idBadge}>ID: {id}</Text>
      </View>

      {!producto ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Implementa useProductoById() en src/hooks/useProducts.ts para ver los
            detalles completos del producto aquí.
          </Text>
        </View>
      ) : (
        <View style={styles.fieldsCard}>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Categoría</Text>
            <Text style={styles.fieldValue}>{producto.category}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Precio</Text>
            <Text style={styles.fieldValue}>${producto.price}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Stock</Text>
            <Text style={styles.fieldValue}>{producto.stock} unidades</Text>
          </View>
          {producto.description && (
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Descripción</Text>
              <Text style={styles.fieldValue}>{producto.description}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  hero: { alignItems: 'center', gap: SPACING.sm },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLetter: { fontSize: 36, fontWeight: '700', color: COLORS.accent },
  title: { ...TYPOGRAPHY.h2, textAlign: 'center' },
  idBadge: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 1 },
  infoBox: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  infoText: { ...TYPOGRAPHY.caption, textAlign: 'center', color: COLORS.textMuted },
  fieldsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: { ...TYPOGRAPHY.label, color: COLORS.textSecondary },
  fieldValue: { ...TYPOGRAPHY.body, fontWeight: '600' },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
});
