/**
 * BusDriver design tokens — source: docs/design/busdriver-maquettes.pdf (page 13, "Guide de style").
 * Never hardcode colors, sizes or font names in screens: import them from here.
 */
import type { TextStyle } from 'react-native';

export const colors = {
  marine: '#0F2A4A',
  ambre: '#FFB81C',
  ambreFond: '#FFF3D6',
  blanc: '#FFFFFF',
  fond: '#F3F5F8',
  texteSecondaire: '#5B6B82',
  bordure: '#E1E6ED',
  marineFond: '#E8EEF6',
  succes: '#1E7A4C',
  succesFond: '#E3F4EA',
  alerte: '#8A5A00',
  alerteFond: '#FFF1CC',
  danger: '#B42318',
  dangerFond: '#FDECEA',
} as const;

export type ColorName = keyof typeof colors;

export const radius = { sm: 12, md: 16, lg: 24, xl: 28, full: 999 } as const;

/** 8 px grid: spacing(2) === 16 */
export const spacing = (n: number) => n * 8;

export const layout = {
  screenPadding: 20,
  minTouchTarget: 44,
  buttonHeight: 56,
  inputHeight: 52,
  tabBarHeight: 84,
} as const;

/** Font family names registered by useFonts() in src/app/_layout.tsx */
export const fonts = {
  medium: 'PlusJakartaSans_500Medium',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const typography = {
  /** Titre d'écran — 26 px ExtraBold */
  screenTitle: { fontFamily: fonts.extraBold, fontSize: 26, lineHeight: 32 },
  /** Titre de carte — 20 px ExtraBold */
  cardTitle: { fontFamily: fonts.extraBold, fontSize: 20, lineHeight: 26 },
  /** Chiffres clés — 18 px ExtraBold */
  figure: { fontFamily: fonts.extraBold, fontSize: 18, lineHeight: 24 },
  /** Libellés, titres de section — 15 px Bold */
  label: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 20 },
  /** Texte courant — 15 px Medium */
  body: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 22 },
  /** Texte secondaire — 13 px Medium */
  small: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 },
  /** LÉGENDE — 12 px Bold majuscules */
  caption: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
