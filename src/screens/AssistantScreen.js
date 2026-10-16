import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../ThemeContext';

// Placeholder reply. To make this a real AI assistant, replace the body with a
// fetch() call to YOUR OWN backend, which holds the Anthropic API key and
// forwards the request. Never ship an API key inside the app.
async function getAssistantReply(userText) {
  await new Promise((r) => setTimeout(r, 500));
  return `Great question about "${userText}". (Placeholder reply - connect this to your backend + Claude API.)`;
}

export default function AssistantScreen({ navigation }) {
  const { theme } = useAppTheme();
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: "Hi Sarah, I'm your HabitRise Coach. Ask me anything about building better habits." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), role: 'user', text }]);
    setInput('');
    setLoading(true);
    const reply = await getAssistantReply(text);
    setMessages((prev) => [...prev, { id: String(Date.now() + 1), role: 'assistant', text: reply }]);
    setLoading(false);
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>HabitRise Coach</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.role === 'user'
                  ? { alignSelf: 'flex-end', backgroundColor: theme.success }
                  : { alignSelf: 'flex-start', backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 },
              ]}
            >
              <Text style={{ color: item.role === 'user' ? '#fff' : theme.text, fontSize: 14, lineHeight: 20 }}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={[styles.inputRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask your coach..."
            placeholderTextColor={theme.textTertiary}
            style={[styles.input, { color: theme.text }]}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable onPress={send} style={[styles.sendBtn, { backgroundColor: theme.success }]}>
            <Ionicons name={loading ? 'ellipsis-horizontal' : 'arrow-up'} size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  list: { padding: 16 },
  bubble: { maxWidth: '80%', borderRadius: 16, padding: 12, marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, padding: 10, gap: 10 },
  input: { flex: 1, fontSize: 14, paddingHorizontal: 8, paddingVertical: 8 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
