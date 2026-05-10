import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🔑</Text>
        </View>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>No worries! Enter your email and{'\n'}we'll send you reset instructions.</Text>
      </View>

      <View style={styles.card}>
        {sent ? (
          <View style={styles.successContainer}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Email Sent!</Text>
            <Text style={styles.successText}>Check your inbox for password reset instructions.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="you@company.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Reset Email →</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLogin} onPress={() => router.back()}>
              <Text style={styles.backToLoginText}>← Back to Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a237e' },
  topSection: { alignItems: 'center', paddingTop: 60, paddingBottom: 30 },
  backBtn: { position: 'absolute', top: 60, left: 24 },
  backText: { color: '#90caf9', fontSize: 16 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  iconText: { fontSize: 36 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#90caf9', textAlign: 'center', lineHeight: 22 },
  card: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, paddingTop: 36 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9f9f9', marginBottom: 24 },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, padding: 14, fontSize: 15, color: '#333' },
  button: { backgroundColor: '#1a237e', borderRadius: 14, padding: 16, alignItems: 'center', elevation: 4 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backToLogin: { marginTop: 20, alignItems: 'center' },
  backToLoginText: { color: '#1a237e', fontSize: 14, fontWeight: '600' },
  successContainer: { alignItems: 'center', paddingTop: 40 },
  successIcon: { fontSize: 60, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a237e', marginBottom: 8 },
  successText: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 32, lineHeight: 22 },
});