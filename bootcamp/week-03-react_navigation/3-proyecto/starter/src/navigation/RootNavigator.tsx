// src/navigation/RootNavigator.tsx
// Configura la estructura completa de navegación:
//   Tab Navigator (raíz)
//     └── Home tab  → HomeStack (Stack Navigator anidado)
//           ├── HomeList  (catálogo de productos)
//           └── HomeDetail (detalle de un producto con params)
//     └── Favorites tab → FavoritesScreen

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { DetailScreen } from '../screens/DetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { COLORS } from '../theme';
import type { HomeStackParamList, RootTabParamList } from './types';

// ============================================
// STACK INTERNO — para la pestaña Home
// ============================================

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.accent,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Lista de productos del catálogo */}
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: 'Catálogo de Productos' }}
      />
      {/* Detalle del producto seleccionado */}
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

// ============================================
// TAB NAVIGATOR — raíz de la app
// ============================================

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Home') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
      })}
    >
      {/* Pestaña principal: catálogo */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Catálogo' }}
      />
      {/* Pestaña de favoritos */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Mis Favoritos' }}
      />
    </Tab.Navigator>
  );
}
