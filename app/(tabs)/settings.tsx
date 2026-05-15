import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const fullProfile = user?.displayName || '';
  const parts = fullProfile.split('|');

  const namePart =
    parts[0] || user?.email?.split('@')[0] || 'User';

  const rolePart = parts[1] || 'Employee';
  const addressPart = parts[2] || '';

  const initials = namePart
    .trim()
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const bg = darkMode ? '#121212' : '#F0F4F8';
  const cardBg = darkMode ? '#1E1E1E' : '#fff';
  const textColor = darkMode ? '#fff' : '#333';
  const subTextColor = darkMode ? '#aaa' : '#999';
  const profileBg = darkMode ? '#0A1628' : '#1E3A5F';

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await signOut(auth);
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bg }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Card */}
      <View
        style={[
          styles.profileCard,
          { backgroundColor: profileBg },
        ]}
      >
        <View style={styles.avatarWrapper}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: darkMode
                  ? 'rgba(255,255,255,0.15)'
                  : '#EAF1FF',
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                { color: darkMode ? '#fff' : '#1E3A5F' },
              ]}
            >
              {initials}
            </Text>
          </View>

          <View style={styles.onlineDot} />
        </View>

        <Text style={styles.name}>
          {namePart.toUpperCase()}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        {addressPart ? (
          <Text style={styles.address}>
            📍 {addressPart}
          </Text>
        ) : null}

        <View
          style={[
            styles.statsRow,
            { backgroundColor: cardBg },
          ]}
        >
          <View
            style={[
              styles.roleBadge,
              {
                backgroundColor: darkMode
                  ? 'rgba(255,255,255,0.15)'
                  : '#EAF1FF',
              },
            ]}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={11}
              color={darkMode ? '#fff' : '#1E3A5F'}
            />

            <Text
              style={[
                styles.roleText,
                {
                  color: darkMode
                    ? '#fff'
                    : '#1E3A5F',
                },
              ]}
            >
              {rolePart} • Employee Portal
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.editProfileBtn,
            {
              backgroundColor: darkMode
                ? '#333'
                : '#fff',
            },
          ]}
          onPress={() =>
            router.push('/settings-edit-profile' as any)
          }
        >
          <Ionicons
            name="pencil-outline"
            size={12}
            color={darkMode ? '#fff' : '#1E3A5F'}
          />

          <Text
            style={[
              styles.editProfileText,
              {
                color: darkMode
                  ? '#fff'
                  : '#1E3A5F',
              },
            ]}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsOuterRow}>
        {[
          {
            number: '12',
            label: 'Tasks',
            color: '#4A90D9',
          },
          {
            number: '3',
            label: 'Leaves',
            color: '#27AE60',
          },
          {
            number: '5',
            label: 'Messages',
            color: '#8E44AD',
          },
        ].map((stat, i) => (
          <View
            key={i}
            style={[
              styles.statBoxCard,
              { backgroundColor: stat.color },
            ]}
          >
            <Text style={styles.statBoxNumber}>
              {stat.number}
            </Text>

            <Text style={styles.statBoxLabel}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: darkMode ? '#aaa' : '#999',
            },
          ]}
        >
          Preferences
        </Text>

        <View
          style={[
            styles.appInfoCard,
            { backgroundColor: cardBg },
          ]}
        >
          <View style={styles.switchRow}>
            <View
              style={[
                styles.menuIcon,
                {
                  backgroundColor: '#27AE6020',
                },
              ]}
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#27AE60"
              />
            </View>

            <Text
              style={[
                styles.menuLabel,
                { color: textColor },
              ]}
            >
              Push Notifications
            </Text>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: '#ddd',
                true: '#1E3A5F',
              }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.menuDivider} />

          <View style={styles.switchRow}>
            <View
              style={[
                styles.menuIcon,
                {
                  backgroundColor: '#8E44AD20',
                },
              ]}
            >
              <Ionicons
                name="moon-outline"
                size={20}
                color="#8E44AD"
              />
            </View>

            <Text
              style={[
                styles.menuLabel,
                { color: textColor },
              ]}
            >
              Dark Mode
            </Text>

            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{
                false: '#ddd',
                true: '#1E3A5F',
              }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: darkMode ? '#aaa' : '#999',
            },
          ]}
        >
          Account
        </Text>

        <View
          style={[
            styles.menuCard,
            { backgroundColor: cardBg },
          ]}
        >
          {[
            {
              icon: 'lock-closed-outline',
              label: 'Privacy & Security',
              color: '#4A90D9',
              route: '/privacy',
            },
            {
              icon: 'help-circle-outline',
              label: 'Help & Support',
              color: '#E67E22',
              route: '/help',
            },
            {
              icon: 'information-circle-outline',
              label: 'About App',
              color: '#1E3A5F',
              route: '/about',
            },
          ].map((item, index, arr) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.menuRow}
                activeOpacity={0.7}
                onPress={() =>
                  router.push(item.route as any)
                }
              >
                <View
                  style={[
                    styles.menuIcon,
                    {
                      backgroundColor:
                        item.color + '20',
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.color}
                  />
                </View>

                <Text
                  style={[
                    styles.menuLabel,
                    { color: textColor },
                  ]}
                >
                  {item.label}
                </Text>

                <Ionicons
                  name="chevron-forward-outline"
                  size={16}
                  color={darkMode ? '#777' : '#ccc'}
                />
              </TouchableOpacity>

              {index < arr.length - 1 && (
                <View style={styles.menuDivider} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <View
          style={[
            styles.appInfoCard,
            { backgroundColor: cardBg },
          ]}
        >
          <View style={styles.appLogoCircle}>
            <Text style={styles.appLogoText}>
              EP
            </Text>
          </View>

          <Text
            style={[
              styles.appName,
              { color: textColor },
            ]}
          >
            Employee Portal
          </Text>

          <Text
            style={[
              styles.appVersion,
              { color: subTextColor },
            ]}
          >
            Version 1.0.0 • CS5450 Group #3
          </Text>
        </View>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.logoutText}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileCard: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },

  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#27AE60',
    borderWidth: 2,
    borderColor: '#1E3A5F',
  },

  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  email: {
    color: '#A0C4FF',
    fontSize: 11,
    marginBottom: 2,
  },

  address: {
    color: '#A0C4FF',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 6,
  },

  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },

  roleText: {
    fontSize: 12,
    fontWeight: '600',
  },

  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  editProfileText: {
    fontSize: 11,
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    alignItems: 'center',
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  menuCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },

  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginLeft: 68,
  },

  appInfoCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },

  appLogoCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  appLogoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  appName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  appVersion: {
    fontSize: 12,
  },

  logoutBtn: {
    backgroundColor: '#E74C3C',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 4,
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  statsOuterRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },

  statBoxCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    elevation: 3,
  },

  statBoxNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  statBoxLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    marginTop: 2,
  },
});