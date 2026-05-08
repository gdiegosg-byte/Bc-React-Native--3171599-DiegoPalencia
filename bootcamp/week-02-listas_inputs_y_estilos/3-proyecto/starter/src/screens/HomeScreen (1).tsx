// HomeScreen — Semana 02
// Dominio: Empresa de Vending Machines
// Diego Palencia — 3171599

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ListRenderItem,
} from 'react-native';
import { Item } from '../types';
import { ITEMS } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

export function HomeScreen(): React.JSX.Element {

  const [query, setQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    if (!query.trim()) return ITEMS;
    const q = query.toLowerCase();
    return ITEMS.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.ubicacion.toLowerCase().includes(q) ||
        item.zona.toLowerCase().includes(q) ||
        item.categoria.toLowerCase().includes(q) ||
        item.estado.toLowerCase().includes(q)
    );
  }, [query]);

  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Sin resultados para "{query}"
      </Text>
      <Text style={styles.emptySubText}>
        Intenta buscar por código, ubicación, categoría o estado
      </Text>
    </View>
  ), [query]);

  const renderItem: ListRenderItem<Item> = useCallback(({ item }) => (
    <ItemCard item={item} onPress={() => {}} />
  ), []);

  const operativas = ITEMS.filter(m => m.estado === 'Operativa').length;

  return (
    <KeyboardAvoidingView
      style={styles.kvContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitulo}>🥤 VendApp</Text>
              <Text style={styles.headerSubtitulo}>
                {operativas} de {ITEMS.length} máquinas operativas
              </Text>
            </View>
          </View>

          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar máquina, sede, categoría..."
              placeholderTextColor={COLORS.textMuted}
              value={query}
              onChangeText={setQuery}
              keyboardType="default"
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>

          {/* Lista */}
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kvContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerTitulo: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  headerSubtitulo: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  separator: {
    height: 1,
    marginHorizontal: SPACING.base,
    backgroundColor: COLORS.borderLight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: SPACING.xxl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
