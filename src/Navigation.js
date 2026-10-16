import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';

import { useAppTheme } from './ThemeContext';
import HomeScreen from './screens/HomeScreen';
import NewHabitScreen from './screens/NewHabitScreen';
import HabitDetailScreen from './screens/HabitDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import AssistantScreen from './screens/AssistantScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="HabitDetail" component={HabitDetailScreen} />
      <HomeStack.Screen name="NewHabit" component={NewHabitScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="Assistant" component={AssistantScreen} />
    </ProfileStack.Navigator>
  );
}

const HistoryTab = () => (
  <PlaceholderScreen icon="time-outline" title="History" subtitle="Your past habit activity will show up here." />
);
const AnalyzeTab = () => (
  <PlaceholderScreen icon="bar-chart-outline" title="Analyze" subtitle="Insights and trends coming soon." />
);
const EmptyScreen = () => <View />;

function AddTabButton({ navigation }) {
  const { theme } = useAppTheme();
  return (
    <Pressable
      onPress={() => navigation.navigate('HomeTab', { screen: 'NewHabit' })}
      style={[styles.fab, { backgroundColor: theme.success }]}
    >
      <Ionicons name="add" size={28} color="#fff" />
    </Pressable>
  );
}

const ICONS = { HomeTab: 'home', History: 'time', Analyze: 'stats-chart', ProfileTab: 'person' };

export default function Navigation() {
  const { theme, isDark } = useAppTheme();
  const base = isDark ? DarkTheme : DefaultTheme;

  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: theme.bg,
      card: theme.navBg,
      border: theme.border,
      text: theme.text,
      primary: theme.success,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        // Android hardware back button: step back through visited tabs, then exit.
        backBehavior="history"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.navBg, borderTopColor: theme.border },
          tabBarActiveTintColor: theme.success,
          tabBarInactiveTintColor: theme.textTertiary,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={ICONS[route.name] || 'ellipse'} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="History" component={HistoryTab} />
        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          options={({ navigation }) => ({
            tabBarButton: () => <AddTabButton navigation={navigation} />,
          })}
        />
        <Tab.Screen name="Analyze" component={AnalyzeTab} />
        <Tab.Screen name="ProfileTab" component={ProfileStackScreen} options={{ title: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fab: {
    top: -14,
    alignSelf: 'center',
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
