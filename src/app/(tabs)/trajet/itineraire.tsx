import { Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 8 — Itinéraire (liste des arrêts). */
export default function ItineraireScreen() {
  return (
    <Screen edges={['top']}>
      <ScreenHeader title="Itinéraire" subtitle="Ligne 7 · vers Campus universitaire" showBack />
      <TodoPlaceholder
        mockupPage={8}
        notes={[
          'Pastilles : 14 arrêts · 55 min · Bus n° 214',
          'Timeline des arrêts (api.getStops) : desservi / prochain / à venir / terminus',
        ]}
      />
    </Screen>
  );
}
