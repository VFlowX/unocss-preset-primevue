import type { Preset } from "unocss"
import type { Theme } from "@unocss/preset-mini"
import { generateThemeColors, primevueTailWindPreset } from "./utils/generators"
import type { PrimeSurfaceType, PrimeThemeColor } from "./utils/constants"
import { rules as PrimeRules, convert } from "./utils/prime"

export interface PresetPrimeOptions {
  /**
   * Use a preflight to set theme colors and font-family on body.
   *
   * @defaultValue `true`
   */
  preflight?: boolean
}

const colors = generateThemeColors()

export const primeThemeColors = {
  ...colors,
  primary: {
    ...colors.primary,
    "DEFAULT": convert("var(--p-primary-color)"),
    "text": convert("var(--p-primary-color-text)"),
    "contrast": convert("var(--p-primary-contrast-color)"),
    "emphasis": convert("var(--p-primary-hover-color)"),
    "primary-emphasis-alt": convert("var(--p-primary-active-color)"),
  },
  text: {
    color: convert("var(--text-color)"),
    secondary: convert("var(--text-color-secondary)"),
  },
  surface: {
    0: convert("var(--p-surface-0)"),
    ...colors.surface,
    ground: convert("var(--p-surface-ground)"),
    section: convert("var(--p-surface-section)"),
    card: convert("var(--p-surface-card)"),
    overlay: convert("var(--p-surface-overlay)"),
    border: convert("var(--p-surface-border)"),
    hover: convert("var(--p-surface-hover)"),
  },
} as const

export type PrimeThemeColors = typeof primeThemeColors

export const primeTheme = {
  colors: primeThemeColors,
} as const satisfies Theme

export type PrimeTheme = typeof primeTheme
export function presetPrime(options?: PresetPrimeOptions): Preset<Theme> {
  const { preflight = true } = options ?? {}

  const preset = {
    name: "unocss-preset-primevue",
    theme: primeTheme,
    rules: primevueTailWindPreset(PrimeRules),
    shortcuts: [
      {
        "bg-primary": "bg-primary text-primary-text",
        "bg-primary-reverse": "bg-primary-text text-primary",
        "text-color": "text-text-color",
        "text-color-secondary": "text-text-secondary",
      },
      [
        /^([a-z]*)-(ground$|section$|card$|overlay$|border$|hover$)/,
        ([, p, v]) => `${p}-p-surface-${v}`,
      ],
    ],
    preflights: preflight
      ? [
          {
            getCSS: () => `
              body {
                margin: 0;
                background-color: var(--p-surface-ground);
                color: var(--text-color);
                font-family: var(--font-family);
              }
            `,
          },
        ]
      : undefined,
  } as Preset<Theme>

  return preset
}

export type { PrimeThemeColor, PrimeSurfaceType }
