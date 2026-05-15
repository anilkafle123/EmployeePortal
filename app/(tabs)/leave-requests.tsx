import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';

const leaveTypes = [
  'Annual Leave',
  'Sick Leave',
  'Maternity/Paternity',
  'Emergency',
  'Unpaid Leave',
];

const initialLeaveHistory = [
  {
    id: '1',
    name: 'John Smith',
    type: 'Annual Leave',
    from: 'May 20, 2026',
    to: 'May 24, 2026',
    days: 5,
    status: 'Approved',
    color: '#27AE60',
  },
  {
    id: '2',
    name: 'Emily Davis',
    type: 'Sick Leave',
    from: 'Apr 10, 2026',
    to: 'Apr 11, 2026',
    days: 2,
    status: 'Approved',
    color: '#27AE60',
  },
  {
    id: '3',
    name: 'James Wilson',
    type: 'Emergency',
    from: 'Mar 5, 2026',
    to: 'Mar 5, 2026',
    days: 1,
    status: 'Pending',
    color: '#E67E22',
  },
];

export default function LeaveRequestsScreen() {
  const [showForm, setShowForm] = useState(false);

  const [leaveType, setLeaveType] =
    useState('Annual Leave');

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const [leaveHistory, setLeaveHistory] = useState(
    initialLeaveHistory
  );

  const user = auth.currentUser;

  const fullProfile = user?.displayName || '';

  const rolePart = fullProfile.includes('|')
    ? fullProfile.split('|')[1]
    : 'Employee';

  const isHROrAdmin =
    rolePart === 'HR' || rolePart === 'Admin';

  const handleSubmit = () => {
    if (!fromDate || !toDate || !reason) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const userName =
      fullProfile.split('|')[0] ||
      user?.email?.split('@')[0] ||
      'Employee';

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const diffTime =
      end.getTime() - start.getTime();

    const totalDays =
      Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      ) + 1;

    const newLeave = {
      id: Date.now().toString(),
      name: userName,
      type: leaveType,
      from: fromDate,
      to: toDate,
      days: totalDays > 0 ? totalDays : 1,
      status: 'Pending',
      color: '#E67E22',
    };

    setLeaveHistory(prev => [newLeave, ...prev]);

    Alert.alert(
      'Success! 🎉',
      'Your leave request has been submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowForm(false);
            setFromDate('');
            setToDate('');
            setReason('');
            setLeaveType('Annual Leave');
          },
        },
      ]
    );
  };

  const handleApprove = (id: string) => {
    setLeaveHistory(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'Approved',
              color: '#27AE60',
            }
          : item
      )
    );

    Alert.alert(
      'Approved',
      'Leave request approved successfully.'
    );
  };

  const handleReject = (id: string) => {
    setLeaveHistory(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'Rejected',
              color: '#E74C3C',
            }
          : item
      )
    );

    Alert.alert(
      'Rejected',
      'Leave request rejected.'
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Leave Balance */}
        <View style={styles.balanceSection}>
          <Text style={styles.sectionTitle}>
            Leave Balance
          </Text>

          <View style={styles.balanceRow}>
            <View
              style={[
                styles.balanceCard,
                { backgroundColor: '#4A90D9' },
              ]}
            >
              <Text style={styles.balanceNumber}>
                12
              </Text>

              <Text style={styles.balanceLabel}>
                Annual
              </Text>
            </View>

            <View
              style={[
                styles.balanceCard,
                { backgroundColor: '#27AE60' },
              ]}
            >
              <Text style={styles.balanceNumber}>
                7
              </Text>

              <Text style={styles.balanceLabel}>
                Sick
              </Text>
            </View>

            <View
              style={[
                styles.balanceCard,
                { backgroundColor: '#8E44AD' },
              ]}
            >
              <Text style={styles.balanceNumber}>
                3
              </Text>

              <Text style={styles.balanceLabel}>
                Emergency
              </Text>
            </View>
          </View>
        </View>

        {/* Employee Button */}
        {!isHROrAdmin && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.newRequestBtn}
              onPress={() => setShowForm(true)}
            >
              <Ionicons
                name="add-circle-outline"
                size={22}
                color="#fff"
              />

              <Text style={styles.newRequestText}>
                New Leave Request
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* HR/Admin */}
        {isHROrAdmin && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pending Requests
            </Text>

            {leaveHistory
              .filter(
                item => item.status === 'Pending'
              )
              .map(item => (
                <View
                  key={item.id}
                  style={styles.hrCard}
                >
                  <View>
                    <Text style={styles.hrCardName}>
                      {item.name}
                    </Text>

                    <Text style={styles.hrCardType}>
                      {item.type}
                    </Text>

                    <Text
                      style={styles.hrCardDates}
                    >
                      {item.from} - {item.to}
                    </Text>
                  </View>

                  <View style={styles.hrActions}>
                    <TouchableOpacity
                      style={styles.approveBtn}
                      onPress={() =>
                        handleApprove(item.id)
                      }
                    >
                      <Text
                        style={
                          styles.approveBtnText
                        }
                      >
                        Approve
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() =>
                        handleReject(item.id)
                      }
                    >
                      <Text
                        style={
                          styles.rejectBtnText
                        }
                      >
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        )}

        {/* History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isHROrAdmin
              ? 'All Leave Records'
              : 'My Leave History'}
          </Text>

          {leaveHistory.map(item => (
            <View
              key={item.id}
              style={styles.historyCard}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      item.color,
                  },
                ]}
              />

              <View style={styles.historyContent}>
                {isHROrAdmin && (
                  <Text
                    style={styles.historyName}
                  >
                    {item.name}
                  </Text>
                )}

                <Text style={styles.historyType}>
                  {item.type}
                </Text>

                <Text
                  style={styles.historyDates}
                >
                  {item.from} - {item.to} (
                  {item.days} day
                  {item.days > 1 ? 's' : ''})
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      item.color + '20',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: item.color },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={showForm}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() =>
                setShowForm(false)
              }
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.modalHeaderTitle}>
              New Leave Request
            </Text>
          </View>

          <ScrollView
            style={styles.modalContent}
          >
            <Text style={styles.label}>
              Leave Type
            </Text>

            <View style={styles.leaveTypeGrid}>
              {leaveTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.leaveTypeBtn,
                    leaveType === type &&
                      styles.leaveTypeBtnActive,
                  ]}
                  onPress={() =>
                    setLeaveType(type)
                  }
                >
                  <Text
                    style={[
                      styles.leaveTypeBtnText,
                      leaveType === type &&
                        styles.leaveTypeBtnTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>
              From Date
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="May 20, 2026"
                value={fromDate}
                onChangeText={setFromDate}
              />
            </View>

            <Text style={styles.label}>
              To Date
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="May 24, 2026"
                value={toDate}
                onChangeText={setToDate}
              />
            </View>

            <Text style={styles.label}>
              Reason
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  { height: 100 },
                ]}
                placeholder="Enter reason"
                multiline
                value={reason}
                onChangeText={setReason}
              />
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>
                Submit Request
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },

  balanceSection: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 12,
  },

  balanceRow: {
    flexDirection: 'row',
    gap: 10,
  },

  balanceCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },

  balanceNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  balanceLabel: {
    color: '#fff',
    fontSize: 11,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  newRequestBtn: {
    backgroundColor: '#1E3A5F',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  newRequestText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  hrCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  hrCardName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A5F',
  },

  hrCardType: {
    color: '#666',
    marginTop: 4,
  },

  hrCardDates: {
    color: '#999',
    marginTop: 4,
  },

  hrActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },

  approveBtn: {
    flex: 1,
    backgroundColor: '#27AE60',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  rejectBtn: {
    flex: 1,
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  approveBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  rejectBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  historyContent: {
    flex: 1,
  },

  historyName: {
    fontWeight: '700',
    color: '#1E3A5F',
  },

  historyType: {
    fontWeight: '600',
    color: '#333',
  },

  historyDates: {
    color: '#999',
    marginTop: 4,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    fontWeight: '700',
    fontSize: 12,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },

  modalHeader: {
    backgroundColor: '#1E3A5F',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  modalHeaderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalContent: {
    padding: 20,
  },

  label: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },

  leaveTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  leaveTypeBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  leaveTypeBtnActive: {
    backgroundColor: '#1E3A5F',
  },

  leaveTypeBtnText: {
    color: '#666',
  },

  leaveTypeBtnTextActive: {
    color: '#fff',
  },

  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
  },

  input: {
    padding: 14,
    fontSize: 15,
  },

  submitBtn: {
    backgroundColor: '#1E3A5F',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});