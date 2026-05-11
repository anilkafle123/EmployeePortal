import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const fullProfile = user?.displayName || '';
  const parts = fullProfile.split('|');
  const namePart = parts[0] || user?.email?.split('@')[0] || 'User';
  const rolePart = parts[1] || 'Employee';
  const addressPart = parts[2] || '';
  const initials = namePart.trim().split(' ').map((n: string) => n[0]).join('').toUpperCase(); const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout', style: 'destructive', onPress: async () => {
          await signOut(auth);
          router.replace('/');
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.onlineDot} />
        </View>
        <Text style={styles.name}>{namePart.toUpperCase()}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {addressPart ? <Text style={styles.address}>📍 {addressPart}</Text> : null}
        <View style={styles.roleRow}>
          <View style={styles.roleBadge}>
            <Ionicons name="shield-checkmark-outline" size={11} color="#fff" />
            <Text style={styles.roleText}>{rolePart}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileBtn} onPress={() => router.push('/settings-edit-profile' as any)}>
          <Ionicons name="pencil-outline" size={12} color="#1E3A5F" />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Leaves</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Messages</Text>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuCard}>
          <View style={styles.switchRow}>
            <View style={[styles.menuIcon, { backgroundColor: '#27AE6020' }]}>
              <Ionicons name="notifications-outline" size={20} color="#27AE60" />
            </View>
            <Text style={styles.menuLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ddd', true: '#1E3A5F' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.menuDivider} />
          <View style={styles.switchRow}>
            <View style={[styles.menuIcon, { backgroundColor: '#8E44AD20' }]}>
              <Ionicons name="moon-outline" size={20} color="#8E44AD" />
            </View>
            <Text style={styles.menuLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ddd', true: '#1E3A5F' }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuCard}>
          {[
            { icon: 'lock-closed-outline', label: 'Privacy & Security', color: '#4A90D9', route: '/privacy' },
            { icon: 'help-circle-outline', label: 'Help & Support', color: '#E67E22', route: '/help' },
            { icon: 'information-circle-outline', label: 'About App', color: '#1E3A5F', route: '/about' },
          ].map((item, index, arr) => (
            <View key={index}>
              <TouchableOpacity style={styles.menuRow} activeOpacity={0.7} onPress={() => router.push(item.route as any)}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward-outline" size={16} color="#ccc" />
              </TouchableOpacity>
              {index < arr.length - 1 && <View style={styles.menuDivider} />}
            </View>
          ))}
        </View>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.appInfoCard}>
          <View style={styles.appLogoCircle}>
            <Text style={styles.appLogoText}>EP</Text>
          </View>
          <Text style={styles.appName}>Employee Portal</Text>
          <Text style={styles.appVersion}>Version 1.0.0 • CS5450 Group #3</Text>
        </View>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  profileCard: { backgroundColor: '#1E3A5F', paddingTop: 15, paddingBottom: 15, alignItems: 'center', borderBottomLeftRadius: 36, borderBottomRightRadius: 36 },
  avatarWrapper: { position: 'relative', marginBottom: 8 },
  avatar: { width: 55, height: 55, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#27AE60', borderWidth: 2, borderColor: '#1E3A5F' },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  email: { color: '#A0C4FF', fontSize: 11, marginBottom: 2 },
  address: { color: '#A0C4FF', fontSize: 12, marginTop: 2, marginBottom: 6 },
  roleRow: { flexDirection: 'row', marginBottom: 10 },
  roleBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  roleText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  editProfileBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  editProfileText: { color: '#1E3A5F', fontSize: 11, fontWeight: '700' },
  statsRow: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginTop: 16, borderRadius: 16, padding: 16, elevation: 3, alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#1E3A5F' },
  statLabel: { fontSize: 12, color: '#999', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: '#eee' },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#999', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  menuCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2 },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  switchRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#333' },
  menuDivider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 68 },
  appInfoCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', elevation: 2 },
  appLogoCircle: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#1E3A5F', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  appLogoText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  appName: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 4 },
  appVersion: { fontSize: 12, color: '#999' },
  logoutBtn: { backgroundColor: '#E74C3C', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, elevation: 4 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});