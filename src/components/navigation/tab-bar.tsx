import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { colors, fonts, radius, spacing } from '@/constants/theme';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/**
 * Custom bottom bar matching the mockups: amber pill behind the active icon,
 * bold active label, red count badge (set `tabBarBadge` in the screen options).
 */
export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing(1.5)) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        const label = options.title ?? route.name;
        const color = focused ? colors.marine : colors.texteSecondaire;
        const badge = options.tabBarBadge;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            onPress={onPress}
            style={styles.item}>
            <View style={[styles.iconPill, focused && styles.iconPillActive]}>
              {options.tabBarIcon?.({ focused, color, size: 24 })}
              {badge !== undefined && (
                <View style={styles.badge}>
                  <Text variant="caption" color="blanc" style={styles.badgeText}>
                    {String(badge)}
                  </Text>
                </View>
              )}
            </View>
            <Text
              variant="small"
              style={{ color, fontFamily: focused ? fonts.extraBold : fonts.medium }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.blanc,
    borderTopWidth: 1,
    borderTopColor: colors.bordure,
    paddingTop: spacing(1),
  },
  item: { flex: 1, alignItems: 'center', gap: spacing(0.5) },
  iconPill: {
    width: 64,
    height: 36,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPillActive: { backgroundColor: colors.ambreFond },
  badge: {
    position: 'absolute',
    top: -4,
    right: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: radius.full,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: colors.blanc,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10, lineHeight: 12, letterSpacing: 0 },
});
