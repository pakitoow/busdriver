import { router } from 'expo-router';

import { Button, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 6 — Vérification du véhicule (from "Démarrer le service"). */
export default function VehicleCheckScreen() {
  return (
    <Screen
      footer={
        <Button title="Démarrer le trajet" icon="play" onPress={() => router.replace('/trajet')} />
      }>
      <ScreenHeader
        title="Vérification du véhicule"
        subtitle="Bus n° 214 · avant le départ"
        showBack
      />
      <TodoPlaceholder
        mockupPage={6}
        notes={[
          'Barre de progression "4 sur 6 vérifiés"',
          'Checklist de 6 points (type VehicleCheckItem)',
          'Kilométrage au compteur (TextField unit="km")',
          'Niveau de carburant (sélecteur segmenté)',
          'Bouton désactivé tant que tout n’est pas coché → api.submitVehicleCheck',
        ]}
      />
    </Screen>
  );
}
