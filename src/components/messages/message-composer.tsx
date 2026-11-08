import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon, Text } from '@/components/ui';
import { colors, layout, radius, spacing, typography } from '@/constants/theme';

const QUICK_REPLIES = ['Bien reçu', 'J’ai du retard', 'Appelez-moi'];

type MessageComposerProps = {
  onSend: (text: string) => void;
};

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [text, setText] = useState('');

  function submit() {
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText('');
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.replies}>
        {QUICK_REPLIES.map((reply) => (
          <Pressable
            key={reply}
            accessibilityRole="button"
            onPress={() => onSend(reply)}
            style={styles.chip}>
            <Text variant="label">{reply}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={submit}
          returnKeyType="send"
          placeholder="Écrire un message…"
          placeholderTextColor={colors.texteSecondaire}
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Envoyer"
          onPress={submit}
          style={styles.send}>
          <Icon name="send" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing(1.5) },
  replies: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1) },
  chip: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing(2),
    backgroundColor: colors.blanc,
    borderWidth: 1.5,
    borderColor: colors.bordure,
    borderRadius: radius.full,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  input: {
    ...typography.body,
    flex: 1,
    height: layout.buttonHeight,
    paddingHorizontal: spacing(2.5),
    color: colors.marine,
    backgroundColor: colors.blanc,
    borderWidth: 1.5,
    borderColor: colors.bordure,
    borderRadius: radius.full,
  },
  send: {
    width: layout.buttonHeight,
    height: layout.buttonHeight,
    borderRadius: radius.full,
    backgroundColor: colors.ambre,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
