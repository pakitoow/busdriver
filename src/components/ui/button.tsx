import { ActivityIndicator, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, layout, radius, spacing, type ColorName } from '@/constants/theme';

import { Icon, type IconName } from './icon';
import { Text } from './text';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const VARIANTS: Record<ButtonVariant, { bg: ColorName; fg: ColorName; border?: ColorName }> = {
  primary: { bg: 'ambre', fg: 'marine' },
  secondary: { bg: 'blanc', fg: 'marine', border: 'bordure' },
  danger: { bg: 'blanc', fg: 'danger', border: 'danger' },
  ghost: { bg: 'fond', fg: 'marine' },
};

/** Buttons from the style guide: "Démarrer le service" (primary), "Signaler" (secondary), "Appel d'urgence" (danger). */
export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  loading,
  style,
}: ButtonProps) {
  const v = VARIANTS[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isDisabled ? colors.bordure : colors[v.bg],
          borderColor: v.border ? colors[v.border] : 'transparent',
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={colors[v.fg]} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Icon name={icon} size={20} color={colors[isDisabled ? 'texteSecondaire' : v.fg]} />
          )}
          <Text variant="figure" color={isDisabled ? 'texteSecondaire' : v.fg}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: layout.buttonHeight,
    borderRadius: radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(3),
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
});
