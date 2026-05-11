import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SessionsScreen() {
  const router = useRouter();

  const [sessions, setSessions] = useState([
    { id: '1', device: 'Pixel 7 (Android)', location: 'Winnipeg, CA', time: 'Now • Current device', icon: 'phone-portrait-outline', active: true },
    { id: '2', device: 'Chrome Browser', location: 'Winnipeg, CA', time: '2 hours ago', icon: 'desktop-outline', active: false },
    { id: '3', device: 'iPhone 14', location: 'Toronto, CA', time: 'Yesterday, 9:30 PM', icon: 'phone-portrait-outline', active: false },
    { id: '4', device: 'Firefox Browser', location: 'Vancouver, CA', time: '3 days ago', icon: 'desktop-outline', active: false },
    { id: '5', device: 'Safari Browser', location: 'Calgary, AB', time: '5 days ago', icon: 'desktop-outline', active: false },
    { id: '6', device: 'Samsung Galaxy S23', location: 'Ottawa, ON', time: '1 week ago', icon: 'phone-portrait-outline', active: false },
    { id: '7', device: 'Edge Browser', location: 'Montreal, QC', time: '2 weeks ago', icon: 'desktop-outline', active: false },
    { id: '8', device: 'iPad Pro', location: 'Winnipeg, CA', time: '3 weeks ago', icon: 'tablet-portrait-outline', active: false },
  ]);

  const handleRemove = (id: string, device: string) => {
    Alert.alert(
      'Remove Session',
      `Remove "${device}" from your active sessions?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove', style: 'destructive', onPress: () => {
            setSessions(prev => prev.filter(s => s.id !== id));
            Alert.alert('Removed ✅', `"${device}" has been logged out.`);
          }
        },
      ]
    );
  };

  const handleRemoveAll = () => {
    Alert.alert(
      'Remove All Sessions',
      'This will log you out from all other devices. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove All', style: 'destructive', onPress: () => {
            setSessions(prev => prev.filter(s => s.active));
            Alert.alert('Done ✅', 'All other sessions have been removed.');
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
        <Text style={styles.headerTitle}>Active Sessions</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.iconSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="phone-portrait-outline" size={40} color="#E67E22" />
          </View>
          <Text style={styles.iconTitle}>Logged In Devices</Text>
          <Text style={styles.iconDesc}>These devices are currently logged into your account. Remove any you don't recognize.</Text>
        </View>

        {/* Current Session */}
        <Text style={styles.sectionLabel}>Current Session</Text>
        {sessions.filter(s => s.active).map(session => (
          <View key={session.id} style={[styles.sessionCard, styles.activeCard]}>
            <View style={[styles.sessionIcon, { backgroundColor: '#27AE6020' }]}>
              <Ionicons name={session.icon as any} size={24} color="#27AE60" />
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionDevice}>{session.device}</Text>
              <Text style={styles.sessionLocation}>{session.location}</Text>
              <Text style={styles.sessionTime}>{session.time}</Text>
            </View>
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active</Text>
            </View>
          </View>
        ))}

        {/* Other Sessions */}
        {sessions.filter(s => !s.active).length > 0 && (
          <>
            <View style={styles.otherHeader}>
              <Text style={styles.sectionLabel}>Other Sessions</Text>
              <TouchableOpacity onPress={handleRemoveAll}>
                <Text style={styles.removeAllText}>Remove All</Text>
              </TouchableOpacity>
            </View>

            {sessions.filter(s => !s.active).map(session => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={[styles.sessionIcon, { backgroundColor: '#f0f0f0' }]}>
                  <Ionicons name={session.icon as any} size={24} color="#999" />
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionDevice}>{session.device}</Text>
                  <Text style={styles.sessionLocation}>{session.location}</Text>
                  <Text style={styles.sessionTime}>{session.time}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemove(session.id, session.device)}
                >
                  <Ionicons name="close-circle-outline" size={14} color="#E74C3C" />
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {sessions.filter(s => !s.active).length === 0 && (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-circle-outline" size={40} color="#27AE60" />
            <Text style={styles.emptyText}>No other active sessions</Text>
          </View>
        )}

        {/* Info */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color="#4A90D9" />
          <Text style={styles.infoText}>If you see a session you don't recognize, remove it immediately and change your password.</Text>
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
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E67E2220', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 6 },
  iconDesc: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#999', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  sessionCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 2 },
  activeCard: { borderWidth: 1.5, borderColor: '#27AE60' },
  sessionIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  sessionInfo: { flex: 1 },
  sessionDevice: { fontSize: 14, fontWeight: '700', color: '#1E3A5F' },
  sessionLocation: { fontSize: 12, color: '#666', marginTop: 2 },
  sessionTime: { fontSize: 11, color: '#999', marginTop: 2 },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#27AE6020', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#27AE60' },
  activeText: { fontSize: 11, fontWeight: '700', color: '#27AE60' },
  otherHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 8 },
  removeAllText: { fontSize: 13, fontWeight: '700', color: '#E74C3C' },
  removeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#E74C3C20', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  removeBtnText: { fontSize: 12, fontWeight: '700', color: '#E74C3C' },
  emptyCard: { backgroundColor: '#fff', borderRadius: 14, padding: 24, alignItems: 'center', gap: 8, elevation: 2, marginBottom: 16 },
  emptyText: { fontSize: 14, color: '#999', fontWeight: '600' },
  infoCard: { backgroundColor: '#EBF4FF', borderRadius: 14, padding: 16, flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginTop: 8 },
  infoText: { flex: 1, fontSize: 13, color: '#4A90D9', lineHeight: 20 },
});