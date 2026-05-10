import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const faqs = [
  { q: 'How do I apply for leave?', a: 'Go to the Leave Requests section from the Dashboard. Click "New Leave Request", fill in the details and submit.' },
  { q: 'How do I reset my password?', a: 'On the login screen, tap "Forgot Password?" and enter your email. You will receive a reset link.' },
  { q: 'Where can I find HR documents?', a: 'Go to the Docs tab at the bottom or use Quick Access on the Dashboard to find all HR documents.' },
  { q: 'How do I contact a colleague?', a: 'Go to the People tab, search for the employee and tap their name to see contact options.' },
  { q: 'How do I update my profile?', a: 'Go to Settings and tap "Edit Profile" to update your name, role and other details.' },
];

export default function HelpScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconBox}>
          <Ionicons name="help-buoy-outline" size={48} color="#E67E22" />
        </View>
        <Text style={styles.pageTitle}>How can we help?</Text>
        <Text style={styles.pageSubtitle}>Find answers to common questions below.</Text>

        <Text style={styles.sectionTitle}>FAQ</Text>
        {faqs.map((faq, index) => (
          <TouchableOpacity key={index} style={styles.faqCard} onPress={() => setExpanded(expanded === index ? null : index)} activeOpacity={0.8}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
              <Ionicons name={expanded === index ? 'chevron-up' : 'chevron-down'} size={18} color="#1E3A5F" />
            </View>
            {expanded === index && <Text style={styles.faqAnswer}>{faq.a}</Text>}
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactCard}>
          {[
            { icon: 'mail-outline', label: 'Email Support', value: 'support@employeeportal.com', color: '#4A90D9' },
            { icon: 'call-outline', label: 'Phone Support', value: '+1 204-555-0100', color: '#27AE60' },
            { icon: 'chatbubble-outline', label: 'Live Chat', value: 'Available 9AM – 5PM', color: '#8E44AD' },
          ].map((item, i, arr) => (
            <View key={i}>
              <View style={styles.contactRow}>
                <View style={[styles.contactIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View>
                  <Text style={styles.contactLabel}>{item.label}</Text>
                  <Text style={styles.contactValue}>{item.value}</Text>
                </View>
              </View>
              {i < arr.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  iconBox: { width: 90, height: 90, borderRadius: 24, backgroundColor: '#FEF3E8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 16, marginTop: 8 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E3A5F', textAlign: 'center', marginBottom: 8 },
  pageSubtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 12, marginTop: 8 },
  faqCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, elevation: 2 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { fontSize: 14, fontWeight: '600', color: '#1E3A5F', flex: 1, marginRight: 8 },
  faqAnswer: { fontSize: 13, color: '#666', marginTop: 10, lineHeight: 22 },
  contactCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2 },
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  contactIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  contactLabel: { fontSize: 13, color: '#999' },
  contactValue: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 72 },
});