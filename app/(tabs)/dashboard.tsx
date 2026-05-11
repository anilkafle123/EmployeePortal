import React, { useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { useRouter, useFocusEffect } from 'expo-router';

const quickLinks = [
  { icon: 'newspaper-outline', label: 'Internal News', color: '#4A90D9', bg: '#EBF4FF', route: '/(tabs)/news' },
  { icon: 'document-text-outline', label: 'HR Documents', color: '#E67E22', bg: '#FEF3E8', route: '/(tabs)/documents' },
  { icon: 'people-outline', label: 'Directory', color: '#27AE60', bg: '#EAFAF1', route: '/(tabs)/directory' },
  { icon: 'calendar-outline', label: 'Leave Requests', color: '#8E44AD', bg: '#F5EEF8', route: '/(tabs)/leave-requests' },
];

const announcements = [
  { title: 'Company Town Hall', date: 'May 15', icon: 'megaphone-outline', color: '#4A90D9', desc: 'All hands meeting at 2PM' },
  { title: 'Updated Remote Work Policy', date: 'May 10', icon: 'document-outline', color: '#27AE60', desc: 'New guidelines effective June 1' },
  { title: 'Benefits Enrollment Deadline', date: 'May 8', icon: 'alert-circle-outline', color: '#E67E22', desc: 'Enroll before May 31' },
];

export default function DashboardScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();
  const user = auth.currentUser;
  const email = user?.email || 'User';
  const fullProfile = user?.displayName || '';
  const namePart = fullProfile.includes('|') ? fullProfile.split('|')[0] : fullProfile || email.split('@')[0];
  const rolePart = fullProfile.includes('|') ? fullProfile.split('|')[1] : 'Employee';
  const displayName = namePart.toUpperCase();
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 17) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  };

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with Image Background */}
      <ImageBackground
        source={require('../../assets/images/DashboardProfile.jpg')}
        style={styles.header}
        imageStyle={{ opacity: 0.25, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.greeting, { marginBottom: 20 }]}>
                {getGreeting()}
              </Text>

              <Text style={styles.name}>{displayName} 👋</Text>

              <Text style={styles.role}>
                Employee Portal  •  {rolePart}
              </Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Leave Days</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Messages</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Quick Access */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/all-features' as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {quickLinks.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => router.push(item.route as any)}
            >
              <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon as any} size={26} color={item.color} />
              </View>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <View style={[styles.cardArrow, { backgroundColor: item.bg }]}>
                <Ionicons name="chevron-forward" size={12} color={item.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Schedule */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <TouchableOpacity onPress={() => router.push('/schedule' as any)}>
            <Text style={styles.seeAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.scheduleCard}
          onPress={() => router.push('/schedule' as any)}
        >
          <View style={styles.scheduleTime}>
            <Text style={styles.scheduleHour}>10:00</Text>
            <Text style={styles.scheduleAmPm}>AM</Text>
          </View>
          <View style={styles.scheduleDivider} />
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTitle}>Team Standup</Text>
            <Text style={styles.scheduleDesc}>Daily sync with IT team</Text>
          </View>
          <View style={[styles.scheduleDot, { backgroundColor: '#4A90D9' }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scheduleCard}
          onPress={() => router.push('/schedule' as any)}
        >
          <View style={styles.scheduleTime}>
            <Text style={styles.scheduleHour}>2:00</Text>
            <Text style={styles.scheduleAmPm}>PM</Text>
          </View>
          <View style={styles.scheduleDivider} />
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTitle}>HR Review Meeting</Text>
            <Text style={styles.scheduleDesc}>Quarterly performance review</Text>
          </View>
          <View style={[styles.scheduleDot, { backgroundColor: '#27AE60' }]} />
        </TouchableOpacity>
      </View>

      {/* Announcements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/news' as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {announcements.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.announcementCard}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/news' as any)}
          >
            <View style={[styles.announcementIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{item.title}</Text>
              <Text style={styles.announcementDesc}>{item.desc}</Text>
              <Text style={styles.announcementDate}>Posted {item.date}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerContent: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  greeting: {
    color: '#A0C4FF',
    fontSize: 13,
    marginTop: -44,
    marginLeft: -1,
  }, name: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 2 },
  role: { color: '#A0C4FF', fontSize: 12, marginTop: 2 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 16, alignItems: 'center' },
  statCard: { flex: 1, alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#A0C4FF', fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1E3A5F' },
  seeAll: { fontSize: 13, color: '#4A90D9', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, width: '47%', elevation: 2 },
  iconBox: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  cardLabel: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 8 },
  cardArrow: { width: 24, height: 24, borderRadius: 8, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' },
  scheduleCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  scheduleTime: { alignItems: 'center', width: 40 },
  scheduleHour: { fontSize: 15, fontWeight: 'bold', color: '#1E3A5F' },
  scheduleAmPm: { fontSize: 10, color: '#999' },
  scheduleDivider: { width: 1, height: 36, backgroundColor: '#eee', marginHorizontal: 14 },
  scheduleInfo: { flex: 1 },
  scheduleTitle: { fontSize: 14, fontWeight: '600', color: '#1E3A5F' },
  scheduleDesc: { fontSize: 12, color: '#999', marginTop: 2 },
  scheduleDot: { width: 10, height: 10, borderRadius: 5 },
  announcementCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  announcementIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  announcementContent: { flex: 1 },
  announcementTitle: { fontSize: 14, fontWeight: '600', color: '#1E3A5F' },
  announcementDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  announcementDate: { fontSize: 11, color: '#999', marginTop: 4 },
});