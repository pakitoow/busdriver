import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, spacing } from '@/constants/theme';

import { Icon, type IconName } from './icon';
import { Text } from './text';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  /** Shows the round back button (pushed screens). */
  showBack?: boolean;
  right?: ReactNode;
};

/** Screen title block: optional back button + 26 px title + grey subtitle. */
export function ScreenHeader({ title, subtitle, showBack, right }: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      {showBack && (
        <RoundIconButton
          icon="chevron-left"
          accessibilityLabel="Retour"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        />
      )}
      <View style={styles.titles}>
        <Text variant="screenTitle">{title}</Text>
        {subtitle && <Text color="texteSecondaire">{subtitle}</Text>}
      </View>
      {right}
    </View>
  );
}

/** White circular icon button (back, notifications, call, week arrows). */
export function RoundIconButton({
  icon,
  onPress,
  accessibilityLabel,
}: {
  icon: IconName;
  onPress?: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.round, pressed && { opacity: 0.7 }]}>
      <Icon name={icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing(2) },
  titles: { flex: 1, gap: spacing(0.25) },
  round: {
    width: layout.minTouchTarget + 4,
    height: layout.minTouchTarget + 4,
    borderRadius: 999,
    backgroundColor: colors.blanc,
    borderWidth: 1,
    borderColor: colors.bordure,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
