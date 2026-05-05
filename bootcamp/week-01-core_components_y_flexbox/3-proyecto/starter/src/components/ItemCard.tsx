// ============================================================
// COMPONENT: ItemCard
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const [pressed, setPressed] = useState<boolean>(false);

  function handlePress(): void {
    if (!item.available) {
      Alert.alert('Sin stock', `${item.name} no está disponible.`);
      return;
    }
    onPress(item);
  }

  return (
    <Pressable
      style={[styles.card, pressed && styles.cardPressed]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={handlePress}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
        </View>

        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        <Text style={styles.cardMachine}>📍 {item.machine}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
          <Text style={[styles.cardStock, !item.available && styles.cardStockEmpty]}>
            {item.available ? `Stock: ${item.stock}` : 'Agotado'}
          </Text>
        </View>

        <View style={[styles.button, !item.available && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>
            {item.available ? 'Comprar' : 'No disponible'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardPressed: {
    opacity: 0.8,
    borderColor: '#6c63ff',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 16,
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6c63ff',
    textTransform: 'uppercase',
    backgroundColor: '#1f1f3a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8b949e',
  },
  cardMachine: {
    fontSize: 12,
    color: '#555',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  cardStock: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4caf50',
  },
  cardStockEmpty: {
    color: '#e53935',
  },
  button: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#30363d',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
