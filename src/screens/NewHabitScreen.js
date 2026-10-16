import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../ThemeContext';
import { useHabits } from '../HabitsContext';

const ICONS = ['close-circle-outline', 'git-branch-outline', 'book-outline'];
const COLORS = ['#1B4D3E', '#E8A33D', '#E8877E'];
const FREQUENCIES = ['Daily', 'Weekly', 'Custom'];

export default function NewHabitScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { addHabit } = useHabits();

  const [name, setName] = useState('');
  const [category] = useState('Health & Growth');
  const [icon, setIcon] = useState(0);
  const [color, setColor] = useState(0);
  const [frequency, setFrequency] = useState('Daily');
  const [target, setTarget] = useState('3 times / week');
  const [duration, setDuration] = useState('15 minutes');

  const handleCreate = () => {
    if (!name.trim()) return;
    addHabit({
      name: name.trim(),
      category: category.split(' & ')[0],
      icon: 'checkmark-circle',
      color: COLORS[color],
    });
    setName('');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Habit</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.label, { color: theme.textSecondary }]}>HABIT NAME</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g., Read 15 Pages"
            placeholderTextColor={theme.textTertiary}
            style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
          />

          <Text style={[styles.label, { color: theme.textSecondary, marginTop: 20 }]}>CATEGORY/TAG</Text>
          <View style={[styles.selectRow, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
            <Text style={{ color: theme.text, fontSize: 15 }}>{category}</Text>
            <Ionicons name="chevron-down" size={18} color={theme.textSecondary} />
          </View>

          <View style={styles.iconColorRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>ICON</Text>
              <View style={styles.pillRow}>
                {ICONS.map((ic, i) => (
                  <Pressable
                    key={ic}
                    onPress={() => setIcon(i)}
                    style={[
                      styles.iconPill,
                      { backgroundColor: icon === i ? theme.primary : theme.inputBg, borderColor: theme.border },
                    ]}
                  >
                    <Ionicons name={ic} size={18} color={icon === i ? '#fff' : theme.textSecondary} />
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>COLOR</Text>
              <View style={styles.pillRow}>
                {COLORS.map((c, i) => (
                  <Pressable
                    key={c}
                    onPress={() => setColor(i)}
                    style={[
                      styles.colorDot,
                      { backgroundColor: c, borderWidth: color === i ? 2 : 0, borderColor: theme.text },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>

          <Text style={[styles.label, { color: theme.textSecondary, marginTop: 20 }]}>FREQUENCY</Text>
          <View style={styles.freqRow}>
            {FREQUENCIES.map((f) => (
              <Pressable
                key={f}
                onPress={() => setFrequency(f)}
                style={[
                  styles.freqBtn,
                  { backgroundColor: frequency === f ? theme.success : theme.inputBg, borderColor: theme.border },
                ]}
              >
                <Text style={{ color: frequency === f ? '#fff' : theme.text, fontWeight: '600' }}>{f}</Text>
              </Pressable>
            ))}
          </View>

          <View style={[styles.goalCard, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
            <View style={styles.goalHeader}>
              <View style={styles.goalTitleRow}>
                <Ionicons name="flag-outline" size={16} color={theme.accentOrange} />
                <Text style={[styles.goalTitle, { color: theme.text }]}>Flexible Goal</Text>
              </View>
              <Ionicons name="chevron-up" size={18} color={theme.textSecondary} />
            </View>
            <View style={styles.goalRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.goalLabel, { color: theme.textSecondary }]}>Target</Text>
                <View style={[styles.goalInput, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <TextInput value={target} onChangeText={setTarget} style={{ color: theme.text, fontSize: 14 }} />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.goalLabel, { color: theme.textSecondary }]}>Duration</Text>
                <View style={[styles.goalInput, { backgroundColor: theme.card, borderColor: theme.border }]}>
                  <TextInput value={duration} onChangeText={setDuration} style={{ color: theme.text, fontSize: 14 }} />
                </View>
              </View>
            </View>
          </View>

          <Pressable onPress={handleCreate} style={[styles.createBtn, { backgroundColor: theme.success }]}>
            <Text style={styles.createBtnText}>Create Habit</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scroll: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  input: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 14, fontSize: 15 },
  selectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 14 },
  iconColorRow: { flexDirection: 'row', gap: 16, marginTop: 20 },
  pillRow: { flexDirection: 'row', gap: 10 },
  iconPill: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  colorDot: { width: 28, height: 28, borderRadius: 14, marginTop: 8 },
  freqRow: { flexDirection: 'row', gap: 8 },
  freqBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  goalCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 20 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  goalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  goalTitle: { fontSize: 14, fontWeight: '700' },
  goalRow: { flexDirection: 'row', gap: 12 },
  goalLabel: { fontSize: 11, fontWeight: '600', marginBottom: 6 },
  goalInput: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10 },
  createBtn: { marginTop: 28, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  createBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
