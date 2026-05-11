import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function VisibilityScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('Everyone');

  const options = [
    { label: 'Everyone', desc: 'All employees can see your profile', icon: 'globe-outline', color: '#27AE60' },
    { label: 'Only HR & Admin', desc: 'Only HR and Admin can see your profile', icon: 'people-outline', color: '#4A90D9' },
    { label: 'Only Me', desc: 'Your profile is completely private', icon: 'lock-closed-outline', color: '#8E44AD' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Visibility</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.iconSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="eye-off-outline" size={40} color="#8E44AD" />
          </View>
          <Text style={styles.iconTitle}>Who can see you?</Text>
          <Text style={styles.iconDesc}>Control who can view your profile and contact information.</Text>
        </View>

        <View style={styles.card}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionRow, selected === option.label && styles.optionRowActive]}
              onPress={() => setSelected(option.label)}
              activeOpacity={0.8}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
                <Ionicons name={option.icon as any} size={22} color={option.color} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionLabel, selected === option.label && styles.optionLabelActive]}>{option.label}</Text>
                <Text style={styles.optionDesc}>{option.desc}</Text>
              </View>
              <View style={[styles.radio, selected === option.label && styles.radioActive]}>
                {selected === option.label && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => Alert.alert('Saved ✅', `Profile visibility set to "${selected}"`)}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.saveBtnText}>Save Preference</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  iconSection: { alignItems: 'center', marginBottom: 24 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#8E44AD20', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 6 },
  iconDesc: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 2, marginBottom: 16 },
  optionRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderWidth: 2, borderColor: 'transparent' },
  optionRowActive: { borderColor: '#1E3A5F', backgroundColor: '#F0F4FF', borderRadius: 16 },
  optionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  optionContent: { flex: 1 },
  optionLabel: { fontSize: 15, fontWeight: '600', color: '#333' },
  optionLabelActive: { color: '#1E3A5F' },
  optionDesc: { fontSize: 12, color: '#999', marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: '#1E3A5F' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1E3A5F' },
  saveBtn: { backgroundColor: '#8E44AD', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});