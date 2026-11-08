import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Linking, Platform, StyleSheet, View } from 'react-native';

import { INCIDENT_TYPE_INFO, INCIDENT_TYPE_ORDER } from '@/components/incidents/incident-types';
import { TypeTile } from '@/components/incidents/type-tile';
import { Button, Card, Icon, Screen, ScreenHeader, Text, TextField } from '@/components/ui';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { useDriver } from '@/providers/session-provider';
import * as api from '@/services/api';
import type { IncidentType, NewIncident } from '@/types/models';
import { formatTime } from '@/utils/format';

type PositionState =
  | { status: 'loading' }
  | { status: 'ready'; location: NonNullable<NewIncident['location']>; at: string }
  | { status: 'unavailable' };

function useCurrentPosition(): PositionState {
  const [state, setState] = useState<PositionState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') throw new Error('permission denied');
        const { coords } = await Location.getCurrentPositionAsync({});
        const coordinates = { latitude: coords.latitude, longitude: coords.longitude };
        const [place] = await Location.reverseGeocodeAsync(coordinates).catch(() => []);
        const name = place?.name ?? place?.street;
        if (!cancelled) {
          setState({
            status: 'ready',
            location: { label: name ? `Près de ${name}` : 'Position GPS', coords: coordinates },
            at: new Date().toISOString(),
          });
        }
      } catch {
        if (!cancelled) setState({ status: 'unavailable' });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export default function IncidentReportScreen() {
  const driver = useDriver();
  const position = useCurrentPosition();
  const [type, setType] = useState<IncidentType>();
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);

  async function submit() {
    if (!type) return;
    setSending(true);
    try {
      await api.reportIncident({
        type,
        description: description.trim() || undefined,
        location: position.status === 'ready' ? position.location : undefined,
      });
      router.back();
    } catch {
      setSending(false);
      Alert.alert('Envoi impossible', 'Le signalement n’a pas été envoyé. Réessayez.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen
        footer={
          <>
            <Button
              title="Envoyer le signalement"
              icon="send"
              disabled={!type}
              loading={sending}
              onPress={submit}
            />
            <Button
              title="Appel d'urgence"
              icon="phone"
              variant="danger"
              onPress={() => Linking.openURL(`tel:${driver.depot.phone}`)}
            />
          </>
        }>
        <ScreenHeader
          title="Signaler un incident"
          subtitle="Le dépôt reçoit votre alerte avec votre position GPS."
          showBack
        />

        <View style={styles.section}>
          <Text variant="label">Type d’incident</Text>
          <View style={styles.grid}>
            {INCIDENT_TYPE_ORDER.map((t) => (
              <TypeTile
                key={t}
                label={INCIDENT_TYPE_INFO[t].label}
                icon={INCIDENT_TYPE_INFO[t].icon}
                selected={type === t}
                onPress={() => setType(t)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="label">
            Description{' '}
            <Text variant="label" color="texteSecondaire">
              (facultatif)
            </Text>
          </Text>
          <TextField
            value={description}
            onChangeText={setDescription}
            placeholder="Ex. Voyant moteur allumé, je m'arrête au prochain arrêt."
            multiline
            style={styles.description}
          />
        </View>

        <PositionCard position={position} />
      </Screen>
    </KeyboardAvoidingView>
  );
}

function PositionCard({ position }: { position: PositionState }) {
  const ready = position.status === 'ready';
  const unavailable = position.status === 'unavailable';

  return (
    <Card style={styles.positionCard}>
      <View style={styles.positionIcon}>
        <Icon name="map-pin" />
      </View>
      <View style={styles.flex}>
        <Text variant="label">
          {ready
            ? 'Position jointe automatiquement'
            : unavailable
              ? 'Position indisponible'
              : 'Recherche de la position…'}
        </Text>
        {ready && (
          <Text variant="small" color="texteSecondaire">
            {position.location.label} · {formatTime(position.at)}
          </Text>
        )}
        {unavailable && (
          <Text variant="small" color="texteSecondaire">
            Le dépôt ne recevra pas votre position.
          </Text>
        )}
      </View>
      {ready && <Icon name="check" color={colors.succes} />}
      {unavailable && <Icon name="alert-triangle" color={colors.alerte} />}
    </Card>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  section: { gap: spacing(1.5) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(1.5) },
  description: { minHeight: spacing(10), textAlignVertical: 'top' },
  positionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  positionIcon: {
    width: layout.minTouchTarget + 4,
    height: layout.minTouchTarget + 4,
    borderRadius: radius.sm,
    backgroundColor: colors.marineFond,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
