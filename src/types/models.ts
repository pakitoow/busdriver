/**
 * Shared domain models. Screens and services must use these types —
 * when the backend API is defined, align these first, then the services.
 * Dates are ISO 8601 strings (e.g. "2026-11-02T07:30:00").
 */

export type Driver = {
  id: string;
  /** Matricule chauffeur, e.g. "CH-1042" */
  matricule: string;
  firstName: string;
  lastName: string;
  depot: Depot;
};

export type Depot = {
  id: string;
  name: string;
  phone: string;
};

export type ServiceStatus = 'planned' | 'in_progress' | 'done';

/** One trip on a line (a "service" in the mockups). */
export type Service = {
  id: string;
  line: string;
  from: string;
  to: string;
  departureAt: string;
  arrivalAt: string;
  busNumber: string;
  stopsCount: number;
  status: ServiceStatus;
};

export type StopStatus = 'served' | 'next' | 'upcoming';

export type Stop = {
  id: string;
  name: string;
  scheduledAt: string;
  status: StopStatus;
  isTerminus?: boolean;
  coords?: Coordinates;
};

export type Coordinates = { latitude: number; longitude: number };

export type FuelLevel = 'quarter' | 'half' | 'three_quarters' | 'full';

export type VehicleCheckItem =
  'tires' | 'brakes' | 'lights' | 'mirrors' | 'doors_ramp' | 'cleanliness';

export type VehicleCheck = {
  serviceId: string;
  busNumber: string;
  checkedItems: VehicleCheckItem[];
  odometerKm: number;
  fuelLevel: FuelLevel;
};

export type ServiceReport = {
  serviceId: string;
  startedAt: string;
  endedAt: string;
  stopsServed: number;
  distanceKm: number;
  incidentsCount: number;
  endOdometerKm: number;
};

export type IncidentType =
  'delay' | 'breakdown' | 'accident' | 'passenger' | 'road_blocked' | 'other';

export type IncidentStatus = 'open' | 'resolved';

export type Incident = {
  id: string;
  type: IncidentType;
  createdAt: string;
  line: string;
  description?: string;
  status: IncidentStatus;
  depotReply?: string;
  location?: { label: string; coords?: Coordinates };
};

export type NewIncident = Pick<Incident, 'type' | 'description' | 'location'> & {
  serviceId?: string;
};

export type Message = {
  id: string;
  author: 'driver' | 'depot';
  sentAt: string;
  text?: string;
  /** Set when the message is an incident card ("Signalement envoyé") */
  incidentId?: string;
};

export type WorkDaySummary = {
  date: string;
  line: string;
  servicesCount: number;
  drivingMinutes: number;
  status: 'done' | 'planned';
};
