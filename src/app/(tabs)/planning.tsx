import { RoundIconButton, Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 5 — Planning. */
export default function PlanningScreen() {
  return (
    <Screen edges={['top']}>
      <ScreenHeader
        title="Planning"
        subtitle="Semaine du 2 au 8 novembre"
        right={
          <>
            <RoundIconButton icon="chevron-left" accessibilityLabel="Semaine précédente" />
            <RoundIconButton icon="chevron-right" accessibilityLabel="Semaine suivante" />
          </>
        }
      />
      <TodoPlaceholder
        mockupPage={5}
        notes={[
          'Sélecteur de jours Lun → Dim (point = jour travaillé)',
          'Résumé "3 services · 2 h 30 de conduite"',
          'Cartes de service (LineBadge + horaires + trajet + bus)',
        ]}
      />
    </Screen>
  );
}
