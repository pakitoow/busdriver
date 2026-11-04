/**
 * Data access layer. Every screen gets its data through these functions —
 * never import mock-data directly from a screen.
 *
 * Today everything is mocked with a small fake delay. When the backend is ready,
 * replace the body of each function with the real HTTP call; screens don't change.
 */
import type {
  Driver,
  Incident,
  Message,
  NewIncident,
  Service,
  ServiceReport,
  Stop,
  VehicleCheck,
  WorkDaySummary,
} from '@/types/models';

import {
  mockDriver,
  mockHistory,
  mockIncidents,
  mockMessages,
  mockServices,
  mockStopsLine7,
} from './mock-data';

const MOCK_DELAY_MS = 300;
const delay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS));

export class ApiError extends Error {}

// Auth -----------------------------------------------------------------------

export async function login(matricule: string, password: string): Promise<Driver> {
  if (!matricule.trim() || !password) {
    throw new ApiError('Matricule et mot de passe requis.');
  }
  return delay(mockDriver);
}

export async function logout(): Promise<void> {
  return delay(undefined);
}

// Planning -------------------------------------------------------------------

/** Services for a given day (YYYY-MM-DD). */
export async function getServicesForDay(_date: string): Promise<Service[]> {
  return delay(mockServices);
}

export async function getService(serviceId: string): Promise<Service | undefined> {
  return delay(mockServices.find((s) => s.id === serviceId));
}

export async function getWorkHistory(): Promise<WorkDaySummary[]> {
  return delay(mockHistory);
}

// Trip -----------------------------------------------------------------------

export async function getStops(_serviceId: string): Promise<Stop[]> {
  return delay(mockStopsLine7);
}

export async function submitVehicleCheck(_check: VehicleCheck): Promise<void> {
  return delay(undefined);
}

export async function submitServiceReport(_report: ServiceReport): Promise<void> {
  return delay(undefined);
}

// Incidents ------------------------------------------------------------------

export async function getIncidents(): Promise<Incident[]> {
  return delay(mockIncidents);
}

export async function reportIncident(incident: NewIncident): Promise<Incident> {
  return delay({
    id: `inc-${Date.now()}`,
    createdAt: new Date().toISOString(),
    line: '7',
    status: 'open',
    ...incident,
  });
}

// Messages -------------------------------------------------------------------

export async function getMessages(): Promise<Message[]> {
  return delay(mockMessages);
}

export async function sendMessage(text: string): Promise<Message> {
  return delay({
    id: `msg-${Date.now()}`,
    author: 'driver',
    sentAt: new Date().toISOString(),
    text,
  });
}
