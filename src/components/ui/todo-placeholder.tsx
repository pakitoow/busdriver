import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

import { Text } from './text';

/**
 * Temporary block shown on screens that are not implemented yet.
 * Delete it from a screen as soon as you start building that screen.
 */
export function TodoPlaceholder({ mockupPage, notes }: { mockupPage: number; notes: string[] }) {
  return (
    <View style={styles.box}>
      <Text variant="caption" color="alerte">
        À implémenter · maquette page {mockupPage}
      </Text>
      {notes.map((n) => (
        <Text key={n} variant="small" color="texteSecondaire">
          • {n}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    gap: spacing(1),
    padding: spacing(2),
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.ambre,
    backgroundColor: colors.ambreFond,
  },
});
