import { Stack } from 'expo-router';

/** Trajet tab: live map → itinéraire (tab bar stays visible). */
export default function TrajetLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
