import { createContext, use, useState, type PropsWithChildren } from 'react';

import * as api from '@/services/api';
import type { Driver } from '@/types/models';

type SessionContextValue = {
  driver: Driver | null;
  /** True once the driver has answered the location prompt (allowed or "Plus tard"). */
  locationPromptDone: boolean;
  signIn: (matricule: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeLocationPrompt: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

/**
 * Holds the logged-in driver. Kept in memory for now —
 * TODO(auth): persist the token with expo-secure-store once the backend exists.
 */
export function SessionProvider({ children }: PropsWithChildren) {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [locationPromptDone, setLocationPromptDone] = useState(false);

  const value: SessionContextValue = {
    driver,
    locationPromptDone,
    signIn: async (matricule, password) => {
      setDriver(await api.login(matricule, password));
    },
    signOut: async () => {
      await api.logout();
      setDriver(null);
      setLocationPromptDone(false);
    },
    completeLocationPrompt: () => setLocationPromptDone(true),
  };

  return <SessionContext value={value}>{children}</SessionContext>;
}

export function useSession() {
  const ctx = use(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside <SessionProvider>');
  return ctx;
}

/** For screens that are only reachable when logged in. */
export function useDriver(): Driver {
  const { driver } = useSession();
  if (!driver) throw new Error('useDriver called while logged out');
  return driver;
}
