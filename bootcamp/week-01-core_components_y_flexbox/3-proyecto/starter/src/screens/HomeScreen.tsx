// Pantalla principal — Lista de máquinas vending
// Bootcamp React Native — Diego Palencia 3171599

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { VendingCard } from '@/components/VendingCard';
import { maquinas } from '@/data/mockData';

// ─── Componente ──────────────────────────────────────────────────────────────
export function HomeScreen(): React.JSX.Element {

  const operativas = maquinas.filter(m => m.estado === 'Operativa').length;
  const total = maquinas.length;

  function handleVerDetalle(id: string): void {
    const maquina = maquinas.find(m => m.id === id);
    if (maquina) {
      Alert.alert(
        maquina.codigo,
        `Ubicación: ${maquina.ubicacion}\nZona: ${maquina.zona}\nStock: ${maquina.stockPorcentaje}%`,
        [{ text: 'Cerrar' }]
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitulo}>🥤 VendApp</Text>
          <Text style={styles.headerSubtitulo}>Gestión de Máquinas</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeTexto}>{operativas}/{total}</Text>
          <Text style={styles.headerBadgeLabel}>Operativas</Text>
        </View>
      </View>

      {/* Lista de tarjetas */}
      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.listaContenido}
        showsVerticalScrollIndicator={false}
      >
        {maquinas.map(maquina => (
          <VendingCard
            key={maquina.id}
            maquina={maquina}
            onPress={handleVerDetalle}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#21262d',
    backgroundColor: '#0d1117',
  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e6edf3',
  },
  headerSubtitulo: {
    fontSize: 13,
    color: '#8b949e',
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: '#161b22',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  headerBadgeTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  headerBadgeLabel: {
    fontSize: 10,
    color: '#6e7681',
    marginTop: 1,
  },
  lista: {
    flex: 1,
  },
  listaContenido: {
    paddingVertical: 12,
    paddingBottom: 32,
  },
});
