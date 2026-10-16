import React, { createContext, useContext, useState, useMemo } from 'react';

const HabitsContext = createContext(null);

const initialHabits = [
  { id: '1', name: 'Drink Water', category: 'Health', streak: 14, done: true, icon: 'water', color: '#3DA9E8' },
  { id: '2', name: 'Read 15 Pages', category: 'Growth', streak: 14, done: true, icon: 'book', color: '#8A6FE8' },
  { id: '3', name: 'Meditate 10 min', category: 'Mind', streak: 14, done: false, icon: 'close-circle', color: '#E8877E' },
  { id: '4', name: 'Exercise', category: 'Fitness', streak: 12, done: false, icon: 'walk', color: '#E8A33D' },
];

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState(initialHabits);
  const userName = 'Sarah Mitchell';
  const userEmail = 'sarah.mitch@wellness.co';

  const toggleHabit = (id) =>
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));

  const addHabit = (habit) =>
    setHabits((prev) => [...prev, { id: String(Date.now()), streak: 0, done: false, ...habit }]);

  const completedCount = habits.filter((h) => h.done).length;
  const percentComplete = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  const value = useMemo(
    () => ({ habits, toggleHabit, addHabit, completedCount, percentComplete, userName, userEmail }),
    [habits, completedCount, percentComplete]
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error('useHabits must be used within HabitsProvider');
  return ctx;
}
