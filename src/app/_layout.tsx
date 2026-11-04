import {
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { colors } from '@/constants/theme';
import { SessionProvider, useSession } from '@/providers/session-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SessionProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </SessionProvider>
  );
}

/**
 * Navigation map (see README "Écrans"):
 *   logged out → login
 *   logged in  → location-permission (once) → (tabs)
 *   full-screen flows without tab bar: vehicle-check, service-summary, incident-report
 */
function RootNavigator() {
  const { driver, locationPromptDone } = useSession();
  const isLoggedIn = !!driver;

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.fond } }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn && !locationPromptDone}>
        <Stack.Screen name="location-permission" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn && locationPromptDone}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="vehicle-check" />
        <Stack.Screen name="service-summary" options={{ gestureEnabled: false }} />
        <Stack.Screen name="incident-report" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
