import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const employees = [
  { id: '1', name: 'Alice Johnson', role: 'Product Manager', dept: 'Product', email: 'alice@company.com' },
  { id: '2', name: 'Bob Smith', role: 'Lead Developer', dept: 'IT', email: 'bob@company.com' },
  { id: '3', name: 'Carol White', role: 'HR Specialist', dept: 'HR', email: 'carol@company.com' },
  { id: '4', name: 'David Lee', role: 'DevOps Engineer', dept: 'IT', email: 'david@company.com' },
  { id: '5', name: 'Emma Davis', role: 'Financial Analyst', dept: 'Finance', email: 'emma@company.com' },
];

const avatarColors = ['#4A90D9', '#E67E22', '#27AE60', '#8E44AD', '#E74C3C'];

export default function DirectoryScreen() {
  const [search, setSearch] = useState('');

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Employee Directory</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or department..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {filtered.map((emp, index) => (
        <TouchableOpacity key={emp.id} style={styles.card}>
          <View style={[styles.avatar, { backgroundColor: avatarColors[index % avatarColors.length] }]}>
            <Text style={styles.avatarText}>{emp.name.charAt(0)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{emp.name}</Text>
            <Text style={styles.role}>{emp.role}</Text>
            <Text style={styles.email}>{emp.email}</Text>
          </View>
          <View style={styles.deptBadge}>
            <Text style={styles.deptText}>{emp.dept}</Text>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: '#222' },
  role: { fontSize: 13, color: '#555', marginTop: 2 },
  email: { fontSize: 12, color: '#999', marginTop: 2 },
  deptBadge: {
    backgroundColor: '#1E3A5F15',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deptText: { fontSize: 11, fontWeight: '700', color: '#1E3A5F' },
});
