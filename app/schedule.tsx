import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const events = [
  { id: '1', title: 'Team Standup', time: '9:00 AM', duration: '30 min', location: 'Meeting Room A', type: 'Meeting', color: '#4A90D9', desc: 'Daily sync with the IT team. Review progress, blockers, and priorities for the day. All team members must attend.', organizer: 'Anil Kafle' },
  { id: '2', title: 'HR Review Meeting', time: '10:30 AM', duration: '1 hour', location: 'HR Office', type: 'Review', color: '#27AE60', desc: 'Quarterly performance review with HR. Bring your self-assessment form and goal progress report.', organizer: 'Sarah Johnson' },
  { id: '3', title: 'Product Demo', time: '12:00 PM', duration: '45 min', location: 'Conference Hall', type: 'Demo', color: '#E67E22', desc: 'Live demo of the new employee portal features to stakeholders. Prepare slides and test environment beforehand.', organizer: 'Mike Chen' },
  { id: '4', title: 'Lunch Break', time: '1:00 PM', duration: '1 hour', location: 'Cafeteria', type: 'Break', color: '#8E44AD', desc: 'Team lunch at the company cafeteria. Optional team bonding activity.', organizer: 'Everyone' },
  { id: '5', title: 'Sprint Planning', time: '2:00 PM', duration: '2 hours', location: 'Room B', type: 'Planning', color: '#1E3A5F', desc: 'Plan the upcoming sprint. Review backlog, estimate stories, and assign tasks to team members.', organizer: 'Anil Kafle' },
  { id: '6', title: 'Design Review', time: '4:00 PM', duration: '45 min', location: 'Design Studio', type: 'Review', color: '#8E44AD', desc: 'Review UI/UX designs for the new mobile app features. Provide feedback and approve final designs.', organizer: 'Emily Davis' },
  { id: '7', title: 'Client Call', time: '4:30 PM', duration: '30 min', location: 'Zoom', type: 'Call', color: '#E74C3C', desc: 'Weekly check-in with the client. Discuss project progress, upcoming milestones, and any concerns.', organizer: 'Mike Chen' },
  { id: '8', title: 'Code Review', time: '5:00 PM', duration: '1 hour', location: 'IT Lab', type: 'Review', color: '#27AE60', desc: 'Review pull requests and code submissions from the development team. Focus on code quality and best practices.', organizer: 'James Wilson' },
  { id: '9', title: 'Team Retrospective', time: '5:30 PM', duration: '45 min', location: 'Meeting Room A', type: 'Meeting', color: '#4A90D9', desc: 'End of sprint retrospective. Discuss what went well, what can be improved, and action items for next sprint.', organizer: 'Anil Kafle' },
  { id: '10', title: 'Wellness Session', time: '6:00 PM', duration: '1 hour', location: 'Gym', type: 'Wellness', color: '#E67E22', desc: 'Weekly team wellness session. Yoga and meditation for stress relief and team bonding. Participation is voluntary.', organizer: 'HR Team' },
];

const typeColors: Record<string, string> = {
  Meeting: '#4A90D9',
  Review: '#27AE60',
  Demo: '#E67E22',
  Break: '#8E44AD',
  Planning: '#1E3A5F',
  Call: '#E74C3C',
  Wellness: '#E67E22',
};

