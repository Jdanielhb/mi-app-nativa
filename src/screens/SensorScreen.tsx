import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface SensorData {
  x: number;
  y: number;
  z: number;
}

interface ValueCardProps {
  axis: 'X' | 'Y' | 'Z';
  value: string;
  color: string;
}

type Subscription = { remove: () => void };

function ValueCard({ axis, value, color }: ValueCardProps): React.JSX.Element {
  return (
    <View style={[styles.valueCard, { borderTopColor: color }]}>
      <Text style={[styles.axisLabel, { color }]}>{axis}</Text>
      <Text style={styles.axisValue}>{value}</Text>
    </View>
  );
}

export default function SensorScreen(): React.JSX.Element {
  const [data, setData] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [available, setAvailable] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    (async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      setAvailable(isAvailable);
    })();
    return () => {
      subscription?.remove();
    };
  }, [subscription]);

  const toggleSensor = (): void => {
    if (active) {
      subscription?.remove();
      setSubscription(null);
      setActive(false);
      setData({ x: 0, y: 0, z: 0 });
    } else {
      Accelerometer.setUpdateInterval(200);
      const sub = Accelerometer.addListener((measurement) => {
        // Solo tomamos x, y, z (ignoramos timestamp)
        const { x, y, z } = measurement;
        setData({ x, y, z });
      });
      setSubscription(sub);
      setActive(true);
    }
  };

  const magnitude = Math.sqrt(
    data.x * data.x + data.y * data.y + data.z * data.z
  ).toFixed(2);

  if (!available) {
    return (
      <View style={styles.center}>
        <Ionicons name="warning" size={64} color={COLORS.accent} />
        <Text style={styles.unavailableText}>
          El acelerómetro no está disponible en este dispositivo.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="speedometer" size={28} color={COLORS.white} />
        </View>
        <Text style={styles.title}>Acelerómetro</Text>
        <Text style={styles.subtitle}>Sensor de movimiento en tiempo real</Text>
      </View>

      <View style={styles.valuesRow}>
        <ValueCard axis="X" value={data.x.toFixed(2)} color="#EF4444" />
        <ValueCard axis="Y" value={data.y.toFixed(2)} color="#10B981" />
        <ValueCard axis="Z" value={data.z.toFixed(2)} color="#3B82F6" />
      </View>

      <View style={styles.magnitudeCard}>
        <Ionicons name="pulse" size={26} color={COLORS.primary} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.magnitudeLabel}>Magnitud</Text>
          <Text style={styles.magnitudeValue}>{magnitude}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.toggleBtn,
          { backgroundColor: active ? COLORS.danger : COLORS.primary },
        ]}
        onPress={toggleSensor}
        activeOpacity={0.85}
      >
        <Ionicons
          name={active ? 'pause' : 'play'}
          size={20}
          color={COLORS.white}
        />
        <Text style={styles.toggleText}>
          {active ? 'Detener sensor' : 'Iniciar sensor'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'logo-apple' : 'logo-android'}
          size={18}
          color={COLORS.primaryDark}
        />
        <Text style={styles.infoText}>
          Los valores se actualizan cada 200 ms · {Platform.OS.toUpperCase()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  unavailableText: {
    marginTop: 16,
    fontSize: 15,
    color: COLORS.text,
    textAlign: 'center',
  },
  header: { alignItems: 'center', marginBottom: 24 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  valueCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  axisLabel: { fontSize: 13, fontWeight: '800', marginBottom: 4 },
  axisValue: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  magnitudeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  magnitudeLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  magnitudeValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 2,
  },
  toggleBtn: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  toggleText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    padding: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    marginLeft: 6,
    fontWeight: '600',
  },
});
