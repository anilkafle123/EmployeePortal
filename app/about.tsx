import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
  const router = useRouter();
  const features = [
    { icon: 'shield-checkmark-outline', label: 'Firebase Authentication', color: '#4A90D9' },
    { icon: 'newspaper-outline', label: 'Internal News Feed', color: '#27AE60' },
    { icon: 'document-text-outline', label: 'HR Document Management', color: '#E67E22' },
    { icon: 'people-outline', label: 'Employee Directory', color: '#8E44AD' },
    { icon: 'calendar-outline', label: 'Leave Management', color: '#E74C3C' },
    { icon: 'search-outline', label: 'Powerful Search', color: '#1E3A5F' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About App</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoCard}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>EP</Text>
          </View>
          <Text style={styles.appName}>Employee Portal</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CS5450 • Group #3</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.descCard}>
          <Text style={styles.desc}>Employee Portal is a comprehensive mobile application built for internal company use. It provides employees with easy access to company news, HR documents, colleague directories, and leave management — all in one place.</Text>
        </View>

        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.menuCard}>
          {features.map((item, index) => (
            <View key={index}>
              <View style={styles.featureRow}>
                <View style={[styles.featureIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.featureLabel}>{item.label}</Text>
                <Ionicons name="checkmark-circle" size={18} color="#27AE60" />
              </View>
              {index < features.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Built With</Text>
        <View style={styles.techRow}>
          {['React Native', 'Expo', 'Firebase', 'TypeScript'].map((tech, i) => (
            <View key={i} style={styles.techBadge}>
              <Text style={styles.techText}>{tech}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>© 2026 Employee Portal • CS5450 Group #3{'\n'}All rights reserved.</Text>
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
  logoCard: { backgroundColor: '#1E3A5F', borderRadius: 24, padding: 30, alignItems: 'center', marginBottom: 20 },
  logoCircle: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  logoText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  appName: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  version: { color: '#A0C4FF', fontSize: 14, marginBottom: 12 },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 12, marginTop: 4 },
  descCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, elevation: 2 },
  desc: { fontSize: 14, color: '#555', lineHeight: 24 },
  menuCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2, marginBottom: 20 },
  featureRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  featureIcon: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  featureLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 62 },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  techBadge: { backgroundColor: '#1E3A5F', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  techText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  footer: { textAlign: 'center', color: '#aaa', fontSize: 12, lineHeight: 20 },
});