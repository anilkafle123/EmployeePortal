import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const quickLinks = [
  { icon: 'newspaper-outline', label: 'Internal News', color: '#4A90D9', bg: '#EBF4FF' },
  { icon: 'document-text-outline', label: 'HR Documents', color: '#E67E22', bg: '#FEF3E8' },
  { icon: 'people-outline', label: 'Directory', color: '#27AE60', bg: '#EAFAF1' },
  { icon: 'calendar-outline', label: 'Leave Requests', color: '#8E44AD', bg: '#F5EEF8' },
];

const announcements = [
  { title: 'Company Town Hall', date: 'May 15', icon: 'megaphone-outline', color: '#4A90D9' },
  { title: 'Updated Remote Work Policy', date: 'May 10', icon: 'document-outline', color: '#27AE60' },
  { title: 'Benefits Enrollment Deadline', date: 'May 8', icon: 'alert-circle-outline', color: '#E67E22' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const email = user?.email || 'User';
  const displayName = email.split('@')[0];
  const initials = displayName.substring(0, 2).toUpperCase();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Good Morning 🌤️</Text>
          <Text style={styles.headerName}>{displayName}</Text>
          <Text style={styles.headerRole}>Employee Portal Member</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#4A90D9' }]}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Pending Tasks</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#27AE60' }]}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Leave Days</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#8E44AD' }]}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>New Messages</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.grid}>
          {quickLinks.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
              <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon as any} size={28} color={item.color} />
              </View>
              <Text style={styles.cardLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {announcements.map((item, i) => (
          <TouchableOpacity key={i} style={styles.announcementCard} activeOpacity={0.8}>
            <View style={[styles.announcementIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{item.title}</Text>
              <Text style={styles.announcementDate}>Posted {item.date}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', padding: 24, paddingTop: 60, paddingBottom: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerGreeting: { color: '#A0C4FF', fontSize: 14 },
  headerName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 2 },
  headerRole: { color: '#A0C4FF', fontSize: 13, marginTop: 2 },
  headerRight: { alignItems: 'center', gap: 8 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: 6 },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: -20, marginBottom: 8 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center', elevation: 5 },
  statNumber: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2, textAlign: 'center' },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E3A5F', marginBottom: 12 },
  seeAll: { fontSize: 13, color: '#4A90D9', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, width: '47%', alignItems: 'center', elevation: 3 },
  iconBox: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  cardLabel: { fontSize: 13, fontWeight: '600', color: '#333', textAlign: 'center' },
  announcementCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  announcementIcon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  announcementContent: { flex: 1 },
  announcementTitle: { fontSize: 14, fontWeight: '600', color: '#1E3A5F' },
  announcementDate: { fontSize: 12, color: '#999', marginTop: 2 },
});