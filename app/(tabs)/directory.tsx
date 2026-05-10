import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const employees = [
  { id: '1', name: 'Anil Kafle', role: 'Software Engineer', dept: 'IT', email: 'anil@company.com', phone: '+1 204-555-0101', location: 'Winnipeg, MB', avatar: 'AK', color: '#4A90D9' },
  { id: '2', name: 'Sarah Johnson', role: 'HR Manager', dept: 'HR', email: 'sarah@company.com', phone: '+1 204-555-0102', location: 'Winnipeg, MB', avatar: 'SJ', color: '#E67E22' },
  { id: '3', name: 'Mike Chen', role: 'Product Manager', dept: 'Product', email: 'mike@company.com', phone: '+1 204-555-0103', location: 'Toronto, ON', avatar: 'MC', color: '#27AE60' },
  { id: '4', name: 'Emily Davis', role: 'UI/UX Designer', dept: 'Design', email: 'emily@company.com', phone: '+1 204-555-0104', location: 'Vancouver, BC', avatar: 'ED', color: '#8E44AD' },
  { id: '5', name: 'James Wilson', role: 'DevOps Engineer', dept: 'IT', email: 'james@company.com', phone: '+1 204-555-0105', location: 'Winnipeg, MB', avatar: 'JW', color: '#E74C3C' },
  { id: '6', name: 'Lisa Brown', role: 'Financial Analyst', dept: 'Finance', email: 'lisa@company.com', phone: '+1 204-555-0106', location: 'Calgary, AB', avatar: 'LB', color: '#1E3A5F' },
  { id: '7', name: 'David Lee', role: 'Backend Developer', dept: 'IT', email: 'david@company.com', phone: '+1 204-555-0107', location: 'Winnipeg, MB', avatar: 'DL', color: '#27AE60' },
  { id: '8', name: 'Anna Smith', role: 'Marketing Lead', dept: 'Marketing', email: 'anna@company.com', phone: '+1 204-555-0108', location: 'Ottawa, ON', avatar: 'AS', color: '#E67E22' },
];

const deptColors: Record<string, string> = {
  IT: '#4A90D9',
  HR: '#E67E22',
  Product: '#27AE60',
  Design: '#8E44AD',
  Finance: '#1E3A5F',
  Marketing: '#E74C3C',
};

export default function DirectoryScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<typeof employees[0] | null>(null);

  const departments = ['All', 'IT', 'HR', 'Product', 'Design', 'Finance', 'Marketing'];

  const filtered = employees.filter(emp => {
    const matchDept = filter === 'All' || emp.dept === filter;
    const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or role..."
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

      {/* Department Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterRow}>
        {departments.map(dept => (
          <TouchableOpacity
            key={dept}
            style={[styles.filterBtn, filter === dept && styles.filterBtnActive]}
            onPress={() => setFilter(dept)}
          >
            <Text style={[styles.filterText, filter === dept && styles.filterTextActive]}>{dept}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <Text style={styles.resultCount}>{filtered.length} employee{filtered.length !== 1 ? 's' : ''} found</Text>
        {filtered.map(emp => (
          <TouchableOpacity key={emp.id} style={styles.card} activeOpacity={0.9} onPress={() => setSelected(emp)}>
            <View style={[styles.avatar, { backgroundColor: emp.color + '20' }]}>
              <Text style={[styles.avatarText, { color: emp.color }]}>{emp.avatar}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{emp.name}</Text>
              <Text style={styles.role}>{emp.role}</Text>
              <View style={[styles.deptBadge, { backgroundColor: (deptColors[emp.dept] || '#999') + '20' }]}>
                <Text style={[styles.deptText, { color: deptColors[emp.dept] || '#999' }]}>{emp.dept}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Employee Detail Modal */}
      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Employee Profile</Text>
          </View>
          <ScrollView style={styles.modalContent}>
            {selected && (
              <>
                <View style={styles.profileTop}>
                  <View style={[styles.bigAvatar, { backgroundColor: selected.color + '20' }]}>
                    <Text style={[styles.bigAvatarText, { color: selected.color }]}>{selected.avatar}</Text>
                  </View>
                  <Text style={styles.modalName}>{selected.name}</Text>
                  <Text style={styles.modalRole}>{selected.role}</Text>
                  <View style={[styles.deptBadge, { backgroundColor: (deptColors[selected.dept] || '#999') + '20', alignSelf: 'center' }]}>
                    <Text style={[styles.deptText, { color: deptColors[selected.dept] || '#999' }]}>{selected.dept}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Contact Information</Text>
                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <Ionicons name="mail-outline" size={20} color="#4A90D9" />
                    <Text style={styles.infoText}>{selected.email}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={20} color="#27AE60" />
                    <Text style={styles.infoText}>{selected.phone}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={20} color="#E67E22" />
                    <Text style={styles.infoText}>{selected.location}</Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#4A90D9' }]}>
                    <Ionicons name="mail-outline" size={20} color="#fff" />
                    <Text style={styles.actionText}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#27AE60' }]}>
                    <Ionicons name="call-outline" size={20} color="#fff" />
                    <Text style={styles.actionText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#8E44AD' }]}>
                    <Ionicons name="chatbubble-outline" size={20} color="#fff" />
                    <Text style={styles.actionText}>Message</Text>
                  </TouchableOpacity>
                </View>
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
  filterScroll: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', maxHeight: 56 },
  filterRow: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0' },
  filterBtnActive: { backgroundColor: '#1E3A5F' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#888' },
  filterTextActive: { color: '#fff' },
  list: { padding: 16, gap: 12 },
  resultCount: { fontSize: 13, color: '#999', marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', elevation: 2, gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 16, fontWeight: 'bold' },
  cardContent: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: '#1E3A5F', marginBottom: 2 },
  role: { fontSize: 13, color: '#666', marginBottom: 6 },
  deptBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  deptText: { fontSize: 11, fontWeight: '700' },
  modalContainer: { flex: 1, backgroundColor: '#F0F4F8' },
  modalHeader: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  modalHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContent: { padding: 20 },
  profileTop: { alignItems: 'center', paddingVertical: 20 },
  bigAvatar: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  bigAvatarText: { fontSize: 32, fontWeight: 'bold' },
  modalName: { fontSize: 24, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 4 },
  modalRole: { fontSize: 15, color: '#666', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 12 },
  infoCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, gap: 14, elevation: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { fontSize: 14, color: '#333' },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  actionBtn: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  actionText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});