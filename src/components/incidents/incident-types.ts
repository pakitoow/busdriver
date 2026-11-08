import type { IconName } from '@/components/ui';
import type { IncidentType } from '@/types/models';

export const INCIDENT_TYPE_INFO: Record<IncidentType, { label: string; icon: IconName }> = {
  delay: { label: 'Retard / trafic', icon: 'clock' },
  breakdown: { label: 'Panne du bus', icon: 'truck' },
  accident: { label: 'Accident', icon: 'alert-octagon' },
  passenger: { label: 'Problème passager', icon: 'users' },
  road_blocked: { label: 'Route bloquée', icon: 'slash' },
  other: { label: 'Autre', icon: 'more-horizontal' },
};

export const INCIDENT_TYPE_ORDER: IncidentType[] = [
  'delay',
  'breakdown',
  'accident',
  'passenger',
  'road_blocked',
  'other',
];
