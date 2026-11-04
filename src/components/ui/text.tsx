import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { colors, typography, type ColorName, type TypographyVariant } from '@/constants/theme';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  color?: ColorName;
};

/** Always use this instead of react-native's <Text> so fonts and colors stay consistent. */
export function Text({ variant = 'body', color = 'marine', style, ...rest }: TextProps) {
  return <RNText style={[typography[variant], { color: colors[color] }, style]} {...rest} />;
}
