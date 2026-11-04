import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

type CardProps = ViewProps & {
  /** "dark" = marine background (e.g. "Service du jour") */
  tone?: 'light' | 'dark';
  padded?: boolean;
};

export function Card({ tone = 'light', padded = true, style, ...rest }: CardProps) {
  return (
    <View
      style={[styles.card, tone === 'dark' && styles.dark, padded && styles.padded, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.blanc,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.bordure,
    overflow: 'hidden',
  },
  dark: { backgroundColor: colors.marine, borderColor: colors.marine },
  padded: { padding: spacing(2.5) },
});
