// src/screens/EditScreen.tsx
// Formulario para editar un producto existente (vending machine)

import React, { useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema, type ProductoFormData } from '../schemas/productoSchema';

import { useProductoById, useUpdateProducto } from '../hooks/useProducts';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  const { data: producto, isLoading } = useProductoById(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductoFormData>({
    resolver: zodResolver(productoSchema),
    defaultValues: { name: '', description: '', price: undefined, stock: undefined, category: '' },
  });

  useEffect(() => {
    if (producto) {
      reset({
        name: producto.name,
        description: producto.description ?? '',
        price: producto.price,
        stock: producto.stock,
        category: producto.category,
      });
    }
  }, [producto, reset]);

  const { mutate: updateProducto, isPending } = useUpdateProducto();

  function onSubmit(data: ProductoFormData): void {
    updateProducto(
      {
        id: Number(id),
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

  const canSubmit = !isSubmitting && !isPending && isDirty;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

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
          placeholder="Nombre del producto..."
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
            {isSubmitting || isPending
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Guardar cambios</Text>
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
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
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
