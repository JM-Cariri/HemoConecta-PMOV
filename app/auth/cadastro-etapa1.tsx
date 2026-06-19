import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroEtapa1() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [erro, setErro] = useState('');

  const handleProsseguir = () => {
    if (!nome.trim() || !cpf.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Campos obrigatórios', 'As senhas não coincidem.');
      return;
    }
    setErro('');
    router.push({
      pathname: '/auth/cadastro-etapa2' as const,
      params: { nome, cpf, senha },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Topo */}
        <Text style={styles.appName}>🩸 HemoConect</Text>
        <Text style={styles.pageTitle}>Criar conta - Etapa 1 de 2</Text>
        <Text style={styles.pageSubtitle}>
          Cadastre-se para encontrar hemocentros próximos e acompanhar estoques de sangue.
        </Text>

        {/* Seção */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados pessoais</Text>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Maria Silva"
            placeholderTextColor="#aaa"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="182.562.410-01"
            placeholderTextColor="#aaa"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Crie uma senha segura"
              placeholderTextColor="#aaa"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons
                name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Repita a senha"
              placeholderTextColor="#aaa"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!mostrarConfirmar}
            />
            <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
              <Ionicons
                name={mostrarConfirmar ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        </View>

        <Link href={'/auth/login' as any} asChild>
          <TouchableOpacity style={styles.linkCenter}>
            <Text style={styles.linkGreen}>Já tem conta?</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleProsseguir}>
          <Text style={styles.btnPrimaryText}>Prosseguir</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, padding: 24 },
  appName: { fontSize: 18, fontWeight: '700', color: '#c0392b', marginBottom: 12, textAlign: 'center' },
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 6 },
  pageSubtitle: { fontSize: 13, color: '#888', marginBottom: 24, lineHeight: 20 },
  section: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 16 },
  label: { fontSize: 13, color: '#555', marginBottom: 4, marginTop: 8 },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#ddd',
    paddingVertical: 10, fontSize: 14, color: '#111', marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#ddd',
    paddingVertical: 10, marginBottom: 4,
  },
  inputFlex: { flex: 1, fontSize: 14, color: '#111' },
  erro: { color: '#c0392b', fontSize: 13, marginTop: 8 },
  linkCenter: { alignItems: 'flex-end', marginBottom: 24 },
  linkGreen: { color: '#27ae60', fontSize: 14 },
  btnPrimary: {
    backgroundColor: '#c0392b', borderRadius: 8,
    padding: 16, alignItems: 'center', marginBottom: 32,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});