import { Pressable, StyleSheet, View } from 'react-native';

import { INCIDENT_TYPE_INFO } from '@/components/incidents/incident-types';
import { Icon, Text } from '@/components/ui';
import { colors, fonts, layout, radius, spacing } from '@/constants/theme';
import type { Incident, Message } from '@/types/models';
import { formatTime } from '@/utils/format';

type MessageBubbleProps = {
  message: Message;
  incident?: Incident;
  onOpenIncident: () => void;
};

export function MessageBubble({ message, incident, onOpenIncident }: MessageBubbleProps) {
  const mine = message.author === 'driver';
  const info = incident ? INCIDENT_TYPE_INFO[incident.type] : undefined;

  return (
    <View style={[styles.item, mine ? styles.itemMine : styles.itemTheirs]}>
      {message.incidentId ? (
        <Pressable accessibilityRole="button" onPress={onOpenIncident} style={styles.incident}>
          <View style={styles.incidentIcon}>
            <Icon name={info?.icon ?? 'alert-triangle'} />
          </View>
          <View style={styles.incidentText}>
            <Text variant="small" color="texteSecondaire">
              Signalement envoyé
            </Text>
            <Text variant="label">{info?.label ?? 'Incident'}</Text>
          </View>
          <Icon name="chevron-right" color={colors.texteSecondaire} />
        </Pressable>
      ) : (
        <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}>
          <Text color={mine ? 'blanc' : 'marine'}>{message.text}</Text>
        </View>
      )}
      <Text variant="small" color="texteSecondaire">
        {formatTime(message.sentAt)}
      </Text>
    </View>
  );
}

export function DaySeparator({ label }: { label: string }) {
  return (
    <View style={styles.separator}>
      <Text variant="small" color="texteSecondaire" style={styles.separatorText}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { maxWidth: '85%', gap: spacing(0.5) },
  itemMine: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  itemTheirs: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.5),
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  bubbleMine: { backgroundColor: colors.marine, borderColor: colors.marine },
  bubbleTheirs: { backgroundColor: colors.blanc, borderColor: colors.bordure },
  incident: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
    padding: spacing(1.5),
    backgroundColor: colors.blanc,
    borderWidth: 1.5,
    borderColor: colors.marine,
    borderRadius: radius.md,
  },
  incidentIcon: {
    width: layout.minTouchTarget + 4,
    height: layout.minTouchTarget + 4,
    borderRadius: radius.sm,
    backgroundColor: colors.ambre,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incidentText: { flexShrink: 1 },
  separator: {
    alignSelf: 'center',
    paddingHorizontal: spacing(1.5),
    paddingVertical: spacing(0.5),
    borderRadius: radius.full,
    backgroundColor: colors.bordure,
  },
  separatorText: { fontFamily: fonts.bold },
});
