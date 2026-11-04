import { router } from 'expo-router';

import { RoundIconButton, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 11 — Mes signalements. */
export default function SignalementsScreen() {
  return (
    <Screen edges={['top']}>
      <ScreenHeader
        title="Mes signalements"
        showBack
        right={
          <RoundIconButton
            icon="plus"
            accessibilityLabel="Nouveau signalement"
            onPress={() => router.push('/incident-report')}
          />
        }
      />
      <TodoPlaceholder
        mockupPage={11}
        notes={[
          'Filtres Tous / En cours / Résolus',
          'Cartes incident (api.getIncidents) + statut + réponse du dépôt',
        ]}
      />
    </Screen>
  );
}
