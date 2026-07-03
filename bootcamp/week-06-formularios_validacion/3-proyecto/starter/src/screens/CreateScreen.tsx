// src/screens/CreateScreen.tsx
// Formulario para crear un nuevo producto (vending machine)

import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema, type ProductoFormData } from '../schemas/productoSchema';

import { useCreateProducto } from '../hooks/useProducts';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductoFormData>({
    resolver: zodResolver(productoSchema),
    defaultValues: { name: '', description: '', price: undefined, stock: undefined, category: '' },
  });

  const { mutate: createProducto } = useCreateProducto();

  function onSubmit(data: ProductoFormData): void {
    createProducto(
      {
        name: data.name,
        description: data.description ?? '',
        price: data.price,
        stock: data.stock ?? 0,
        category: data.category,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }

  const canSubmit = !isSubmitting;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <FormField
          control={control}
          name="name"
          label="Nombre *"
          placeholder="Ej: Coca Cola, Papas Lays..."
          returnKeyType="next"
          errorMessage={errors.name?.message}
        />

        <FormField
          control={control}
          name="category"
          label="Categoría *"
          placeholder="Ej: Bebidas, Snacks, Dulces..."
          returnKeyType="next"
          errorMessage={errors.category?.message}
        />

        <FormField
          control={control}
          name="price"
          label="Precio *"
          placeholder="0.00"
          keyboardType="decimal-pad"
          errorMessage={errors.price?.message}
        />

        <FormField
          control={control}
          name="stock"
          label="Stock"
          placeholder="0"
          keyboardType="number-pad"
          errorMessage={errors.stock?.message}
        />

        <FormField
          control={control}
          name="description"
          label="Descripción"
          placeholder="Descripción opcional..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          errorMessage={errors.description?.message}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Crear producto</Text>
            }
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  hint: { ...TYPOGRAPHY.caption, fontStyle: 'italic' },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700' },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
