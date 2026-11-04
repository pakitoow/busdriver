/**
 * Fake data taken from the mockups (docs/design/busdriver-maquettes.pdf).
 * Only src/services/api.ts should import this file.
 */
import type { Driver, Incident, Message, Service, Stop, WorkDaySummary } from '@/types/models';

export const mockDriver: Driver = {
  id: 'drv-1042',
  matricule: 'CH-1042',
  firstName: 'Youssef',
  lastName: 'Benali',
  depot: { id: 'depot-centre', name: 'Dépôt Centre', phone: '+212500000000' },
};

export const mockServices: Service[] = [
  {
    id: 'svc-1',
    line: '7',
    from: 'Centre-ville',
    to: 'Campus universitaire',
    departureAt: '2026-11-02T07:30:00',
    arrivalAt: '2026-11-02T08:25:00',
    busNumber: '214',
    stopsCount: 14,
    status: 'planned',
  },
  {
    id: 'svc-2',
    line: '7',
    from: 'Campus universitaire',
    to: 'Centre-ville',
    departureAt: '2026-11-02T10:00:00',
    arrivalAt: '2026-11-02T10:55:00',
    busNumber: '214',
    stopsCount: 14,
    status: 'planned',
  },
  {
    id: 'svc-3',
    line: '3',
    from: 'Gare routière',
    to: 'Zone industrielle',
    departureAt: '2026-11-02T14:30:00',
    arrivalAt: '2026-11-02T15:10:00',
    busNumber: '108',
    stopsCount: 9,
    status: 'planned',
  },
];

const stop = (
  id: number,
  name: string,
  time: string,
  status: Stop['status'],
  isTerminus = false
): Stop => ({ id: `stop-${id}`, name, scheduledAt: `2026-11-02T${time}:00`, status, isTerminus });

export const mockStopsLine7: Stop[] = [
  stop(1, 'Terminus Centre-ville', '07:30', 'served', true),
  stop(2, 'Hôtel de ville', '07:33', 'served'),
  stop(3, 'Rue des Orangers', '07:37', 'served'),
  stop(4, 'Hôpital régional', '07:41', 'served'),
  stop(5, 'Place du Marché', '07:45', 'next'),
  stop(6, 'Parc municipal', '07:49', 'upcoming'),
  stop(7, 'Lycée technique', '07:53', 'upcoming'),
  stop(8, 'Quartier des Jardins', '07:57', 'upcoming'),
  stop(9, 'Stade municipal', '08:01', 'upcoming'),
  stop(10, 'Rond-point de la Gare', '08:05', 'upcoming'),
  stop(11, 'Cité administrative', '08:09', 'upcoming'),
  stop(12, 'Résidence universitaire', '08:14', 'upcoming'),
  stop(13, 'Faculté des sciences', '08:19', 'upcoming'),
  stop(14, 'Campus universitaire', '08:25', 'upcoming', true),
];

export const mockIncidents: Incident[] = [
  {
    id: 'inc-4',
    type: 'breakdown',
    createdAt: '2026-11-02T07:42:00',
    line: '7',
    description: 'Voyant moteur allumé, je continue jusqu’au terminus.',
    status: 'open',
    depotReply: 'Un mécanicien vous attend au terminus.',
    location: { label: 'Près de l’Hôpital régional' },
  },
  {
    id: 'inc-3',
    type: 'delay',
    createdAt: '2026-10-30T08:05:00',
    line: '7',
    description: 'Travaux avenue Principale, retard de 10 min.',
    status: 'resolved',
  },
  {
    id: 'inc-2',
    type: 'passenger',
    createdAt: '2026-10-29T17:40:00',
    line: '3',
    description: 'Passager sans titre de transport refusant de descendre.',
    status: 'resolved',
    depotReply: 'Contrôleurs envoyés à l’arrêt Stade municipal.',
  },
  {
    id: 'inc-1',
    type: 'road_blocked',
    createdAt: '2026-10-27T12:15:00',
    line: '7',
    description: 'Rond-point de la Gare fermé, déviation par la Cité administrative.',
    status: 'resolved',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    author: 'depot',
    sentAt: '2026-11-02T07:20:00',
    text: 'Bonjour Youssef, travaux avenue Principale ce matin. Prenez la déviation par la rue des Orangers.',
  },
  { id: 'msg-2', author: 'driver', sentAt: '2026-11-02T07:22:00', text: 'Bien reçu, merci.' },
  { id: 'msg-3', author: 'driver', sentAt: '2026-11-02T07:42:00', incidentId: 'inc-4' },
  {
    id: 'msg-4',
    author: 'depot',
    sentAt: '2026-11-02T07:44:00',
    text: 'Signalement reçu. Un mécanicien vous attend au terminus.',
  },
  {
    id: 'msg-5',
    author: 'driver',
    sentAt: '2026-11-02T07:45:00',
    text: 'D’accord, je continue jusqu’au terminus.',
  },
];

export const mockHistory: WorkDaySummary[] = [
  { date: '2026-10-30', line: '7', servicesCount: 4, drivingMinutes: 400, status: 'done' },
  { date: '2026-10-29', line: '3', servicesCount: 3, drivingMinutes: 310, status: 'done' },
  { date: '2026-10-28', line: '7', servicesCount: 4, drivingMinutes: 395, status: 'done' },
];
