import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../ThemeContext';

export default function HabitCard({ habit, onToggle, onPress }) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={[styles.iconWrap, { backgroundColor: habit.color + '22' }]}>
        <Ionicons name={habit.icon} size={20} color={habit.color} />
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{habit.name}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: theme.textSecondary }]}>{habit.category}</Text>
          <Ionicons name="flame" size={12} color={theme.accentOrange} />
          <Text style={[styles.meta, { color: theme.textSecondary }]}>{habit.streak} days</Text>
        </View>
      </View>
      <Pressable
        onPress={onToggle}
        hitSlop={10}
        style={[
          styles.check,
          {
            backgroundColor: habit.done ? theme.success : 'transparent',
            borderColor: habit.done ? theme.success : theme.border,
          },
        ]}
      >
        {habit.done && <Ionicons name="checkmark" size={16} color="#fff" />}
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 1, marginBottom: 10 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 },
  meta: { fontSize: 12 },
  check: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
});
