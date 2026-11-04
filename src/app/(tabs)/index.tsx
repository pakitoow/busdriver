import { Link, router } from 'expo-router';

import { Button, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';
import { useDriver } from '@/providers/session-provider';

/** Maquette page 4 — Accueil. */
export default function HomeScreen() {
  const driver = useDriver();

  return (
    <Screen edges={['top']}>
      <ScreenHeader title={`Bonjour, ${driver.firstName}`} subtitle="Lundi 2 novembre" />
      <TodoPlaceholder
        mockupPage={4}
        notes={[
          'Avatar initiales + cloche notifications',
          'Carte marine "Service du jour" (api.getServicesForDay)',
          'Raccourcis : Signaler un incident / Appeler le dépôt',
          'Liste "Prochains services" + lien "Voir le planning"',
        ]}
      />
      <Button
        title="Démarrer le service"
        icon="play"
        onPress={() => router.push('/vehicle-check')}
      />
      <Link href="/incident-report">Signaler un incident</Link>
    </Screen>
  );
}
