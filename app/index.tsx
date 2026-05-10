import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/dashboard');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground
        source={require('../assets/images/EmployeePortal.jpg')}
        style={styles.topSection}
        imageStyle={{ opacity: 1 }}      >
        <View style={styles.overlay}>

          <Text style={styles.title}>Employee Portal</Text>
          <Text style={styles.subtitle}>CS5450 – Group 3</Text>
        </View>
      </ImageBackground>

      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome Back 👋</Text>
        <Text style={styles.signInText}>Sign in to your account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput style={styles.input} placeholder="you@company.com" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="#aaa" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.inputIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotContainer} onPress={() => router.push('/forgot-password')}>
  <Text style={styles.forgot}>Forgot password?</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In →</Text>}
        </TouchableOpacity>

        <Text style={styles.footer}>🔐 Protected by Firebase Authentication</Text>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.registerLink} onPress={() => router.push('/register')}>
          <Text style={styles.registerIcon}>✨</Text>
          <Text style={styles.registerText}>New here?    <Text style={styles.registerBold}>Create an Account</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a237e' },
  topSection: { height: 280, backgroundColor: '#1a237e' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 30, backgroundColor: 'rgba(26,35,126,0.6)' }, logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  logoText: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#90caf9', marginTop: 4 },
  card: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, paddingTop: 36, marginTop: -20 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#1a237e', marginBottom: 4 },
  signInText: { fontSize: 14, color: '#888', marginBottom: 28 },
  inputContainer: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9f9f9' },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, padding: 14, fontSize: 15, color: '#333' },
  forgotContainer: { alignItems: 'flex-end', marginBottom: 24 },
  forgot: { color: '#1a237e', fontSize: 13, fontWeight: '600' },
  button: { backgroundColor: '#1a237e', borderRadius: 14, padding: 16, alignItems: 'center', elevation: 6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#eee' },
  dividerText: { marginHorizontal: 12, fontSize: 12, color: '#bbb', fontWeight: '600' },
  registerLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F4FF', borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: '#E0E8FF', marginTop: 16 }, registerIcon: { fontSize: 16, marginRight: 8, paddingBottom: 6, },
  registerText: { fontSize: 14, color: '#666' },
  registerBold: { color: '#1E3A5F', fontWeight: 'bold' },
});