import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView,
  Platform, ScrollView
} from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = () => {
    // lógica de autenticação aqui
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>🩸 HemoConecta</Text>
          <Image
            source={require('@/assets/images/hero.png')} // troque pelo seu asset
            style={styles.heroImage}
          />
          <Text style={styles.heroTitle}>Salve vidas!</Text>
          <Text style={styles.heroSubtitle}>Seja a gota que faz diferença</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.welcomeBack}>Bem-vindo de volta!</Text>
          <Text style={styles.formTitle}>Login</Text>

          <Text style={styles.label}>Email ou CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="maria.silva@example.com ou 123.456.789-00"
            placeholderTextColor="#aaa"
            value={emailOrCpf}
            onChangeText={setEmailOrCpf}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0 }]}
              placeholder="Digite sua senha"
              placeholderTextColor="#aaa"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Text style={styles.eyeIcon}>{mostrarSenha ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
            <Text style={styles.btnPrimaryText}>Conecte-se</Text>
          </TouchableOpacity>

          <View style={styles.linksRow}>
            <Link href={'/(auth)/cadastro' as any} asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Crie sua conta</Text>
              </TouchableOpacity>
            </Link>
            <Link href={'/(auth)/esqueceu-senha' as any} asChild>
              <TouchableOpacity>
                <Text style={[styles.linkText, styles.linkGreen]}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={styles.terms}>
            Ao continuar, você concorda com os{' '}
            <Text style={styles.linkGreen}>Termos</Text> e a{' '}
            <Text style={styles.linkGreen}>Política de Privacidade</Text> da HemoConecta.
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1 },
  header: { alignItems: 'center', paddingTop: 48, paddingBottom: 24, backgroundColor: '#fff' },
  appName: { fontSize: 18, fontWeight: '700', color: '#c0392b', marginBottom: 16 },
  heroImage: { width: 120, height: 120, resizeMode: 'contain' },
  heroTitle: { fontSize: 22, fontWeight: '700', marginTop: 8 },
  heroSubtitle: { fontSize: 16, color: '#555' },
  form: { flex: 1, backgroundColor: '#f9f9f9', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  welcomeBack: { fontSize: 13, color: '#888', marginBottom: 2 },
  formTitle: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 13, color: '#555', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, backgroundColor: '#fff' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, marginBottom: 16, backgroundColor: '#fff' },
  eyeIcon: { fontSize: 18, padding: 4 },
  btnPrimary: { backgroundColor: '#c0392b', borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 20 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  linkText: { fontSize: 14, color: '#333' },
  linkGreen: { color: '#27ae60' },
  terms: { fontSize: 12, color: '#888', textAlign: 'center', lineHeight: 18 },
});