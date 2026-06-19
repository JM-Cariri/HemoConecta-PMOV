import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NovaSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [erro, setErro] = useState('');

  const handleRedefinir = () => {
    if (!novaSenha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
      return;
    }
    if (novaSenha.length < 8) {
      Alert.alert('Campos obrigatórios', 'A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Campos obrigatórios', 'As senhas não coincidem.');
      return;
    }
    setErro('');
    router.replace('/home');
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
          <Text style={styles.title}>Nova senha</Text>
          <Text style={styles.subtitle}>
            Crie uma nova senha segura para sua conta. Utilize pelo menos 8
            caracteres, incluindo números e letras.
          </Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="Nova senha"
              placeholderTextColor="#aaa"
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry={!mostrarSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons
                name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.hint}>Mínimo 8 caracteres</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="Confirmar nova senha"
              placeholderTextColor="#aaa"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!mostrarConfirmar}
            />
            <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
              <Ionicons
                name={mostrarConfirmar ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.btnPrimary} onPress={handleRedefinir}>
            <Text style={styles.btnPrimaryText}>Redefinir senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkCenter} onPress={() => router.replace('/auth/login')}>
            <Text style={styles.linkRed}>Voltar para login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Precisa de ajuda? Entre em contato com suporte pelo telefone (11) 4000-1234.
        </Text>
        <Text style={styles.footerSmall}>HemoConecta · Versão 2.4.1</Text>

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
  title: { fontSize: 18, fontWeight: '700', color: '#c0392b', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#888', lineHeight: 20, marginBottom: 20 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, backgroundColor: '#fff',
  },
  inputIcon: { marginRight: 8 },
  inputFlex: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#111' },
  hint: { fontSize: 11, color: '#999', marginBottom: 16, marginTop: 4 },
  erro: { color: '#c0392b', fontSize: 13, marginBottom: 12, marginTop: 4 },
  btnPrimary: {
    backgroundColor: '#c0392b', borderRadius: 8,
    padding: 16, alignItems: 'center', marginTop: 8, marginBottom: 12,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkCenter: { alignItems: 'center' },
  linkRed: { color: '#c0392b', fontSize: 14, fontWeight: '500' },
  footer: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 32, lineHeight: 16 },
  footerSmall: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 8 },
});