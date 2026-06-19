import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EsqueceuSenha() {
  const [emailOuCpf, setEmailOuCpf] = useState('');

  const handleEnviar = () => {
    if (!emailOuCpf.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
      return;
    }
    router.push({
      pathname: '/auth/confirmar-codigo' as const,
      params: { emailOuCpf },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.headerRow}>
          <Ionicons name="water" size={18} color="#c0392b" />
          <Text style={styles.appName}> HemoConecta</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Recuperar senha</Text>
          <Text style={styles.subtitle}>
            Informe seu Email ou CPF. Enviaremos um código de verificação para que
            você possa redefinir sua senha.
          </Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="Email ou CPF"
              placeholderTextColor="#aaa"
              value={emailOuCpf}
              onChangeText={setEmailOuCpf}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.hint}>
            Verifique também a caixa de spam caso não receba o código em alguns minutos.
          </Text>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleEnviar}>
            <Text style={styles.btnPrimaryText}>Enviar código</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkCenter} onPress={() => router.replace('/auth/login')}>
            <Text style={styles.linkRed}>Voltar para login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>HemoConecta · Versão 2.3 · Suporte:</Text>
        <Text style={styles.footerLink}>suporte@hemoconecta.app</Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, padding: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  appName: { fontSize: 16, fontWeight: '700', color: '#111' },
  card: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 20 },
  title: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#888', lineHeight: 20, marginBottom: 20 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, backgroundColor: '#fff', marginBottom: 8,
  },
  inputIcon: { marginRight: 8 },
  inputFlex: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#111' },
  hint: { fontSize: 12, color: '#999', marginBottom: 20 },
  btnPrimary: {
    backgroundColor: '#c0392b', borderRadius: 8,
    padding: 16, alignItems: 'center', marginBottom: 12,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkCenter: { alignItems: 'center' },
  linkRed: { color: '#c0392b', fontSize: 14, fontWeight: '500' },
  footer: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 32 },
  footerLink: { fontSize: 11, color: '#27ae60', textAlign: 'center' },
});