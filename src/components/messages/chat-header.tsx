import { Linking, StyleSheet, View } from 'react-native';

import { Icon, RoundIconButton, Text } from '@/components/ui';
import { colors, fonts, radius, spacing } from '@/constants/theme';

type ChatHeaderProps = {
  name: string;
  status: string;
  phone: string;
};

export function ChatHeader({ name, status, phone }: ChatHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Icon name="headphones" color={colors.ambre} />
      </View>
      <View style={styles.titles}>
        <Text variant="cardTitle">{name}</Text>
        <View style={styles.status}>
          <View style={styles.dot} />
          <Text variant="small" color="succes" style={styles.statusText}>
            {status}
          </Text>
        </View>
      </View>
      <RoundIconButton
        icon="phone"
        accessibilityLabel="Appeler le dépôt"
        onPress={() => Linking.openURL(`tel:${phone}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing(2) },
  avatar: {
    width: spacing(7),
    height: spacing(7),
    borderRadius: radius.full,
    backgroundColor: colors.marine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: { flex: 1 },
  status: { flexDirection: 'row', alignItems: 'center', gap: spacing(1) },
  dot: {
    width: spacing(1),
    height: spacing(1),
    borderRadius: radius.full,
    backgroundColor: colors.succes,
  },
  statusText: { fontFamily: fonts.bold },
});
