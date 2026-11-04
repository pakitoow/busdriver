import { router } from 'expo-router';

import { Button, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 10 — Signaler un incident. Modal, opened from Accueil, Trajet, Mes signalements. */
export default function IncidentReportScreen() {
  return (
    <Screen
      footer={
        <>
          <Button title="Envoyer le signalement" icon="send" onPress={() => router.back()} />
          <Button title="Appel d'urgence" icon="phone" variant="danger" />
        </>
      }>
      <ScreenHeader
        title="Signaler un incident"
        subtitle="Le dépôt reçoit votre alerte avec votre position GPS."
        showBack
      />
      <TodoPlaceholder
        mockupPage={10}
        notes={[
          'Grille de 6 types (type IncidentType)',
          'Description facultative (multiline)',
          'Position jointe automatiquement (expo-location)',
          'Envoi → api.reportIncident',
          'Appel d’urgence → Linking.openURL("tel:…")',
        ]}
      />
    </Screen>
  );
}
