import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, Switch, Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function CadastroEtapa2() {
  const { nome, cpf, senha } = useLocalSearchParams();

  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [pais, setPais] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [alertasDoacao, setAlertasDoacao] = useState(true);
  const [campanhas, setCampanhas] = useState(true);
  const [lembretes, setLembretes] = useState(true);

  const handleCriarConta = () => {
    if (!email.trim() || !telefone.trim() || !tipoSanguineo.trim() || !pais.trim() || !estado.trim() || !cidade.trim() || !bairro.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos obrigatórios para continuar.');
      return;
    }

    const dadosCompletos = {
      nome, cpf, senha,
      email, telefone, tipoSanguineo,
      pais, estado, cidade, bairro, endereco,
      notificacoes: { alertasDoacao, campanhas, lembretes },
    };
    console.log('Criar conta:', dadosCompletos);
    // chamar API aqui
    // navegar para a tela inicial. usar rota baseada no arquivo criado em /app/home/index.tsx
    router.replace('/home' as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Topo */}
        <Text style={styles.appName}>🩸 HemoConect</Text>
        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#111" />
          <Text style={styles.pageTitle}>  Criar conta - Etapa 2 de 2</Text>
        </TouchableOpacity>
        <Text style={styles.pageSubtitle}>Salve vidas! Seja a gota que faltava!</Text>

        <Text style={styles.sectionTitle}>Queremos saber mais sobre você</Text>

        {/* Contato */}
        <View style={styles.section}>
          <Text style={styles.label}>Dados para contato</Text>
          <TextInput
            style={styles.input}
            placeholder="Email: mariajose@gmail.com"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone: (xx) x xxxx-xxxx"
            placeholderTextColor="#aaa"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          {/* Tipo sanguíneo */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tipoSanguineo}
              onValueChange={setTipoSanguineo}
              style={styles.picker}
            >
              <Picker.Item label="Tipo Sanguíneo" value="" color="#aaa" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>
        </View>

        {/* Localização */}
        <View style={styles.section}>
          <Text style={styles.label}>Localização</Text>
          {[
            { placeholder: 'País', value: pais, setter: setPais },
            { placeholder: 'Estado', value: estado, setter: setEstado },
            { placeholder: 'Cidade', value: cidade, setter: setCidade },
            { placeholder: 'Bairro', value: bairro, setter: setBairro },
          ].map(({ placeholder, value, setter }) => (
            <View key={placeholder} style={styles.pickerWrapper}>
              <Picker
                selectedValue={value}
                onValueChange={setter}
                style={styles.picker}
              >
                <Picker.Item label={placeholder} value="" color="#aaa" />
              </Picker>
            </View>
          ))}

          <TextInput
            style={styles.input}
            placeholder="Endereço"
            placeholderTextColor="#aaa"
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        {/* Notificações */}
        <View style={styles.section}>
          <Text style={styles.label}>Notificações</Text>
          {[
            { label: 'Receber alertas de doação urgente', value: alertasDoacao, setter: setAlertasDoacao },
            { label: 'Receber campanhas', value: campanhas, setter: setCampanhas },
            { label: 'Lembretes de doação', value: lembretes, setter: setLembretes },
          ].map(({ label, value, setter }) => (
            <View key={label} style={styles.switchRow}>
              <Text style={styles.switchLabel}>{label}</Text>
              <Switch
                value={value}
                onValueChange={setter}
                trackColor={{ false: '#ddd', true: '#27ae60' }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleCriarConta}>
          <Text style={styles.btnPrimaryText}>Criar conta</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Ao continuar, você concorda com os{' '}
          <Text style={styles.linkGreen}>Termos</Text> e a{' '}
          <Text style={styles.linkGreen}>Política de Privacidade</Text> da HemoConecta.
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, padding: 24 },
  appName: { fontSize: 18, fontWeight: '700', color: '#c0392b', marginBottom: 12, textAlign: 'center' },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  pageSubtitle: { fontSize: 13, color: '#888', marginBottom: 24, lineHeight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 16 },
  section: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 16, marginBottom: 16 },
  label: { fontSize: 13, color: '#555', marginBottom: 4, marginTop: 8 },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#ddd',
    paddingVertical: 10, fontSize: 14, color: '#111', marginBottom: 4,
  },
  pickerWrapper: {
    borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 4,
  },
  picker: { color: '#111' },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 8,
  },
  switchLabel: { fontSize: 14, color: '#333', flex: 1, marginRight: 8 },
  btnPrimary: {
    backgroundColor: '#c0392b', borderRadius: 8,
    padding: 16, alignItems: 'center', marginBottom: 16,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkGreen: { color: '#27ae60' },
  terms: { fontSize: 12, color: '#888', textAlign: 'center', lineHeight: 18, marginBottom: 32 },
});