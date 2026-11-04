import { StyleSheet, View } from 'react-native';

import { colors, fonts, radius, spacing, type ColorName } from '@/constants/theme';

import { Text } from './text';

type PillTone = 'success' | 'warning' | 'danger' | 'amber' | 'marine' | 'neutral';

const PILL_TONES: Record<PillTone, { bg: ColorName; fg: ColorName }> = {
  success: { bg: 'succesFond', fg: 'succes' }, // "À l'heure", "Terminé", "Résolu"
  warning: { bg: 'alerteFond', fg: 'alerte' }, // "Retard 4 min", "En cours"
  danger: { bg: 'dangerFond', fg: 'danger' }, // "Annulé"
  amber: { bg: 'ambre', fg: 'marine' }, // "Dans 3 min"
  marine: { bg: 'marine', fg: 'blanc' }, // "Bus n° 214"
  neutral: { bg: 'fond', fg: 'marine' },
};

/** Rounded status pill: <Pill tone="success" label="À l'heure" /> */
export function Pill({ label, tone = 'neutral' }: { label: string; tone?: PillTone }) {
  const t = PILL_TONES[tone];
  return (
    <View style={[styles.pill, { backgroundColor: colors[t.bg] }]}>
      <Text variant="small" color={t.fg} style={styles.pillText}>
        {label}
      </Text>
    </View>
  );
}

/** Square line-number badge ("7"). size "lg" is used in the "Service du jour" card. */
export function LineBadge({
  line,
  size = 'md',
  tone = 'light',
}: {
  line: string;
  size?: 'md' | 'lg';
  tone?: 'light' | 'solid';
}) {
  const dim = size === 'lg' ? 64 : 48;
  return (
    <View
      style={[
        styles.line,
        {
          width: dim,
          height: dim,
          backgroundColor: tone === 'solid' ? colors.ambre : colors.ambreFond,
        },
      ]}>
      <Text variant={size === 'lg' ? 'screenTitle' : 'cardTitle'}>{line}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing(1.5),
    paddingVertical: spacing(0.5),
    borderRadius: radius.full,
  },
  pillText: { fontFamily: fonts.bold },
  line: { borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
});
