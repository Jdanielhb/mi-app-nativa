import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import type { HomeScreenProps } from '../types/navigation';

interface CardItem {
  title: string;
  desc: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  screen: 'Cámara' | 'Portapapeles' | 'Sensor';
}

const CARDS: CardItem[] = [
  {
    title: 'Cámara nativa',
    desc: 'Captura fotos usando la cámara del dispositivo.',
    icon: 'camera',
    color: '#4F46E5',
    screen: 'Cámara',
  },
  {
    title: 'Portapapeles',
    desc: 'Copia y pega texto usando el portapapeles del sistema.',
    icon: 'clipboard',
    color: '#10B981',
    screen: 'Portapapeles',
  },
  {
    title: 'Acelerómetro',
    desc: 'Visualiza los datos del sensor de movimiento en tiempo real.',
    icon: 'speedometer',
    color: '#F59E0B',
    screen: 'Sensor',
  },
];

export default function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="phone-portrait" size={32} color={COLORS.white} />
        </View>
        <Text style={styles.title}>Mi App Nativa</Text>
        <Text style={styles.subtitle}>
          React Native + Expo · {Platform.OS === 'ios' ? 'iOS' : 'Android'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Funcionalidades</Text>

      {CARDS.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={[styles.cardIcon, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={24} color={COLORS.white} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.detailsButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details')}
      >
        <Ionicons name="information-circle" size={20} color={COLORS.white} />
        <Text style={styles.detailsButtonText}>Ver detalles del proyecto</Text>
      </TouchableOpacity>

      <View style={styles.platformBox}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'logo-apple' : 'logo-android'}
          size={18}
          color={COLORS.primary}
        />
        <Text style={styles.platformText}>
          Ejecutándose en {Platform.OS === 'ios' ? 'iOS' : 'Android'} · versión{' '}
          {Platform.Version}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 28, marginTop: 8 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  cardDesc: { fontSize: 12, color: COLORS.textLight, lineHeight: 16 },
  detailsButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  detailsButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  platformBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
  },
  platformText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    marginLeft: 6,
    fontWeight: '600',
  },
});

