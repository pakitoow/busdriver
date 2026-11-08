import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui';
import { colors, layout, radius, spacing } from '@/constants/theme';

export type IncidentFilter = 'all' | 'open' | 'resolved';

const FILTERS: { value: IncidentFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'open', label: 'En cours' },
  { value: 'resolved', label: 'Résolus' },
];

type IncidentFiltersProps = {
  value: IncidentFilter;
  counts: Record<IncidentFilter, number>;
  onChange: (value: IncidentFilter) => void;
};

export function IncidentFilters({ value, counts, onChange }: IncidentFiltersProps) {
  return (
    <View style={styles.row}>
      {FILTERS.map((f) => {
        const selected = f.value === value;
        return (
          <Pressable
            key={f.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(f.value)}
            style={[styles.chip, selected && styles.chipSelected]}>
            <Text variant="label" color={selected ? 'blanc' : 'marine'}>
              {f.label} ({counts[f.value]})
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1) },
  chip: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing(2.5),
    backgroundColor: colors.blanc,
    borderWidth: 1.5,
    borderColor: colors.bordure,
    borderRadius: radius.full,
  },
  chipSelected: { backgroundColor: colors.marine, borderColor: colors.marine },
});
