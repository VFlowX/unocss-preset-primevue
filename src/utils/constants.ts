export const COLOR_RANGE = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  950,
] as const

export type ColorRange = (typeof COLOR_RANGE)[number]

export const THEME_COLORS = [
  "cyan",
  "indigo",
  "teal",
  "bluegray",
  "primary",
  "surface",
] as const

export type PrimeThemeColor = (typeof THEME_COLORS)[number]

export const SURFACE_TYPES = [
  "ground",
  "section",
  "card",
  "overlay",
  "border",
  "hover",
] as const

export type PrimeSurfaceType = (typeof SURFACE_TYPES)[number]
