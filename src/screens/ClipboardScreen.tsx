import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function ClipboardScreen(): React.JSX.Element {
  const [text, setText] = useState<string>('');
  const [pasted, setPasted] = useState<string>('');

  const copyToClipboard = async (): Promise<void> => {
    if (!text.trim()) {
      Alert.alert('Campo vacío', 'Escribe algo antes de copiar.');
      return;
    }
    await Clipboard.setStringAsync(text);
    Alert.alert('✅ Copiado', 'El texto se guardó en el portapapeles.');
  };

  const pasteFromClipboard = async (): Promise<void> => {
    const value = await Clipboard.getStringAsync();
    if (!value) {
      Alert.alert('Portapapeles vacío', 'No hay texto en el portapapeles.');
      return;
    }
    setPasted(value);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="clipboard" size={28} color={COLORS.white} />
        </View>
        <Text style={styles.title}>Portapapeles</Text>
        <Text style={styles.subtitle}>
          Usa el portapapeles nativo de {Platform.OS === 'ios' ? 'iOS' : 'Android'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Texto a copiar</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe algo aquí..."
          placeholderTextColor={COLORS.textLight}
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.primaryBtn} onPress={copyToClipboard}>
          <Ionicons name="copy" size={18} color={COLORS.white} />
          <Text style={styles.primaryBtnText}>Copiar al portapapeles</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Contenido del portapapeles</Text>
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: COLORS.secondary }]}
          onPress={pasteFromClipboard}
        >
          <Ionicons name="download" size={18} color={COLORS.white} />
          <Text style={styles.primaryBtnText}>Pegar desde portapapeles</Text>
        </TouchableOpacity>

        {pasted ? (
          <View style={styles.pastedBox}>
            <Text style={styles.pastedText}>{pasted}</Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>
            Aún no has pegado ningún contenido.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 24 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 90,
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
    marginBottom: 12,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  pastedBox: {
    marginTop: 12,
    padding: 14,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  pastedText: { color: COLORS.text, fontSize: 14, lineHeight: 20 },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 13,
    marginTop: 12,
    fontStyle: 'italic',
  },
});
