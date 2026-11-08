import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { IncidentCard } from '@/components/incidents/incident-card';
import { IncidentFilters, type IncidentFilter } from '@/components/incidents/incident-filters';
import { RoundIconButton, Screen, ScreenHeader, Text } from '@/components/ui';
import { colors } from '@/constants/theme';
import * as api from '@/services/api';
import type { Incident } from '@/types/models';

export default function SignalementsScreen() {
  const [incidents, setIncidents] = useState<Incident[]>();
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState<IncidentFilter>('all');

  useFocusEffect(
    useCallback(() => {
      api
        .getIncidents()
        .then((list) => {
          setIncidents(list);
          setFailed(false);
        })
        .catch(() => setFailed(true));
    }, [])
  );

  const counts: Record<IncidentFilter, number> = {
    all: incidents?.length ?? 0,
    open: incidents?.filter((i) => i.status === 'open').length ?? 0,
    resolved: incidents?.filter((i) => i.status === 'resolved').length ?? 0,
  };
  const visible = incidents?.filter((i) => filter === 'all' || i.status === filter) ?? [];

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
      <IncidentFilters value={filter} counts={counts} onChange={setFilter} />

      {failed && (
        <Text color="danger">Impossible de charger les signalements. Réessayez plus tard.</Text>
      )}
      {!incidents && !failed && <ActivityIndicator color={colors.marine} />}
      {incidents && visible.length === 0 && (
        <Text color="texteSecondaire">Aucun signalement dans cette catégorie.</Text>
      )}
      {visible.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </Screen>
  );
}
