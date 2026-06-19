import { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmarCodigo() {
  const { emailOuCpf } = useLocalSearchParams();
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const novoCodigo = [...codigo];
    novoCodigo[index] = text;
    setCodigo(novoCodigo);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerificar = () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length !== 6 || codigo.some(d => !d.trim())) {
      Alert.alert('Campos obrigatórios', 'O código deve ter 6 dígitos.');
      return;
    }
    router.push({
      pathname: '/auth/nova-senha',
      params: { emailOuCpf: String(emailOuCpf) },
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
          <View style={styles.iconCircle}>
            <Ionicons name="lock-closed" size={28} color="#c0392b" />
          </View>

          <Text style={styles.title}>Confirmar código</Text>
          <Text style={styles.subtitle}>
            Insira o código de 6 dígitos enviado para o seu número de telefone ou
            e-mail para continuar com a recuperação de senha.
          </Text>

          <View style={styles.codeRow}>
            {codigo.map((digito, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputs.current[index] = ref; }}
                style={styles.codeInput}
                value={digito}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.linkCenter}>
            <Text style={styles.linkGray}>Não recebeu o código?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleVerificar}>
            <Text style={styles.btnPrimaryText}>Verificar código</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Se você não reconhece esta solicitação, entre em contato com o suporte do
          HemoConecta em{' '}
          <Text style={styles.footerLink}>suporte@hemoconecta.app</Text>
        </Text>
        <Text style={styles.footerSmall}>
          Protegemos seus dados. Política de privacidade disponível no app.
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, padding: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  appName: { fontSize: 16, fontWeight: '700', color: '#111' },
  card: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 20, alignItems: 'center' },
  iconCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#fdecea', alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#888', lineHeight: 20, textAlign: 'center', marginBottom: 24 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16 },
  codeInput: {
    width: 40, height: 48, borderWidth: 1, borderColor: '#ddd',
    borderRadius: 8, textAlign: 'center', fontSize: 18, color: '#111',
    backgroundColor: '#fff',
  },
  linkCenter: { marginBottom: 24 },
  linkGray: { color: '#999', fontSize: 13 },
  btnPrimary: {
    backgroundColor: '#c0392b', borderRadius: 8,
    padding: 16, alignItems: 'center', width: '100%',
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  footerText: { fontSize: 12, color: '#888', textAlign: 'center', lineHeight: 18, marginTop: 24 },
  footerLink: { color: '#27ae60' },
  footerSmall: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 12 },
});
