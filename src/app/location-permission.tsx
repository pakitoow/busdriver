import { Button, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';
import { useSession } from '@/providers/session-provider';

/** Maquette page 2 — Activez la localisation. Shown once after login. */
export default function LocationPermissionScreen() {
  const { completeLocationPrompt } = useSession();

  // TODO: install expo-location (npx expo install expo-location), add its config plugin
  // in app.json with the French permission text, and request permission here.
  return (
    <Screen
      footer={
        <>
          <Button
            title="Autoriser la localisation"
            icon="navigation"
            onPress={completeLocationPrompt}
          />
          <Button title="Plus tard" variant="ghost" onPress={completeLocationPrompt} />
        </>
      }>
      <ScreenHeader
        title="Activez la localisation"
        subtitle="BusDriver partage la position du bus avec le dépôt, uniquement pendant votre service."
      />
      <TodoPlaceholder
        mockupPage={2}
        notes={[
          'Illustration carte',
          '3 avantages avec icônes',
          'Demande de permission expo-location',
        ]}
      />
    </Screen>
  );
}
