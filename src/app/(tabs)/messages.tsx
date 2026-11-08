import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import { ChatHeader } from '@/components/messages/chat-header';
import { DaySeparator, MessageBubble } from '@/components/messages/message-bubble';
import { MessageComposer } from '@/components/messages/message-composer';
import { Screen, Text } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useDriver } from '@/providers/session-provider';
import * as api from '@/services/api';
import type { Incident, Message } from '@/types/models';
import { formatLongDate } from '@/utils/format';

type ChatItem = { kind: 'day'; id: string; label: string } | { kind: 'message'; message: Message };

function dayLabel(iso: string): string {
  const isToday = new Date(iso).toDateString() === new Date().toDateString();
  return isToday ? 'Aujourd’hui' : formatLongDate(iso);
}

function buildItems(messages: Message[]): ChatItem[] {
  const items: ChatItem[] = [];
  let lastDay = '';
  for (const message of messages) {
    const day = new Date(message.sentAt).toDateString();
    if (day !== lastDay) {
      items.push({ kind: 'day', id: `day-${day}`, label: dayLabel(message.sentAt) });
      lastDay = day;
    }
    items.push({ kind: 'message', message });
  }
  return items;
}

export default function MessagesScreen() {
  const { depot } = useDriver();
  const [messages, setMessages] = useState<Message[]>();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [failed, setFailed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      Promise.all([api.getMessages(), api.getIncidents()])
        .then(([msgs, incs]) => {
          setMessages(msgs);
          setIncidents(incs);
          setFailed(false);
        })
        .catch(() => setFailed(true));
    }, [])
  );

  async function send(text: string) {
    try {
      const sent = await api.sendMessage(text);
      setMessages((prev) => [...(prev ?? []), sent]);
    } catch {
      Alert.alert('Envoi impossible', 'Le message n’a pas été envoyé. Réessayez.');
    }
  }

  const items = buildItems(messages ?? []).reverse();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen edges={['top']} scroll={false} footer={<MessageComposer onSend={send} />}>
        <ChatHeader name={depot.name} status="Régulation en ligne" phone={depot.phone} />

        {failed && (
          <Text color="danger">Impossible de charger les messages. Réessayez plus tard.</Text>
        )}
        {!messages && !failed && <ActivityIndicator color={colors.marine} />}
        {messages && (
          <FlatList
            inverted
            data={items}
            keyExtractor={(item) => (item.kind === 'day' ? item.id : item.message.id)}
            contentContainerStyle={styles.list}
            style={styles.flex}
            renderItem={({ item }) =>
              item.kind === 'day' ? (
                <DaySeparator label={item.label} />
              ) : (
                <MessageBubble
                  message={item.message}
                  incident={incidents.find((i) => i.id === item.message.incidentId)}
                  onOpenIncident={() => router.push('/profil/signalements')}
                />
              )
            }
          />
        )}
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  list: { gap: spacing(1.5) },
});
