import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const documents = [
  { id: '1', name: 'Employee Handbook 2026', type: 'PDF', size: '2.4 MB', category: 'HR' },
  { id: '2', name: 'Benefits Enrollment Guide', type: 'PDF', size: '1.1 MB', category: 'HR' },
  { id: '3', name: 'IT Security Policy', type: 'PDF', size: '0.8 MB', category: 'IT' },
  { id: '4', name: 'Expense Claim Form', type: 'DOCX', size: '0.3 MB', category: 'Finance' },
  { id: '5', name: 'Onboarding Checklist', type: 'PDF', size: '0.5 MB', category: 'HR' },
];

const typeColors: Record<string, string> = {
  PDF: '#E74C3C',
  DOCX: '#2980B9',
};

export default function DocumentsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>HR Documents</Text>
      {documents.map((doc) => (
        <TouchableOpacity key={doc.id} style={styles.row}>
          <View style={[styles.typeBox, { backgroundColor: (typeColors[doc.type] ?? '#999') + '15' }]}>
            <Text style={[styles.typeText, { color: typeColors[doc.type] ?? '#999' }]}>{doc.type}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.docName}>{doc.name}</Text>
            <Text style={styles.meta}>{doc.category} · {doc.size}</Text>
          </View>
          <Ionicons name="download-outline" size={22} color="#1E3A5F" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5FA' },
  content: { padding: 20 },
  pageTitle: { fontSize: 22, fontWeight: '700', color: '#1E3A5F', marginBottom: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    gap: 12,
  },
  typeBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: { fontSize: 11, fontWeight: '800' },
  info: { flex: 1 },
  docName: { fontSize: 15, fontWeight: '600', color: '#222' },
  meta: { fontSize: 12, color: '#999', marginTop: 3 },
});
