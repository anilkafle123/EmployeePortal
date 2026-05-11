import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const fullProfile = user?.displayName || '';
  const parts = fullProfile.split('|');
  const namePart = parts[0] || '';
  const rolePart = parts[1] || 'Employee';
  const addressPart = parts[2] || '';

  const [name, setName] = useState(namePart);
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(addressPart);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    setLoading(true);
    try {
      await updateProfile(user!, { displayName: `${name.trim()}|${rolePart}|${address.trim()}` });
      Alert.alert('Success', 'Profile updated!', [
        { text: 'OK', onPress: () => router.push('/(tabs)/settings') }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile');
    }
    setLoading(false);
  };

  // const roles = ['Employee', 'Admin', 'HR' ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/settings')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.substring(0, 2).toUpperCase()}</Text>
          </View>
        </View>

        {/* Name */}
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={18} color="#999" />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Email (read only) */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#999" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Role */}
        {/* <Text style={styles.label}>Role</Text>
        <View style={styles.roleRow}>
          {roles.map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.roleBtn, role === r && styles.roleBtnActive]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Save */}
        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <View style={styles.inputBox}>
          <Ionicons name="location-outline" size={18} color="#999" />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor="#999"
            multiline
          />
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
          <Ionicons name="checkmark-outline" size={20} color="#fff" />
          <Text style={styles.saveText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1E3A5F', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  label: { fontSize: 13, fontWeight: '700', color: '#999', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, gap: 10, marginBottom: 16, elevation: 1 },
  input: { flex: 1, fontSize: 15, color: '#333' },
  // readOnly: { flex: 1, fontSize: 15, color: '#999' },
  roleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  roleBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e0e0e0' },
  roleBtnActive: { backgroundColor: '#1E3A5F' },
  roleBtnText: { fontSize: 13, fontWeight: '600', color: '#666' },
  roleBtnTextActive: { color: '#fff' },
  saveBtn: { backgroundColor: '#27AE60', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 3 },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});