import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, Text, type IconName } from '@/components/ui';
import { colors, layout, radius, spacing } from '@/constants/theme';

type TypeTileProps = {
  label: string;
  icon: IconName;
  selected: boolean;
  onPress: () => void;
};

export function TypeTile({ label, icon, selected, onPress }: TypeTileProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.tile, selected && styles.tileSelected]}>
      <View style={[styles.iconBox, selected && styles.iconBoxSelected]}>
        <Icon name={icon} size={20} />
      </View>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    minHeight: layout.minTouchTarget + spacing(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
    padding: spacing(1.5),
    backgroundColor: colors.blanc,
    borderWidth: 1.5,
    borderColor: colors.bordure,
    borderRadius: radius.md,
  },
  tileSelected: { backgroundColor: colors.ambreFond, borderColor: colors.marine },
  iconBox: {
    width: layout.minTouchTarget + 4,
    height: layout.minTouchTarget + 4,
    borderRadius: radius.sm,
    backgroundColor: colors.fond,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxSelected: { backgroundColor: colors.ambre },
  label: { flex: 1 },
});
