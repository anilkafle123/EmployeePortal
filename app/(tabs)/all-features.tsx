import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const features = [
  { icon: 'newspaper-outline', label: 'Internal News', desc: 'Latest company news and updates', color: '#4A90D9', bg: '#EBF4FF', route: '/(tabs)/news' },
  { icon: 'document-text-outline', label: 'HR Documents', desc: 'Policies, forms and guidelines', color: '#E67E22', bg: '#FEF3E8', route: '/(tabs)/documents' },
  { icon: 'people-outline', label: 'Employee Directory', desc: 'Find and contact colleagues', color: '#27AE60', bg: '#EAFAF1', route: '/(tabs)/directory' },
  { icon: 'calendar-outline', label: 'Leave Requests', desc: 'Apply and track your leaves', color: '#8E44AD', bg: '#F5EEF8', route: '/(tabs)/leave-requests' },
  { icon: 'settings-outline', label: 'Settings', desc: 'Manage your account settings', color: '#1E3A5F', bg: '#E8EDF5', route: '/(tabs)/settings' },
];

export default function AllFeaturesScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Features</Text>
        <Text style={styles.headerSubtitle}>Everything you need in one place</Text>
      </View>

      <View style={styles.list}>
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(item.route as any)}
          >
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', padding: 24, paddingTop: 50, paddingBottom: 30, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { color: '#A0C4FF', fontSize: 14, marginTop: 4 },
  list: { padding: 20, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', elevation: 2, gap: 14 },
  iconBox: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 2 },
  cardDesc: { fontSize: 13, color: '#888' },
});