import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';

const leaveTypes = ['Annual Leave', 'Sick Leave', 'Maternity/Paternity', 'Emergency', 'Unpaid Leave'];

const initialLeaveHistory = [
  { id: '1', name: 'John Smith', type: 'Annual Leave', from: 'May 20', to: 'May 24', days: 5, status: 'Approved', color: '#27AE60' },
  { id: '2', name: 'Emily Davis', type: 'Sick Leave', from: 'Apr 10', to: 'Apr 11', days: 2, status: 'Approved', color: '#27AE60' },
  { id: '3', name: 'James Wilson', type: 'Emergency', from: 'Mar 5', to: 'Mar 5', days: 1, status: 'Pending', color: '#E67E22' },
  { id: '4', name: 'Lisa Brown', type: 'Annual Leave', from: 'Feb 14', to: 'Feb 16', days: 3, status: 'Pending', color: '#E67E22' },
  { id: '5', name: 'David Lee', type: 'Sick Leave', from: 'May 2', to: 'May 3', days: 2, status: 'Rejected', color: '#E74C3C' },
];

export default function LeaveRequestsScreen() {
  const [showForm, setShowForm] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveHistory, setLeaveHistory] = useState(initialLeaveHistory);

  // Get current user role
  const user = auth.currentUser;
  const fullProfile = user?.displayName || '';
  const rolePart = fullProfile.includes('|') ? fullProfile.split('|')[1] : 'Employee';
  const isHROrAdmin = rolePart === 'HR' || rolePart === 'Admin';

  const handleSubmit = () => {
    if (!fromDate || !toDate || !reason) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success! 🎉', 'Your leave request has been submitted successfully!', [
      { text: 'OK', onPress: () => { setShowForm(false); setFromDate(''); setToDate(''); setReason(''); } }
    ]);
  };

  const handleApprove = (id: string) => {
    Alert.alert('Approve Leave', 'Are you sure you want to approve this request?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Approve', onPress: () => {
        setLeaveHistory(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved', color: '#27AE60' } : l));
        Alert.alert('✅ Approved', 'Leave request has been approved.');
      }}
    ]);
  };

  const handleReject = (id: string) => {
    Alert.alert('Reject Leave', 'Are you sure you want to reject this request?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reject', style: 'destructive', onPress: () => {
        setLeaveHistory(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected', color: '#E74C3C' } : l));
        Alert.alert('❌ Rejected', 'Leave request has been rejected.');
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Balance Cards — visible to all */}
        <View style={styles.balanceSection}>
          <Text style={styles.sectionTitle}>Leave Balance</Text>
          <View style={styles.balanceRow}>
            <View style={[styles.balanceCard, { backgroundColor: '#4A90D9' }]}>
              <Text style={styles.balanceNumber}>12</Text>
              <Text style={styles.balanceLabel}>Annual</Text>
            </View>
            <View style={[styles.balanceCard, { backgroundColor: '#27AE60' }]}>
              <Text style={styles.balanceNumber}>7</Text>
              <Text style={styles.balanceLabel}>Sick</Text>
            </View>
            <View style={[styles.balanceCard, { backgroundColor: '#8E44AD' }]}>
              <Text style={styles.balanceNumber}>3</Text>
              <Text style={styles.balanceLabel}>Emergency</Text>
            </View>
            <View style={[styles.balanceCard, { backgroundColor: '#E67E22' }]}>
              <Text style={styles.balanceNumber}>22</Text>
              <Text style={styles.balanceLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* New Request Button — ONLY visible to Employee */}
        {!isHROrAdmin && (
          <View style={styles.section}>
            <TouchableOpacity style={styles.newRequestBtn} onPress={() => setShowForm(true)}>
              <Ionicons name="add-circle-outline" size={22} color="#fff" />
              <Text style={styles.newRequestText}>New Leave Request</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* HR/Admin Panel — ONLY visible to HR and Admin */}
        {isHROrAdmin && (
          <View style={styles.section}>
            <View style={styles.hrBanner}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
              <Text style={styles.hrBannerText}>
                {rolePart === 'Admin' ? '👑 Admin Panel' : '👥 HR Manager Panel'}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Pending Requests</Text>
            {leaveHistory.filter(l => l.status === 'Pending').length === 0 ? (
              <View style={styles.emptyCard}>
                <Ionicons name="checkmark-circle-outline" size={40} color="#27AE60" />
                <Text style={styles.emptyText}>No pending requests</Text>
              </View>
            ) : (
              leaveHistory.filter(l => l.status === 'Pending').map(leave => (
                <View key={leave.id} style={styles.hrCard}>
                  <View style={styles.hrCardInfo}>
                    <Text style={styles.hrCardName}>{leave.name}</Text>
                    <Text style={styles.hrCardType}>{leave.type}</Text>
                    <Text style={styles.hrCardDates}>{leave.from} – {leave.to} ({leave.days} day{leave.days > 1 ? 's' : ''})</Text>
                  </View>
                  <View style={styles.hrActions}>
                    <TouchableOpacity style={styles.approveBtn} onPress={() => handleApprove(leave.id)}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                      <Text style={styles.approveBtnText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectBtn} onPress={() => handleReject(leave.id)}>
                      <Ionicons name="close" size={16} color="#fff" />
                      <Text style={styles.rejectBtnText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* Leave History — visible to all */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isHROrAdmin ? 'All Leave Records' : 'My Leave History'}
          </Text>
          {leaveHistory.map(leave => (
            <View key={leave.id} style={styles.historyCard}>
              <View style={[styles.statusDot, { backgroundColor: leave.color }]} />
              <View style={styles.historyContent}>
                {isHROrAdmin && <Text style={styles.historyName}>{leave.name}</Text>}
                <Text style={styles.historyType}>{leave.type}</Text>
                <Text style={styles.historyDates}>{leave.from} – {leave.to} ({leave.days} day{leave.days > 1 ? 's' : ''})</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: leave.color + '20' }]}>
                <Text style={[styles.statusText, { color: leave.color }]}>{leave.status}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Leave Request Form Modal — only for Employee */}
      <Modal visible={showForm} animationType="slide" onRequestClose={() => setShowForm(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowForm(false)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>New Leave Request</Text>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Leave Type</Text>
            <View style={styles.leaveTypeGrid}>
              {leaveTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.leaveTypeBtn, leaveType === type && styles.leaveTypeBtnActive]}
                  onPress={() => setLeaveType(type)}
                >
                  <Text style={[styles.leaveTypeBtnText, leaveType === type && styles.leaveTypeBtnTextActive]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>From Date</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={18} color="#999" />
              <TextInput style={styles.input} placeholder="e.g. May 20, 2026" placeholderTextColor="#aaa" value={fromDate} onChangeText={setFromDate} />
            </View>

            <Text style={styles.label}>To Date</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={18} color="#999" />
              <TextInput style={styles.input} placeholder="e.g. May 24, 2026" placeholderTextColor="#aaa" value={toDate} onChangeText={setToDate} />
            </View>

            <Text style={styles.label}>Reason</Text>
            <View style={[styles.inputWrapper, { alignItems: 'flex-start', paddingTop: 12 }]}>
              <Ionicons name="create-outline" size={18} color="#999" style={{ marginTop: 2 }} />
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Briefly explain your reason..."
                placeholderTextColor="#aaa"
                value={reason}
                onChangeText={setReason}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Ionicons name="send-outline" size={20} color="#fff" />
              <Text style={styles.submitText}>Submit Request</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowForm(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  balanceSection: { padding: 20, paddingBottom: 0 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1E3A5F', marginBottom: 12 },
  balanceRow: { flexDirection: 'row', gap: 10 },
  balanceCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center', elevation: 3 },
  balanceNumber: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  balanceLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 },
  section: { padding: 20, paddingTop: 16 },
  newRequestBtn: { backgroundColor: '#1E3A5F', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4 },
  newRequestText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  hrBanner: { backgroundColor: '#1E3A5F', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  hrBannerText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  emptyCard: { backgroundColor: '#fff', borderRadius: 14, padding: 24, alignItems: 'center', gap: 8, elevation: 2 },
  emptyText: { fontSize: 14, color: '#999', fontWeight: '600' },
  hrCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, elevation: 2 },
  hrCardInfo: { marginBottom: 10 },
  hrCardName: { fontSize: 15, fontWeight: '700', color: '#1E3A5F' },
  hrCardType: { fontSize: 13, color: '#666', marginTop: 2 },
  hrCardDates: { fontSize: 12, color: '#999', marginTop: 2 },
  hrActions: { flexDirection: 'row', gap: 10 },
  approveBtn: { flex: 1, backgroundColor: '#27AE60', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  approveBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  rejectBtn: { flex: 1, backgroundColor: '#E74C3C', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  rejectBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  historyCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2, gap: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  historyContent: { flex: 1 },
  historyName: { fontSize: 13, fontWeight: '700', color: '#1E3A5F', marginBottom: 2 },
  historyType: { fontSize: 14, fontWeight: '600', color: '#333' },
  historyDates: { fontSize: 12, color: '#999', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '700' },
  modalContainer: { flex: 1, backgroundColor: '#F0F4F8' },
  modalHeader: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  modalHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContent: { padding: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 8, marginTop: 16 },
  leaveTypeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  leaveTypeBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: '#e0e0e0', backgroundColor: '#fff' },
  leaveTypeBtnActive: { backgroundColor: '#1E3A5F', borderColor: '#1E3A5F' },
  leaveTypeBtnText: { fontSize: 13, fontWeight: '600', color: '#888' },
  leaveTypeBtnTextActive: { color: '#fff' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#fff', gap: 8 },
  input: { flex: 1, padding: 14, fontSize: 15, color: '#333' },
  submitBtn: { backgroundColor: '#1E3A5F', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, elevation: 4 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#fff', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 12, borderWidth: 1.5, borderColor: '#e0e0e0' },
  cancelText: { color: '#888', fontSize: 16, fontWeight: '600' },
});