export default function ScheduleScreen() {
  const [selected, setSelected] = useState<typeof events[0] | null>(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerDate}>Today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        <Text style={styles.headerCount}>{events.length} events scheduled</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {events.map((event, index) => (
          <TouchableOpacity key={event.id} style={styles.card} activeOpacity={0.9} onPress={() => setSelected(event)}>
            <View style={styles.timeColumn}>
              <Text style={styles.time}>{event.time.split(' ')[0]}</Text>
              <Text style={styles.ampm}>{event.time.split(' ')[1]}</Text>
              {index < events.length - 1 && <View style={[styles.timeline, { backgroundColor: event.color }]} />}
            </View>
            <View style={[styles.cardContent, { borderLeftColor: event.color }]}>
              <View style={styles.cardTop}>
                <View style={[styles.typeBadge, { backgroundColor: event.color + '20' }]}>
                  <Text style={[styles.typeText, { color: event.color }]}>{event.type}</Text>
                </View>
                <Text style={styles.duration}>{event.duration}</Text>
              </View>
              <Text style={styles.title}>{event.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color="#999" />
                <Text style={styles.location}>{event.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Event Detail Modal */}
      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalHeader, { backgroundColor: selected?.color || '#1E3A5F' }]}>
            <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Event Details</Text>
          </View>

          <ScrollView style={styles.modalContent}>
            {selected && (
              <>
                <View style={[styles.eventIconBox, { backgroundColor: selected.color + '20' }]}>
                  <Ionicons name="calendar-outline" size={40} color={selected.color} />
                </View>

                <Text style={styles.modalTitle}>{selected.title}</Text>

                <View style={[styles.typeBadge, { backgroundColor: selected.color + '20', alignSelf: 'center', marginBottom: 20 }]}>
                  <Text style={[styles.typeText, { color: selected.color }]}>{selected.type}</Text>
                </View>

                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoIcon, { backgroundColor: '#4A90D920' }]}>
                      <Ionicons name="time-outline" size={18} color="#4A90D9" />
                    </View>
                    <View>
                      <Text style={styles.infoLabel}>Time</Text>
                      <Text style={styles.infoValue}>{selected.time} • {selected.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.infoDivider} />

                  <View style={styles.infoRow}>
                    <View style={[styles.infoIcon, { backgroundColor: '#27AE6020' }]}>
                      <Ionicons name="location-outline" size={18} color="#27AE60" />
                    </View>
                    <View>
                      <Text style={styles.infoLabel}>Location</Text>
                      <Text style={styles.infoValue}>{selected.location}</Text>
                    </View>
                  </View>

                  <View style={styles.infoDivider} />

                  <View style={styles.infoRow}>
                    <View style={[styles.infoIcon, { backgroundColor: '#E67E2220' }]}>
                      <Ionicons name="person-outline" size={18} color="#E67E22" />
                    </View>
                    <View>
                      <Text style={styles.infoLabel}>Organizer</Text>
                      <Text style={styles.infoValue}>{selected.organizer}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.descTitle}>About this event</Text>
                <Text style={styles.desc}>{selected.desc}</Text>

                <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: selected.color }]}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                  <Text style={styles.acceptText}>Accept Invitation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.declineBtn}>
                  <Ionicons name="close-circle-outline" size={20} color="#E74C3C" />
                  <Text style={styles.declineText}>Decline</Text>
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
  header: { backgroundColor: '#1E3A5F', padding: 20, paddingTop: 20, paddingBottom: 20 },
  headerDate: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerCount: { color: '#A0C4FF', fontSize: 13, marginTop: 2 },
  list: { padding: 16 },
  card: { flexDirection: 'row', marginBottom: 16 },
  timeColumn: { width: 60, alignItems: 'center', paddingTop: 4 },
  time: { fontSize: 14, fontWeight: 'bold', color: '#1E3A5F' },
  ampm: { fontSize: 10, color: '#999' },
  timeline: { width: 2, flex: 1, marginTop: 8, borderRadius: 1 },
  cardContent: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginLeft: 12, borderLeftWidth: 4, elevation: 2 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { fontSize: 11, fontWeight: '700' },
  duration: { fontSize: 12, color: '#999' },
  title: { fontSize: 15, fontWeight: '700', color: '#1E3A5F', marginBottom: 6 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  location: { fontSize: 12, color: '#999' },
  modalContainer: { flex: 1, backgroundColor: '#F0F4F8' },
  modalHeader: { padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  modalHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContent: { padding: 20 },
  eventIconBox: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E3A5F', textAlign: 'center', marginBottom: 8 },
  infoCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, elevation: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  infoLabel: { fontSize: 11, color: '#999', marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  infoDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
  descTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 8 },
  desc: { fontSize: 14, color: '#555', lineHeight: 24, marginBottom: 24 },
  acceptBtn: { borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 4 },
  acceptText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  declineBtn: { backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, borderWidth: 1.5, borderColor: '#E74C3C' },
  declineText: { color: '#E74C3C', fontSize: 16, fontWeight: 'bold' },
});