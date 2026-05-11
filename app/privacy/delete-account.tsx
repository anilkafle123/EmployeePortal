import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from '../../firebaseConfig';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirmed) {
      Alert.alert('Error', 'Please check the confirmation box first');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password to confirm');
      return;
    }

    Alert.alert(
      '⚠️ Final Warning',
      'This will permanently delete your account and all your data. This action CANNOT be undone. Are you absolutely sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever', style: 'destructive', onPress: async () => {
            setLoading(true);
            try {
              const user = auth.currentUser;
              if (user && user.email) {
                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);
                await deleteUser(user);
                Alert.alert('Account Deleted', 'Your account has been permanently deleted.');
                router.replace('/');
              }
            } catch (error: any) {
              Alert.alert('Error', 'Incorrect password. Please try again.');
            } finally {
              setLoading(false);
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delete Account</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Warning Section */}
        <View style={styles.warningSection}>
          <View style={styles.warningCircle}>
            <Ionicons name="warning-outline" size={48} color="#E74C3C" />
          </View>
          <Text style={styles.warningTitle}>Delete Your Account</Text>
          <Text style={styles.warningDesc}>This action is permanent and cannot be undone. Please read carefully before proceeding.</Text>
        </View>

        {/* What will be deleted */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What will be deleted:</Text>
          {[
            { icon: 'person-outline', text: 'Your profile and personal information', color: '#E74C3C' },
            { icon: 'calendar-outline', text: 'All leave requests and history', color: '#E74C3C' },
            { icon: 'document-outline', text: 'Your saved documents and preferences', color: '#E74C3C' },
            { icon: 'notifications-outline', text: 'All notifications and settings', color: '#E74C3C' },
            { icon: 'shield-outline', text: 'Your security settings and sessions', color: '#E74C3C' },
          ].map((item, index) => (
            <View key={index} style={styles.deleteItem}>
              <View style={styles.deleteIcon}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={styles.deleteText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Alternatives */}
        <View style={styles.alternativeCard}>
          <Ionicons name="information-circle-outline" size={20} color="#4A90D9" />
          <View style={styles.alternativeContent}>
            <Text style={styles.alternativeTitle}>Before you delete</Text>
            <Text style={styles.alternativeDesc}>Consider updating your profile or contacting HR if you're having issues with your account.</Text>
          </View>
        </View>

        {/* Confirmation */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Confirm Deletion</Text>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setConfirmed(!confirmed)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, confirmed && styles.checkboxActive]}>
              {confirmed && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.checkText}>I understand that deleting my account is permanent and all my data will be lost forever.</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Enter Password to Confirm</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={[styles.deleteBtn, (!confirmed || !password) && styles.deleteBtnDisabled]}
          onPress={handleDelete}
          disabled={loading || !confirmed || !password}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteBtnText}>{loading ? 'Deleting...' : 'Delete My Account'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Cancel — Keep My Account</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#E74C3C', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  warningSection: { alignItems: 'center', marginBottom: 24 },
  warningCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#E74C3C20', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  warningTitle: { fontSize: 22, fontWeight: 'bold', color: '#E74C3C', marginBottom: 8 },
  warningDesc: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 2, marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1E3A5F', marginBottom: 14 },
  deleteItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  deleteIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#E74C3C20', justifyContent: 'center', alignItems: 'center' },
  deleteText: { fontSize: 13, color: '#555', flex: 1 },
  alternativeCard: { backgroundColor: '#EBF4FF', borderRadius: 14, padding: 16, flexDirection: 'row', gap: 12, marginBottom: 16 },
  alternativeContent: { flex: 1 },
  alternativeTitle: { fontSize: 14, fontWeight: '700', color: '#4A90D9', marginBottom: 4 },
  alternativeDesc: { fontSize: 13, color: '#4A90D9', lineHeight: 20 },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 20 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  checkboxActive: { backgroundColor: '#E74C3C', borderColor: '#E74C3C' },
  checkText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9f9f9', gap: 8 },
  input: { flex: 1, padding: 14, fontSize: 15, color: '#333' },
  deleteBtn: { backgroundColor: '#E74C3C', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4, marginBottom: 12 },
  deleteBtnDisabled: { backgroundColor: '#ccc', elevation: 0 },
  deleteBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#fff', borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1.5, borderColor: '#1E3A5F' },
  cancelBtnText: { color: '#1E3A5F', fontSize: 15, fontWeight: '700' },
});