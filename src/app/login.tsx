import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { Button, Screen, Text, TextField, TodoPlaceholder } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { useSession } from '@/providers/session-provider';

/** Maquette page 1 — Connexion. Functional with the mock API (any matricule + password). */
export default function LoginScreen() {
  const { signIn } = useSession();
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(undefined);
    setLoading(true);
    try {
      await signIn(matricule, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Connexion impossible.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen
        footer={
          <Button title="Se connecter" icon="arrow-right" onPress={onSubmit} loading={loading} />
        }>
        <TodoPlaceholder
          mockupPage={1}
          notes={[
            'En-tête marine avec logo BusDriver',
            'Lien "Mot de passe oublié ?"',
            'Lien "Contacter le dépôt"',
          ]}
        />
        <View style={styles.titles}>
          <Text variant="screenTitle">Connexion</Text>
          <Text color="texteSecondaire">Entrez votre matricule et votre mot de passe.</Text>
        </View>
        <TextField
          label="Matricule chauffeur"
          icon="credit-card"
          placeholder="Ex. CH-1042"
          autoCapitalize="characters"
          autoCorrect={false}
          value={matricule}
          onChangeText={setMatricule}
        />
        <TextField
          label="Mot de passe"
          icon="lock"
          placeholder="Votre mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={error}
          onSubmitEditing={onSubmit}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  titles: { gap: spacing(0.5) },
});
