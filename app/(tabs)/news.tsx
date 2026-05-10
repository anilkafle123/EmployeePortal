import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const newsItems = [
  {
    id: '1',
    title: 'Company Town Hall – May 15',
    date: 'May 8, 2026',
    category: 'Event',
    preview: 'All employees are invited to the quarterly town hall meeting with leadership.',
    full: 'All employees are invited to the quarterly town hall meeting with leadership. The meeting will be held on May 15, 2026 at 2:00 PM in the Main Conference Hall. Topics include Q1 performance review, upcoming projects, new company policies, and open Q&A with the CEO and executive team. Attendance is mandatory for all full-time employees. Remote employees can join via Zoom. Please confirm your attendance by May 12.',
  },
  {
    id: '2',
    title: 'Updated Remote Work Policy',
    date: 'May 6, 2026',
    category: 'HR',
    preview: 'New hybrid work guidelines effective June 1st. Please review the updated policy.',
    full: 'Effective June 1, 2026, the company will implement a new hybrid work policy. Employees are required to be in the office a minimum of 3 days per week (Tuesday, Wednesday, Thursday). Mondays and Fridays will remain flexible remote days. All remote work must be done from a secure location. Employees must be available during core hours (10 AM – 3 PM). Please review the full policy document on the HR portal and sign the acknowledgment form by May 25.',
  },
  {
    id: '3',
    title: 'IT System Maintenance – May 10',
    date: 'May 5, 2026',
    category: 'IT',
    preview: 'Scheduled downtime from 12am–4am. Plan accordingly.',
    full: 'The IT department will be performing scheduled maintenance on all company systems on May 10, 2026 from 12:00 AM to 4:00 AM. During this time, email, VPN, internal portals, and cloud services will be unavailable. Please save all your work before midnight on May 9. If you have any urgent issues, contact the IT emergency helpline at ext. 911. We apologize for any inconvenience and appreciate your cooperation.',
  },
  {
    id: '4',
    title: 'New Employee Wellness Program',
    date: 'May 3, 2026',
    category: 'HR',
    preview: 'Company launches new mental health and wellness initiatives for all staff.',
    full: 'We are excited to announce the launch of our Employee Wellness Program starting June 1, 2026. The program includes free access to mental health counseling (up to 10 sessions per year), weekly yoga and meditation classes, a $500 annual wellness reimbursement for gym memberships or wellness apps, and monthly wellness challenges with prizes. All full-time and part-time employees are eligible. Enroll through the HR portal before May 31 to receive your welcome package.',
  },
  {
    id: '5',
    title: 'Q1 2026 Performance Results',
    date: 'April 30, 2026',
    category: 'Event',
    preview: 'Company exceeds Q1 targets by 18%. Bonuses to be distributed in May.',
    full: 'We are thrilled to announce that the company exceeded its Q1 2026 targets by 18%! This outstanding performance is a testament to the hard work and dedication of every team member. As a result, performance bonuses will be distributed on May 20, 2026. Bonus amounts will be based on individual performance ratings and tenure. Department managers will communicate individual bonus details by May 15. Thank you for your continued commitment to excellence!',
  },
];

const categoryColors: Record<string, string> = {
  Event: '#4A90D9',
  HR: '#E67E22',
  IT: '#27AE60',
};

export default function NewsScreen() {
  const [selected, setSelected] = useState<typeof newsItems[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Event', 'HR', 'IT'];
  const filtered = filter === 'All' ? newsItems : newsItems.filter(n => n.category === filter);

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, filter === cat && styles.filterBtnActive]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {filtered.map(item => (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9} onPress={() => setSelected(item)}>
            <View style={styles.cardHeader}>
              <View style={[styles.badge, { backgroundColor: categoryColors[item.category] + '20' }]}>
                <Text style={[styles.badgeText, { color: categoryColors[item.category] }]}>{item.category}</Text>
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.preview}>{item.preview}</Text>
            <TouchableOpacity style={styles.readMore} onPress={() => setSelected(item)}>
              <Text style={styles.readMoreText}>Read more</Text>
              <Ionicons name="chevron-forward" size={14} color="#4A90D9" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Full News Modal */}
      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Full Article</Text>
          </View>
          <ScrollView style={styles.modalContent}>
            {selected && (
              <>
                <View style={[styles.badge, { backgroundColor: categoryColors[selected.category] + '20', alignSelf: 'flex-start', marginBottom: 12 }]}>
                  <Text style={[styles.badgeText, { color: categoryColors[selected.category] }]}>{selected.category}</Text>
                </View>
                <Text style={styles.modalTitle}>{selected.title}</Text>
                <Text style={styles.modalDate}>📅 {selected.date}</Text>
                <View style={styles.divider} />
                <Text style={styles.modalBody}>{selected.full}</Text>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  filterRow: { flexDirection: 'row', padding: 16, gap: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0' },
  filterBtnActive: { backgroundColor: '#1E3A5F' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#888' },
  filterTextActive: { color: '#fff' },
  list: { padding: 16, gap: 14 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  date: { fontSize: 12, color: '#999' },
  title: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 6 },
  preview: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 10 },
  readMore: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  readMoreText: { fontSize: 13, fontWeight: '600', color: '#4A90D9' },
  modalContainer: { flex: 1, backgroundColor: '#F0F4F8' },
  modalHeader: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  modalHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 8 },
  modalDate: { fontSize: 13, color: '#999', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#eee', marginBottom: 16 },
  modalBody: { fontSize: 15, color: '#333', lineHeight: 26 },
});