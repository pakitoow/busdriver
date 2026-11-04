import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, layout, radius, spacing, typography } from '@/constants/theme';

import { Icon, type IconName } from './icon';
import { Text } from './text';

type TextFieldProps = TextInputProps & {
  label?: string;
  /** Icon shown on the left, e.g. "lock" */
  icon?: IconName;
  /** Unit shown on the right, e.g. "km" */
  unit?: string;
  error?: string;
};

/** Input from the style guide ("Matricule chauffeur"). Pass secureTextEntry for passwords: an eye toggle is added. */
export function TextField({
  label,
  icon,
  unit,
  error,
  secureTextEntry,
  style,
  ...rest
}: TextFieldProps) {
  const [hidden, setHidden] = useState(!!secureTextEntry);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text variant="label">{label}</Text>}
      <View
        style={[
          styles.field,
          focused && { borderColor: colors.marine },
          !!error && { borderColor: colors.danger },
        ]}>
        {icon && <Icon name={icon} color={colors.texteSecondaire} />}
        <TextInput
          placeholderTextColor={colors.texteSecondaire}
          secureTextEntry={hidden}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, style]}
          {...rest}
        />
        {secureTextEntry && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
            hitSlop={12}
            onPress={() => setHidden((h) => !h)}>
            <Icon name={hidden ? 'eye' : 'eye-off'} color={colors.marine} />
          </Pressable>
        )}
        {unit && (
          <Text variant="label" color="texteSecondaire">
            {unit}
          </Text>
        )}
      </View>
      {error && (
        <Text variant="small" color="danger">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing(1) },
  field: {
    minHeight: layout.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
    paddingHorizontal: spacing(2),
    backgroundColor: colors.blanc,
    borderWidth: 1.5,
    borderColor: colors.bordure,
    borderRadius: radius.md,
  },
  input: {
    ...typography.body,
    flex: 1,
    color: colors.marine,
    paddingVertical: spacing(1.5),
  },
});
