// src/screens/SettingsScreen.tsx
// Pantalla de ajustes con preferencias persistidas en MMKV y SecureStore
// para el dominio de vending machines.

import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { usePreferences } from '../hooks/usePreferences';

const SENSITIVE_KEY = 'vending_api_key';
const MOCK_SENSITIVE = 'VEND-API-KEY-2025';

export function SettingsScreen(): React.JSX.Element {
  const {
    sortOrder,
    setSortOrder,
    compactMode,
    setCompactMode,
    itemsPerPage,
    setItemsPerPage,
    showLowStock,
    setShowLowStock,
  } = usePreferences();

  const [isSaved, setIsSaved] = useState(false);
  const [maskedValue, setMaskedValue] = useState<string | null>(null);

  async function handleSaveSensitive(): Promise<void> {
    try {
      await SecureStore.setItemAsync(SENSITIVE_KEY, MOCK_SENSITIVE);
      setIsSaved(true);
      Alert.alert('Guardado', 'API key guardada de forma segura en SecureStore.');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar en SecureStore.');
    }
  }

  async function handleReadSensitive(): Promise<void> {
    try {
      const value = await SecureStore.getItemAsync(SENSITIVE_KEY);
      if (value) {
        const masked = value.slice(0, 4) + '•••' + value.slice(-4);
        setMaskedValue(masked);
      } else {
        Alert.alert('No encontrado', 'No hay API key guardada aún.');
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo leer de SecureStore.');
    }
  }

  async function handleDeleteSensitive(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SENSITIVE_KEY);
      setIsSaved(false);
      setMaskedValue(null);
      Alert.alert('Eliminado', 'La API key fue removida de SecureStore.');
    } catch (e) {
      Alert.alert('Error', 'No se pudo eliminar de SecureStore.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.sectionTitle}>Preferencias de la app</Text>
      <Text style={styles.sectionHint}>
        Estos valores se persisten con MMKV. Cambian en tiempo real sin
        necesidad de pulsar "Guardar".
      </Text>

      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel}>Modo compacto</Text>
          <Text style={styles.rowDesc}>
            Muestra menos información por producto en la lista
          </Text>
        </View>
        <Switch
          value={compactMode}
          onValueChange={(v) => setCompactMode(v)}
          trackColor={{ false: COLORS.border, true: COLORS.accent }}
          thumbColor={COLORS.background}
        />
      </View>

      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Orden de la lista</Text>
        <View style={styles.segmented}>
          {(['asc', 'desc'] as const).map((opt) => (
            <Pressable
              key={opt}
              style={[
                styles.segment,
                sortOrder === opt && styles.segmentActive,
              ]}
              onPress={() => setSortOrder(opt)}
            >
              <Text
                style={[
                  styles.segmentText,
                  sortOrder === opt && styles.segmentTextActive,
                ]}
              >
                {opt === 'asc' ? 'A → Z' : 'Z → A'}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{sortOrder}</Text>
        </Text>
      </View>

      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Productos por página</Text>
        <View style={styles.segmented}>
          {([5, 10, 20] as const).map((n) => (
            <Pressable
              key={n}
              style={[
                styles.segment,
                itemsPerPage === n && styles.segmentActive,
              ]}
              onPress={() => setItemsPerPage(n)}
            >
              <Text
                style={[
                  styles.segmentText,
                  itemsPerPage === n && styles.segmentTextActive,
                ]}
              >
                {n}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{itemsPerPage}</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel}>Mostrar solo stock bajo</Text>
          <Text style={styles.rowDesc}>
            Filtra productos con stock menor a 5 unidades
          </Text>
        </View>
        <Switch
          value={showLowStock}
          onValueChange={(v) => setShowLowStock(v)}
          trackColor={{ false: COLORS.border, true: COLORS.accent }}
          thumbColor={COLORS.background}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>
        API Key (SecureStore)
      </Text>
      <Text style={styles.sectionHint}>
        SecureStore cifra el valor en Keychain (iOS) o Keystore (Android).
        Nunca mostrar el valor completo en pantalla.
      </Text>

      <Text style={styles.rowDesc}>
        Clave: <Text style={styles.mono}>{SENSITIVE_KEY}</Text>
        {isSaved && <Text style={{ color: COLORS.success }}> ✓</Text>}
      </Text>

      {maskedValue && (
        <View style={styles.maskedContainer}>
          <Text style={styles.rowLabel}>Valor leído (enmascarado):</Text>
          <Text style={styles.maskedValue}>{maskedValue}</Text>
        </View>
      )}

      <View style={styles.secureActions}>
        <Pressable style={styles.btnSecure} onPress={handleSaveSensitive}>
          <Text style={styles.btnSecureText}>💾 Guardar</Text>
        </Pressable>
        <Pressable
          style={[styles.btnSecure, styles.btnSecureAlt]}
          onPress={handleReadSensitive}
        >
          <Text style={[styles.btnSecureText, { color: COLORS.accent }]}>
            🔍 Leer
          </Text>
        </Pressable>
        <Pressable
          style={[styles.btnSecure, styles.btnDanger]}
          onPress={handleDeleteSensitive}
        >
          <Text style={[styles.btnSecureText, { color: COLORS.error }]}>
            🗑️ Eliminar
          </Text>
        </Pressable>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 <Text style={{ fontWeight: '700' }}>Tip:</Text> En una app real
          guardarías en SecureStore la API key del servicio de vending machines,
          el token JWT o la clave de cifrado local.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl, gap: SPACING.sm },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.xs },
  sectionHint: { ...TYPOGRAPHY.caption, marginBottom: SPACING.md, fontStyle: 'italic' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },
  rowColumn: { flexDirection: 'column', alignItems: 'flex-start', gap: SPACING.sm },
  rowInfo: { flex: 1, marginRight: SPACING.md },
  rowLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowDesc: { ...TYPOGRAPHY.caption, marginTop: 2 },
  mono: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  segmented: { flexDirection: 'row', gap: SPACING.xs },
  segment: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  segmentActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  segmentText: { ...TYPOGRAPHY.caption },
  segmentTextActive: { color: COLORS.background, fontWeight: '700' },

  maskedContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  maskedValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.accent,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  secureActions: { flexDirection: 'row', gap: SPACING.sm },
  btnSecure: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  btnSecureAlt: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnDanger: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  btnSecureText: { ...TYPOGRAPHY.caption, fontWeight: '700', color: COLORS.background },

  infoBox: {
    backgroundColor: COLORS.surface,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    borderRadius: 6,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  infoText: { ...TYPOGRAPHY.caption },
});
