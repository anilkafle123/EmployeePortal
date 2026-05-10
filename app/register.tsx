import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const roles = ['Employee', 'HR', 'Admin'];

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}|${role}`
      });
      Alert.alert('Success! 🎉', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/dashboard') }
      ]);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topSection}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>EP</Text>
        </View>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the Employee Portal today</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.nameRow}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>First Name</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput style={styles.input} placeholder="Anil" placeholderTextColor="#aaa" value={firstName} onChangeText={setFirstName} />
            </View>
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput style={styles.input} placeholder="kafle" placeholderTextColor="#aaa" value={lastName} onChangeText={setLastName} />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Work Email</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput style={styles.input} placeholder="you@company.com" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput style={styles.input} placeholder="Min. 6 characters" placeholderTextColor="#aaa" value={password} onChangeText={setPassword} secureTextEntry />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput style={styles.input} placeholder="Repeat password" placeholderTextColor="#aaa" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Select Role</Text>
          <View style={styles.roleRow}>
            {roles.map((r) => (
              <TouchableOpacity key={r} style={[styles.roleBtn, role === r && styles.roleBtnActive]} onPress={() => setRole(r)}>
                <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account →</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={() => router.back()}>
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginBold}>Sign In</Text></Text>
        </TouchableOpacity>

        <Text style={styles.footer}>🔐 Protected by Firebase Authentication</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E3A5F' },
  content: { flexGrow: 1 },
  topSection: { alignItems: 'center', paddingTop: 60, paddingBottom: 24 },
  logoCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  logoText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#A0C4FF', marginTop: 4 },
  card: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 28 },
  nameRow: { flexDirection: 'row', marginBottom: 0 },
  inputContainer: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9f9f9' },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, padding: 14, fontSize: 15, color: '#333' },
  roleRow: { flexDirection: 'row', gap: 10 },
  roleBtn: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1.5, borderColor: '#e0e0e0', alignItems: 'center' },
  roleBtnActive: { backgroundColor: '#1E3A5F', borderColor: '#1E3A5F' },
  roleBtnText: { fontSize: 13, fontWeight: '600', color: '#888' },
  roleBtnTextActive: { color: '#fff' },
  button: { backgroundColor: '#1E3A5F', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8, elevation: 4 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginLink: { marginTop: 20, alignItems: 'center' },
  loginText: { fontSize: 14, color: '#888' },
  loginBold: { color: '#1E3A5F', fontWeight: 'bold' },
  footer: { textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 20 },
});