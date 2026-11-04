import { router } from 'expo-router';

import { Button, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 9 — Service terminé (from "Terminer le service"). */
export default function ServiceSummaryScreen() {
  return (
    <Screen
      footer={
        <Button title="Valider et terminer" icon="check" onPress={() => router.dismissTo('/')} />
      }>
      <ScreenHeader
        title="Service terminé"
        subtitle="Ligne 7 · Centre-ville → Campus universitaire"
      />
      <TodoPlaceholder
        mockupPage={9}
        notes={[
          'En-tête marine avec coche ambre',
          'Départ / arrivée avec retard (+3 min)',
          'Grille : durée, arrêts desservis, distance, signalements',
          'Kilométrage de fin → api.submitServiceReport',
        ]}
      />
    </Screen>
  );
}
