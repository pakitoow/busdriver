import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/constants/theme';

type ScreenProps = PropsWithChildren<{
  /** Scrollable content (default true). Set false for maps / chat. */
  scroll?: boolean;
  /** Pinned under the content, e.g. the main action button. */
  footer?: ReactNode;
  /** Tab screens already have the tab bar handling the bottom inset. */
  edges?: Edge[];
  background?: 'fond' | 'blanc' | 'marine';
  contentStyle?: ViewStyle;
}>;

/** Base wrapper for every screen: background, safe area, 20 px side margins. */
export function Screen({
  children,
  scroll = true,
  footer,
  edges = ['top', 'bottom'],
  background = 'fond',
  contentStyle,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.root, { backgroundColor: colors[background] }]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.content, contentStyle]}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.fill, contentStyle]}>{children}</View>
      )}
      {footer && <View style={styles.footer}>{footer}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  fill: { flex: 1 },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing(2),
    gap: spacing(2),
  },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing(1),
    paddingBottom: spacing(2),
    gap: spacing(1.5),
  },
});
