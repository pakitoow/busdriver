import { Link, router } from 'expo-router';

import { Button, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 7 — Trajet en cours (carte). */
export default function TrajetScreen() {
  return (
    <Screen edges={['top']}>
      <ScreenHeader title="Vers Campus universitaire" subtitle="En service · GPS actif" />
      <TodoPlaceholder
        mockupPage={7}
        notes={[
          'Carte plein écran (expo-maps → nécessite un development build)',
          'Bandeau ligne + temps écoulé, bouton "Terminer le service"',
          'Feuille "Prochain arrêt" + progression "Arrêt 5 sur 14"',
          'Boutons Signaler / Arrêt desservi',
        ]}
      />
      <Link href="/trajet/itineraire">Voir l’itinéraire</Link>
      <Button
        title="Signaler"
        icon="alert-triangle"
        variant="secondary"
        onPress={() => router.push('/incident-report')}
      />
      <Button
        title="Terminer le service"
        variant="danger"
        onPress={() => router.push('/service-summary')}
      />
    </Screen>
  );
}
