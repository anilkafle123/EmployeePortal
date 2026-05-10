import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const documents = [
  {
    id: '1',
    title: 'Employee Handbook 2026',
    category: 'Policy',
    date: 'Jan 1, 2026',
    size: '2.4 MB',
    icon: 'book-outline',
    color: '#4A90D9',
    description: 'The complete employee handbook covering all company policies, procedures, code of conduct, benefits, and expectations for all employees. This document is mandatory reading for all new hires and should be reviewed annually.',
    pages: '45 pages',
  },
  {
    id: '2',
    title: 'Leave Application Form',
    category: 'Forms',
    date: 'Mar 15, 2026',
    size: '156 KB',
    icon: 'calendar-outline',
    color: '#27AE60',
    description: 'Official form for applying for annual leave, sick leave, maternity/paternity leave, or any other type of leave. Submit completed form to your direct manager at least 5 business days in advance.',
    pages: '2 pages',
  },
  {
    id: '3',
    title: 'Health Insurance Policy',
    category: 'Benefits',
    date: 'Feb 1, 2026',
    size: '1.8 MB',
    icon: 'medical-outline',
    color: '#E67E22',
    description: 'Comprehensive health insurance policy document detailing coverage, claims process, network hospitals, dental and vision benefits, and how to add dependents to your plan.',
    pages: '32 pages',
  },
  {
    id: '4',
    title: 'Performance Review Template',
    category: 'Forms',
    date: 'Apr 1, 2026',
    size: '234 KB',
    icon: 'star-outline',
    color: '#8E44AD',
    description: 'Standard performance review template used for quarterly and annual evaluations. Includes sections for goal setting, achievement rating, manager feedback, and employee self-assessment.',
    pages: '6 pages',
  },
  {
    id: '5',
    title: 'Remote Work Agreement',
    category: 'Policy',
    date: 'May 1, 2026',
    size: '445 KB',
    icon: 'home-outline',
    color: '#1E3A5F',
    description: 'Official remote work agreement outlining the terms and conditions for working from home, including equipment policy, security requirements, availability expectations, and productivity metrics.',
    pages: '8 pages',
  },
  {
    id: '6',
    title: 'Code of Conduct',
    category: 'Policy',
    date: 'Jan 1, 2026',
    size: '890 KB',
    icon: 'shield-checkmark-outline',
    color: '#E74C3C',
    description: 'The company code of conduct defines the ethical standards and professional behavior expected from all employees. Covers workplace conduct, conflict of interest, confidentiality, and disciplinary procedures.',
    pages: '15 pages',
  },
  {
    id: '7',
    title: 'Payroll & Benefits Guide',
    category: 'Benefits',
    date: 'Jan 15, 2026',
    size: '1.2 MB',
    icon: 'cash-outline',
    color: '#27AE60',
    description: 'Complete guide to understanding your payslip, payroll schedule, tax deductions, retirement contributions, and all employee benefits including bonuses, allowances, and reimbursements.',
    pages: '20 pages',
  },
  {
    id: '8',
    title: 'IT Security Policy',
    category: 'Policy',
    date: 'Mar 1, 2026',
    size: '567 KB',
    icon: 'lock-closed-outline',
    color: '#4A90D9',
    description: 'IT security guidelines covering password policies, data protection, acceptable use of company devices, cybersecurity protocols, and procedures for reporting security incidents.',
    pages: '12 pages',
  },
];

const categoryColors: Record<string, string> = {
  Policy: '#4A90D9',
  Forms: '#27AE60',
  Benefits: '#E67E22',
};

export default function DocumentsScreen() {
  const [selected, setSelected] = useState<typeof documents[0] | null>(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Policy', 'Forms', 'Benefits'];

  const filtered = documents.filter(doc => {
    const matchCategory = filter === 'All' || doc.category === filter;
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search documents..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

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
        <Text style={styles.resultCount}>{filtered.length} document{filtered.length !== 1 ? 's' : ''} found</Text>
        {filtered.map(doc => (
          <TouchableOpacity key={doc.id} style={styles.card} activeOpacity={0.9} onPress={() => setSelected(doc)}>
            <View style={[styles.iconBox, { backgroundColor: doc.color + '20' }]}>
              <Ionicons name={doc.icon as any} size={24} color={doc.color} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: categoryColors[doc.category] + '20' }]}>
                  <Text style={[styles.badgeText, { color: categoryColors[doc.category] }]}>{doc.category}</Text>
                </View>
                <Text style={styles.size}>{doc.size}</Text>
              </View>
              <Text style={styles.title}>{doc.title}</Text>
              <Text style={styles.date}>Updated {doc.date}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Document Detail Modal */}
      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Document Details</Text>
          </View>

          <ScrollView style={styles.modalContent}>
            {selected && (
              <>
                <View style={[styles.modalIconBox, { backgroundColor: selected.color + '20' }]}>
                  <Ionicons name={selected.icon as any} size={48} color={selected.color} />
                </View>
                <Text style={styles.modalTitle}>{selected.title}</Text>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="folder-outline" size={16} color="#999" />
                    <Text style={styles.infoText}>{selected.category}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="document-outline" size={16} color="#999" />
                    <Text style={styles.infoText}>{selected.pages}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="save-outline" size={16} color="#999" />
                    <Text style={styles.infoText}>{selected.size}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.descTitle}>About this document</Text>
                <Text style={styles.description}>{selected.description}</Text>

                <View style={styles.divider} />

                <Text style={styles.descTitle}>Last Updated</Text>
                <Text style={styles.infoText}>📅 {selected.date}</Text>

                <TouchableOpacity style={styles.downloadBtn}>
                  <Ionicons name="download-outline" size={20} color="#fff" />
                  <Text style={styles.downloadText}>Download Document</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareBtn}>
                  <Ionicons name="share-outline" size={20} color="#1E3A5F" />
                  <Text style={styles.shareText}>Share Document</Text>
                </TouchableOpacity>
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
  searchContainer: { backgroundColor: '#fff', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterRow: { flexDirection: 'row', padding: 12, gap: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0' },
  filterBtnActive: { backgroundColor: '#1E3A5F' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#888' },
  filterTextActive: { color: '#fff' },
  list: { padding: 16, gap: 12 },
  resultCount: { fontSize: 13, color: '#999', marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', elevation: 2, gap: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  size: { fontSize: 11, color: '#999' },
  title: { fontSize: 14, fontWeight: '700', color: '#1E3A5F', marginBottom: 2 },
  date: { fontSize: 12, color: '#999' },
  modalContainer: { flex: 1, backgroundColor: '#F0F4F8' },
  modalHeader: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  modalHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContent: { padding: 20 },
  modalIconBox: { width: 80, height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 16, marginTop: 8 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E3A5F', textAlign: 'center', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 13, color: '#666' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
  descTitle: { fontSize: 15, fontWeight: '700', color: '#1E3A5F', marginBottom: 8 },
  description: { fontSize: 14, color: '#555', lineHeight: 24 },
  downloadBtn: { backgroundColor: '#1E3A5F', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, elevation: 4 },
  downloadText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  shareBtn: { backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, borderWidth: 1.5, borderColor: '#1E3A5F' },
  shareText: { color: '#1E3A5F', fontSize: 16, fontWeight: 'bold' },
});