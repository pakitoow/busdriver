import { StyleSheet, View } from 'react-native';

import { Card, Icon, Pill, Text } from '@/components/ui';
import { colors, fonts, layout, radius, spacing } from '@/constants/theme';
import type { Incident } from '@/types/models';
import { formatShortDay, formatTime } from '@/utils/format';

import { INCIDENT_TYPE_INFO } from './incident-types';

const MONTHS_SHORT = [
  'janv.',
  'févr.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
];

function formatIncidentDate(iso: string): string {
  const d = new Date(iso);
  if (d.toDateString() === new Date().toDateString()) return 'Aujourd’hui';
  return `${formatShortDay(iso)} ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

export function IncidentCard({ incident }: { incident: Incident }) {
  const info = INCIDENT_TYPE_INFO[incident.type];
  const isOpen = incident.status === 'open';

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Icon name={info.icon} />
        </View>
        <View style={styles.titles}>
          <Text variant="figure">{info.label}</Text>
          <Text variant="small" color="texteSecondaire">
            {formatIncidentDate(incident.createdAt)} · {formatTime(incident.createdAt)} · Ligne{' '}
            {incident.line}
          </Text>
        </View>
        <Pill tone={isOpen ? 'warning' : 'success'} label={isOpen ? 'En cours' : 'Résolu'} />
      </View>

      {incident.description && <Text>{incident.description}</Text>}

      {incident.depotReply && (
        <View style={styles.reply}>
          <Text variant="small" color="texteSecondaire" style={styles.replyTitle}>
            Réponse du dépôt
          </Text>
          <Text variant="label">{incident.depotReply}</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing(1.5) },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  titles: { flex: 1 },
  iconBox: {
    width: layout.minTouchTarget + 4,
    height: layout.minTouchTarget + 4,
    borderRadius: radius.sm,
    backgroundColor: colors.fond,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reply: {
    gap: spacing(0.5),
    padding: spacing(1.5),
    borderRadius: radius.sm,
    backgroundColor: colors.fond,
  },
  replyTitle: { fontFamily: fonts.bold },
});
