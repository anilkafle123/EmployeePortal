import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TwoFactorScreen() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [emailAuth, setEmailAuth] = useState(false);
  const [appAuth, setAppAuth] = useState(false);

  const handleToggle = () => {
    if (!enabled) {
      Alert.alert(
        'Enable Two-Factor Auth',
        'This adds an extra layer of security to your account. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Enable', onPress: () => setEnabled(true) },
        ]
      );
    } else {
      Alert.alert(
        'Disable Two-Factor Auth',
        'Your account will be less secure. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Disable', style: 'destructive', onPress: () => { setEnabled(false); setEmailAuth(false); setAppAuth(false); } },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Two-Factor Auth</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.iconSection}>
          <View style={[styles.iconCircle, { backgroundColor: enabled ? '#27AE6020' : '#f0f0f0' }]}>
            <Ionicons name="shield-outline" size={40} color={enabled ? '#27AE60' : '#999'} />
          </View>
          <Text style={styles.iconTitle}>Two-Factor Authentication</Text>
          <Text style={styles.iconDesc}>Add an extra layer of security to protect your account from unauthorized access.</Text>
        </View>

        {/* Main Toggle */}
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <View style={[styles.toggleIcon, { backgroundColor: enabled ? '#27AE6020' : '#f0f0f0' }]}>
              <Ionicons name="shield-checkmark-outline" size={22} color={enabled ? '#27AE60' : '#999'} />
            </View>
            <View style={styles.toggleContent}>
              <Text style={styles.toggleTitle}>Enable 2FA</Text>
              <Text style={styles.toggleDesc}>{enabled ? '✅ Active and protecting your account' : 'Currently disabled'}</Text>
            </View>
            <Switch
              value={enabled}
              onValueChange={handleToggle}
              trackColor={{ false: '#ddd', true: '#27AE60' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Auth Methods — only shown when enabled */}
        {enabled && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Authentication Methods</Text>

            <View style={styles.toggleRow}>
              <View style={[styles.toggleIcon, { backgroundColor: '#4A90D920' }]}>
                <Ionicons name="mail-outline" size={22} color="#4A90D9" />
              </View>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>Email OTP</Text>
                <Text style={styles.toggleDesc}>Receive a code via email</Text>
              </View>
              <Switch
                value={emailAuth}
                onValueChange={(val) => {
                  setEmailAuth(val);
                  if (val) Alert.alert('Email OTP Enabled ✅', 'You will receive a code at ' + (require('../../firebaseConfig').auth.currentUser?.email || 'your email'));
                }}
                trackColor={{ false: '#ddd', true: '#4A90D9' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={[styles.toggleIcon, { backgroundColor: '#8E44AD20' }]}>
                <Ionicons name="phone-portrait-outline" size={22} color="#8E44AD" />
              </View>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>Authenticator App</Text>
                <Text style={styles.toggleDesc}>Use Google Authenticator or similar</Text>
              </View>
              <Switch
                value={appAuth}
                onValueChange={(val) => {
                  setAppAuth(val);
                  if (val) Alert.alert('Authenticator App Enabled ✅', 'Scan the QR code in your authenticator app to complete setup.');
                }}
                trackColor={{ false: '#ddd', true: '#8E44AD' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color="#4A90D9" />
          <Text style={styles.infoText}>Two-factor authentication makes it harder for attackers to access your account even if they have your password.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  iconSection: { alignItems: 'center', marginBottom: 24 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 6 },
  iconDesc: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 2, marginBottom: 16 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1E3A5F', marginBottom: 14 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  toggleContent: { flex: 1 },
  toggleTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  toggleDesc: { fontSize: 12, color: '#999', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginVertical: 14 },
  infoCard: { backgroundColor: '#EBF4FF', borderRadius: 14, padding: 16, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  infoText: { flex: 1, fontSize: 13, color: '#4A90D9', lineHeight: 20 },
});