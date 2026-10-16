import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import type { DetailsScreenProps } from '../types/navigation';

export default function DetailsScreen(_: DetailsScreenProps): React.JSX.Element {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Ionicons name="construct" size={32} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Tecnologías usadas</Text>
        <Text style={styles.text}>• React Native + Expo</Text>
        <Text style={styles.text}>• React Navigation (Tabs + Stack)</Text>
        <Text style={styles.text}>• expo-camera</Text>
        <Text style={styles.text}>• expo-clipboard</Text>
        <Text style={styles.text}>• expo-sensors (Acelerómetro)</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="information-circle" size={32} color={COLORS.secondary} />
        <Text style={styles.cardTitle}>Adaptación al sistema operativo</Text>
        <Text style={styles.text}>
          La app detecta el SO con <Text style={styles.code}>Platform.OS</Text> y
          ajusta tamaños, espaciados del tab bar y mensajes específicos para{' '}
          {Platform.OS === 'ios' ? 'iOS' : 'Android'}.
        </Text>
        <Text style={styles.text}>
          Versión actual: <Text style={styles.code}>{String(Platform.Version)}</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 6,
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
});
