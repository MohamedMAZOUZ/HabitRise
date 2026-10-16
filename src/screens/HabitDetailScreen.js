import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../ThemeContext';
import { useHabits } from '../HabitsContext';

const NOTES = [
  { date: 'May 21', text: 'Deep breath session in the park. Felt extremely refreshed afterwards.' },
  { date: 'May 20', text: 'Quick 10m breathing before sleep. Slept like a baby.' },
];

const DAY_STATUS = { 3: 'missed', 10: 'missed', 12: 'partial', 20: 'partial' };
const DONE_DAYS = [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16, 17, 18, 19, 21];

export default function HabitDetailScreen({ navigation, route }) {
  const { theme } = useAppTheme();
  const { habits } = useHabits();
  const habit = habits.find((h) => h.id === route?.params?.habitId) || habits[0];

  const dayStyle = (day) => {
    if (DAY_STATUS[day] === 'missed') return { bg: theme.dangerBg, fg: theme.danger, border: theme.danger };
    if (DAY_STATUS[day] === 'partial') return { bg: 'transparent', fg: theme.accentOrange, border: theme.accentOrange };
    if (DONE_DAYS.includes(day)) return { bg: theme.success, fg: '#fff', border: theme.success };
    return { bg: theme.inputBg, fg: theme.textTertiary, border: theme.border };
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{habit.name}</Text>
        <Text style={[styles.editLink, { color: theme.success }]}>Edit</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <StatBox label="CURRENT STREAK" value={`${habit.streak} days`} theme={theme} />
          <StatBox label="BEST STREAK" value="15 days" theme={theme} />
          <StatBox label="TOTAL COMPLETED" value="45 days" theme={theme} />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Last 30 Days</Text>
        <View style={styles.grid}>
          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
            const s = dayStyle(day);
            return (
              <View key={day} style={[styles.dayCell, { backgroundColor: s.bg, borderColor: s.border }]}>
                <Text style={[styles.dayText, { color: s.fg }]}>{day}</Text>
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>Activity Notes</Text>
        {NOTES.map((n) => (
          <View key={n.date} style={[styles.noteCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.noteIcon, { backgroundColor: theme.primaryLight }]}>
              <Ionicons name="chatbubble-ellipses-outline" size={16} color={theme.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.noteDate, { color: theme.textSecondary }]}>{n.date}</Text>
              <Text style={[styles.noteText, { color: theme.text }]}>{n.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, theme }) {
  return (
    <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  editLink: { fontSize: 14, fontWeight: '600' },
  scroll: { padding: 20, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statBox: { flex: 1, borderRadius: 14, borderWidth: 1, padding: 10, alignItems: 'center' },
  statLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.3, marginBottom: 6, textAlign: 'center' },
  statValue: { fontSize: 15, fontWeight: '700' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 8 },
  dayCell: { width: '12.5%', aspectRatio: 1, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  dayText: { fontSize: 12, fontWeight: '600' },
  noteCard: { flexDirection: 'row', borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10, gap: 12 },
  noteIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  noteDate: { fontSize: 11, fontWeight: '600', marginBottom: 4 },
  noteText: { fontSize: 13, lineHeight: 18 },
});
