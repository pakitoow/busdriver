import { Stack } from 'expo-router';

/** Profil tab: profile → mes signalements (tab bar stays visible). */
export default function ProfilLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
