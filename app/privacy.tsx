import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const router = useRouter();
  const items = [
    { icon: 'lock-closed-outline', title: 'Password', desc: 'Change your account password', color: '#4A90D9' },
    { icon: 'eye-off-outline', title: 'Profile Visibility', desc: 'Control who can see your profile', color: '#8E44AD' },
    { icon: 'shield-outline', title: 'Two-Factor Auth', desc: 'Add extra layer of security', color: '#27AE60' },
    { icon: 'phone-portrait-outline', title: 'Active Sessions', desc: 'Manage logged in devices', color: '#E67E22' },
    { icon: 'trash-outline', title: 'Delete Account', desc: 'Permanently delete your account', color: '#E74C3C' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconBox}>
          <Ionicons name="shield-checkmark-outline" size={48} color="#4A90D9" />
        </View>
        <Text style={styles.pageTitle}>Your Security</Text>
        <Text style={styles.pageSubtitle}>Manage your privacy settings and keep your account secure.</Text>
        <View style={styles.menuCard}>
          {items.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDesc}>{item.desc}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={16} color="#ccc" />
              </TouchableOpacity>
              {index < items.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  iconBox: { width: 90, height: 90, borderRadius: 24, backgroundColor: '#EBF4FF', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 16, marginTop: 8 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E3A5F', textAlign: 'center', marginBottom: 8 },
  pageSubtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  menuCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2 },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  menuIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuContent: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  menuDesc: { fontSize: 12, color: '#999', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 72 },
});