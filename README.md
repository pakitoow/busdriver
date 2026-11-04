# BusDriver

L'application mobile des chauffeurs de bus (Expo SDK 57 · React Native · Expo Router · TypeScript).

Maquettes et guide de style : [`docs/design/busdriver-maquettes.pdf`](docs/design/busdriver-maquettes.pdf)

## Démarrer

```bash
npm install
npm start          # puis "a" (Android), "i" (iOS) ou scanner le QR code avec Expo Go
```

Connexion en dev : **n'importe quel matricule + mot de passe** (l'API est simulée).

## Scripts

| Commande | Rôle |
|---|---|
| `npm start` | serveur de dev |
| `npm run check` | typecheck + lint — **doit passer avant chaque PR** |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint + Prettier |
| `npm run format` | reformate `src/` |
| `npm run doctor` | diagnostique les dépendances Expo |

Ajouter une dépendance : **toujours** `npx expo install <paquet>` (jamais `npm install <paquet>`), pour avoir la version compatible SDK 57.

## Structure

```
src/
  app/                    ← ROUTES UNIQUEMENT (chaque fichier = un écran)
    _layout.tsx           polices, splash, garde d'authentification
    login.tsx             p.1
    location-permission.tsx p.2
    vehicle-check.tsx     p.6   (sans barre d'onglets)
    service-summary.tsx   p.9   (sans barre d'onglets)
    incident-report.tsx   p.10  (modale)
    (tabs)/
      _layout.tsx         barre d'onglets personnalisée
      index.tsx           p.4   Accueil
      planning.tsx        p.5   Planning
      trajet/index.tsx    p.7   Trajet (carte)
      trajet/itineraire.tsx p.8 Itinéraire
      messages.tsx        p.12  Messages
      profil/index.tsx    p.3   Profil
      profil/signalements.tsx p.11 Mes signalements
  components/
    ui/                   composants partagés du guide de style (Button, TextField, Card, Pill, LineBadge, Text, Screen, ScreenHeader, Icon)
    navigation/           barre d'onglets
  constants/theme.ts      couleurs, typo, espacements, mesures (p.13)
  providers/              SessionProvider (chauffeur connecté)
  services/api.ts         accès aux données (simulé pour l'instant)
  types/models.ts         modèles métier (Driver, Service, Stop, Incident, Message…)
  utils/format.ts         formatage FR (heures, durées, dates)
```

Chaque écran contient un bloc jaune `TodoPlaceholder` qui liste ce qu'il reste à faire d'après la maquette. Supprimez-le quand vous implémentez l'écran.

## Règles d'équipe

1. **Une branche par écran ou fonctionnalité** : `feat/planning`, `feat/incident-report`, `fix/tab-bar-badge`… Jamais de commit direct sur `main`.
2. **PR vers `main`**, relue par au moins une autre personne. `npm run check` doit passer.
3. **Pas de valeurs en dur** : couleurs, tailles et polices viennent de `@/constants/theme`. Utilisez `<Text variant="…">` de `@/components/ui` (le lint bloque `Text` de `react-native`).
4. **Données uniquement via `@/services/api`** (le lint bloque l'import direct de `mock-data`). Quand le backend sera prêt, seul `api.ts` changera.
5. **Composant réutilisé par 2 écrans ou plus → `src/components/`**, jamais dans `src/app/`.
6. **Ne touchez pas aux fichiers partagés** (`theme.ts`, `components/ui/*`, `types/models.ts`, `_layout.tsx`) sans prévenir l'équipe : faites une petite PR séparée.
7. Ne créez/modifiez jamais `ios/` ou `android/` à la main : tout passe par `app.json` et les config plugins.

## À savoir

- **Carte (écran Trajet)** : nécessite un module natif (`expo-maps` ou `react-native-maps`) → Expo Go ne suffira plus, il faudra un *development build* (`npx eas-cli@latest build --profile development`).
- **Localisation** : installer `expo-location` (écrans 2, 7, 10).
- **Session** : en mémoire pour l'instant, perdue au redémarrage. À persister avec `expo-secure-store` quand l'API d'authentification existe.
- **Icônes** : [Feather](https://icons.expo.fyi) via `<Icon name="…" />`.
- **Icône et splash de l'app** : encore celles d'Expo, à remplacer par le logo BusDriver.
