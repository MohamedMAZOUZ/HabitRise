import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../ThemeContext';
import { useHabits } from '../HabitsContext';
import ProgressRing from '../components/ProgressRing';
import HabitCard from '../components/HabitCard';

export default function HomeScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { habits, toggleHabit, completedCount, percentComplete } = useHabits();

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.date, { color: theme.textSecondary }]}>WED, MAY 22</Text>
        <Text style={[styles.greeting, { color: theme.text }]}>Good morning, Sarah</Text>

        <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <ProgressRing percent={percentComplete} />
          <View style={styles.summaryText}>
            <Text style={[styles.almost, { color: theme.text }]}>Almost there!</Text>
            <Text style={[styles.summaryBody, { color: theme.textSecondary }]}>
              You have completed {completedCount} of {habits.length} habits scheduled for today.
            </Text>
          </View>
        </View>

        <View style={styles.headerRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's Habits</Text>
          <Pressable>
            <Text style={[styles.editLink, { color: theme.success }]}>Edit List</Text>
          </Pressable>
        </View>

        {habits.map((h) => (
          <HabitCard
            key={h.id}
            habit={h}
            onToggle={() => toggleHabit(h.id)}
            onPress={() => navigation.navigate('HabitDetail', { habitId: h.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  date: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5, marginBottom: 4 },
  greeting: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  summaryCard: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 20, borderWidth: 1, marginBottom: 28, gap: 16 },
  summaryText: { flex: 1 },
  almost: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  summaryBody: { fontSize: 13, lineHeight: 18 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  editLink: { fontSize: 13, fontWeight: '600' },
});
