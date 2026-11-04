import { Link } from 'expo-router';

import { Button, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';
import { useDriver, useSession } from '@/providers/session-provider';

/** Maquette page 3 — Profil. */
export default function ProfilScreen() {
  const driver = useDriver();
  const { signOut } = useSession();

  return (
    <Screen edges={['top']}>
      <ScreenHeader
        title={`${driver.firstName} ${driver.lastName}`}
        subtitle={`Matricule ${driver.matricule} · ${driver.depot.name}`}
      />
      <TodoPlaceholder
        mockupPage={3}
        notes={[
          'En-tête marine avec avatar initiales',
          'Historique récent (api.getWorkHistory)',
          'Paramètres : notifications, langue, aide',
        ]}
      />
      <Link href="/profil/signalements">Mes signalements</Link>
      <Button title="Se déconnecter" icon="log-out" variant="danger" onPress={signOut} />
    </Screen>
  );
}
