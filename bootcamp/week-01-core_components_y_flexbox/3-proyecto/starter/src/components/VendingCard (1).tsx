// Componente reutilizable: tarjeta de máquina vending
// Bootcamp React Native — Diego Palencia 3171599

import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { VendingMachine, EstadoMaquina } from '@/types';

// ─── Props ───────────────────────────────────────────────────────────────────
interface VendingCardProps {
  maquina: VendingMachine;
  onPress: (id: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getStockColor(porcentaje: number): string {
  if (porcentaje > 50) return '#22c55e'; // verde
  if (porcentaje >= 20) return '#f59e0b'; // amarillo
  return '#ef4444';                        // rojo
}

function getEstadoStyle(estado: EstadoMaquina): {
  backgroundColor: string;
  color: string;
} {
  switch (estado) {
    case 'Operativa':
      return { backgroundColor: '#14532d', color: '#4ade80' };
    case 'Mantenimiento':
      return { backgroundColor: '#78350f', color: '#fbbf24' };
    case 'Fuera de servicio':
      return { backgroundColor: '#450a0a', color: '#f87171' };
  }
}

// ─── Componente ──────────────────────────────────────────────────────────────
export function VendingCard({ maquina, onPress }: VendingCardProps): React.JSX.Element {
  const stockColor = getStockColor(maquina.stockPorcentaje);
  const estadoStyle = getEstadoStyle(maquina.estado);
  const isInactiva = maquina.estado === 'Fuera de servicio';

  return (
    <View style={[styles.card, isInactiva && styles.cardInactiva]}>

      {/* Imagen */}
      <Image
        source={{ uri: maquina.imagen }}
        style={[styles.imagen, isInactiva && styles.imagenInactiva]}
        resizeMode="cover"
      />

      {/* Contenido */}
      <View style={styles.contenido}>

        {/* Encabezado: código + badge de estado */}
        <View style={styles.encabezado}>
          <Text style={styles.codigo}>{maquina.codigo}</Text>
          <View style={[styles.estadoBadge, { backgroundColor: estadoStyle.backgroundColor }]}>
            <Text style={[styles.estadoTexto, { color: estadoStyle.color }]}>
              {maquina.estado}
            </Text>
          </View>
        </View>

        {/* Ubicación */}
        <Text style={styles.ubicacion}>{maquina.ubicacion}</Text>
        <Text style={styles.zona}>{maquina.zona}</Text>

        {/* Stock */}
        <View style={styles.stockContainer}>
          <Text style={styles.stockLabel}>Stock</Text>
          <View style={styles.stockBarraFondo}>
            <View
              style={[
                styles.stockBarraRelleno,
                {
                  width: `${maquina.stockPorcentaje}%`,
                  backgroundColor: stockColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.stockPorcentaje, { color: stockColor }]}>
            {maquina.stockPorcentaje}%
          </Text>
        </View>

        {/* Última revisión */}
        <Text style={styles.revision}>Revisión: {maquina.ultimaRevision}</Text>

        {/* Botón */}
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
            isInactiva && styles.botonInactivo,
          ]}
          onPress={() => onPress(maquina.id)}
          disabled={isInactiva}
        >
          <Text style={styles.botonTexto}>
            {isInactiva ? 'Sin servicio' : 'Ver Detalle'}
          </Text>
        </Pressable>

      </View>
    </View>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardInactiva: {
    opacity: 0.55,
    borderColor: '#ef4444',
  },
  imagen: {
    width: '100%',
    height: 160,
    backgroundColor: '#21262d',
  },
  imagenInactiva: {
    opacity: 0.4,
  },
  contenido: {
    padding: 14,
    gap: 6,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codigo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6edf3',
    letterSpacing: 1,
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  estadoTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  ubicacion: {
    fontSize: 14,
    color: '#8b949e',
    fontWeight: '500',
  },
  zona: {
    fontSize: 12,
    color: '#6e7681',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  stockLabel: {
    fontSize: 12,
    color: '#8b949e',
    width: 36,
  },
  stockBarraFondo: {
    flex: 1,
    height: 6,
    backgroundColor: '#21262d',
    borderRadius: 4,
    overflow: 'hidden',
  },
  stockBarraRelleno: {
    height: '100%',
    borderRadius: 4,
  },
  stockPorcentaje: {
    fontSize: 12,
    fontWeight: '700',
    width: 36,
    textAlign: 'right',
  },
  revision: {
    fontSize: 11,
    color: '#484f58',
    marginTop: 2,
  },
  boton: {
    marginTop: 8,
    backgroundColor: '#238636',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonPresionado: {
    backgroundColor: '#2ea043',
    opacity: 0.85,
  },
  botonInactivo: {
    backgroundColor: '#21262d',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
