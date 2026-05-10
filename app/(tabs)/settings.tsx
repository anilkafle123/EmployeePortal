import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const fullProfile = user?.displayName || '';
  const namePart = fullProfile.includes('|') ? fullProfile.split('|')[0] : fullProfile || user?.email?.split('@')[0] || 'User';
  const rolePart = fullProfile.includes('|') ? fullProfile.split('|')[1] : 'Employee';
  const initials = namePart.substring(0, 2).toUpperCase();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => {
        await signOut(auth);
        router.replace('/');
      }}
    ]);
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', color: '#4A90D9' },
    { icon: 'notifications-outline', label: 'Notifications', color: '#27AE60' },
    { icon: 'lock-closed-outline', label: 'Privacy & Security', color: '#8E44AD' },
    { icon: 'help-circle-outline', label: 'Help & Support', color: '#E67E22' },
    { icon: 'information-circle-outline', label: 'About App', color: '#1E3A5F' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{namePart.toUpperCase()}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{rolePart}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.8}>
            <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward-outline" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Employee Portal v1.0.0 • CS5450 Group #3</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  profileCard: { backgroundColor: '#1E3A5F', padding: 32, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingTop: 60 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  name: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  email: { color: '#A0C4FF', fontSize: 13, marginBottom: 12 },
  roleBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  roleText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1E3A5F', marginBottom: 12 },
  menuItem: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
  logoutBtn: { backgroundColor: '#E74C3C', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  version: { textAlign: 'center', color: '#aaa', fontSize: 12, marginTop: 24 },
});