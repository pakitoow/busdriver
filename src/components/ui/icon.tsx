import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';
import type { ColorValue } from 'react-native';

import { colors } from '@/constants/theme';

export type IconName = ComponentProps<typeof Feather>['name'];

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorValue;
};

/**
 * App-wide icon set (Feather — outline icons matching the mockups).
 * Browse names at https://icons.expo.fyi (filter: Feather).
 */
export function Icon({ name, size = 22, color = colors.marine }: IconProps) {
  return <Feather name={name} size={size} color={color} />;
}
