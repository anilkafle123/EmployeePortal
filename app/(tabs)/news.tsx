import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const newsItems = [
  {
    id: '1',
    title: 'Company Town Hall – May 15',
    date: 'May 8, 2026',
    category: 'Event',
    preview: 'All employees are invited to the quarterly town hall meeting with leadership.',
  },
  {
    id: '2',
    title: 'Updated Remote Work Policy',
    date: 'May 6, 2026',
    category: 'HR',
    preview: 'New hybrid work guidelines effective June 1st. Please review the updated policy.',
  },
  {
    id: '3',
    title: 'IT System Maintenance – May 10',
    date: 'May 5, 2026',
    category: 'IT',
    preview: 'Scheduled downtime from 12am–4am. Plan accordingly.',
  },
];

const categoryColors: Record<string, string> = {
  Event: '#4A90D9',
  HR: '#E67E22',
  IT: '#27AE60',
};

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Internal News</Text>
      {newsItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.badge, { backgroundColor: (categoryColors[item.category] ?? '#999') + '20' }]}>
              <Text style={[styles.badgeText, { color: categoryColors[item.category] ?? '#999' }]}>
                {item.category}
              </Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.preview}>{item.preview}</Text>
          <View style={styles.readMore}>
            <Text style={styles.readMoreText}>Read more</Text>
            <Ionicons name="chevron-forward" size={14} color="#1E3A5F" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5FA' },
  content: { padding: 20 },
  pageTitle: { fontSize: 22, fontWeight: '700', color: '#1E3A5F', marginBottom: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  badge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  date: { fontSize: 12, color: '#999' },
  title: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 6 },
  preview: { fontSize: 14, color: '#666', lineHeight: 20 },
  readMore: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 4 },
  readMoreText: { fontSize: 13, color: '#1E3A5F', fontWeight: '600' },
});
