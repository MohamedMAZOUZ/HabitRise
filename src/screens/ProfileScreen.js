import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../ThemeContext';
import { useHabits } from '../HabitsContext';

export default function ProfileScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useAppTheme();
  const { userName, userEmail } = useHabits();
  const [notifications, setNotifications] = useState(true);

  const chevron = <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />;

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatarRing, { borderColor: theme.success }]}>
            <View style={[styles.avatar, { backgroundColor: theme.primaryLight }]}>
              <Ionicons name="person" size={40} color={theme.primary} />
            </View>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>{userName}</Text>
          <Text style={[styles.email, { color: theme.textSecondary }]}>{userEmail}</Text>
        </View>

        <SectionLabel text="PREFERENCES" theme={theme} />
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Row
            icon="notifications-outline"
            label="Push Notifications"
            theme={theme}
            right={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: theme.border, true: theme.success }}
                thumbColor="#fff"
              />
            }
          />
          <Divider theme={theme} />
          <Row
            icon="moon-outline"
            label="Restorative Dark Mode"
            theme={theme}
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.border, true: theme.success }}
                thumbColor="#fff"
              />
            }
          />
        </View>

        <SectionLabel text="AI ASSISTANT" theme={theme} />
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Row
            icon="sparkles-outline"
            label="Ask HabitRise Coach"
            theme={theme}
            onPress={() => navigation.navigate('Assistant')}
            right={chevron}
          />
        </View>

        <SectionLabel text="DATA & STORAGE" theme={theme} />
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Row
            icon="cloud-upload-outline"
            label="Cloud Backup & Sync"
            theme={theme}
            right={<Text style={{ color: theme.textTertiary, fontSize: 11 }}>Synced 5m ago</Text>}
          />
          <Divider theme={theme} />
          <Row icon="download-outline" label="Export Workout Data" theme={theme} right={chevron} />
        </View>

        <SectionLabel text="SUPPORT" theme={theme} />
        <View style={[styles.group, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Row icon="help-circle-outline" label="Help Center & FAQs" theme={theme} right={chevron} />
          <Divider theme={theme} />
          <Row icon="heart-outline" label="Leave Feedback" theme={theme} right={chevron} />
        </View>

        <Pressable style={[styles.logout, { backgroundColor: theme.dangerBg, borderColor: theme.danger }]}>
          <Text style={[styles.logoutText, { color: theme.danger }]}>Log Out</Text>
        </Pressable>

        <Text style={[styles.footer, { color: theme.textTertiary }]}>HabitRise App v2.4.1</Text>
        <Text style={[styles.footer, { color: theme.textTertiary, marginTop: 4 }]}>
          Crafted with Restorative Wellness principles
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionLabel({ text, theme }) {
  return <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>{text}</Text>;
}

function Divider({ theme }) {
  return <View style={{ height: 1, backgroundColor: theme.border, marginLeft: 46 }} />;
}

function Row({ icon, label, right, theme, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color={theme.textSecondary} style={{ width: 26 }} />
        <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
      </View>
      {right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  avatarWrap: { alignItems: 'center', marginBottom: 24, marginTop: 10 },
  avatarRing: { borderWidth: 2, borderRadius: 46, padding: 3, marginBottom: 12 },
  avatar: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: '700' },
  email: { fontSize: 13, marginTop: 2 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, marginTop: 18 },
  group: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 14 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rowLabel: { fontSize: 14, fontWeight: '500' },
  logout: { marginTop: 24, borderRadius: 14, borderWidth: 1, paddingVertical: 14, alignItems: 'center' },
  logoutText: { fontWeight: '700', fontSize: 15 },
  footer: { textAlign: 'center', fontSize: 11, marginTop: 20 },
});
