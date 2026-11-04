import { Screen, ScreenHeader, TodoPlaceholder } from '@/components/ui';

/** Maquette page 12 — Messages (chat avec le dépôt). */
export default function MessagesScreen() {
  return (
    <Screen edges={['top']} scroll={false}>
      <ScreenHeader title="Dépôt Centre" subtitle="Régulation en ligne" />
      <TodoPlaceholder
        mockupPage={12}
        notes={[
          'Liste de bulles (FlatList inversée) — api.getMessages',
          'Carte "Signalement envoyé" quand message.incidentId',
          'Réponses rapides : Bien reçu / J’ai du retard / Appelez-moi',
          'Champ de saisie + bouton envoyer — api.sendMessage',
        ]}
      />
    </Screen>
  );
}
