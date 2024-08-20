import {
  COLOR_RANGE,
  type PrimeThemeColor as Color,
  type ColorRange,
  THEME_COLORS,
} from "../utils/constants"
import { convert } from "./prime"

export function generateColorRange<T extends string>(color: T) {
  let newColor: string = color
  if (color === "primary" || color === "surface") {
    newColor = `p-${newColor}`
  }

  return COLOR_RANGE.reduce(
    (result, number) => ({
      ...result,
      [number]: convert(`var(--${color}-${number})`),
    }),
    {} as { [K in ColorRange]: `var(--${T}-${K})` },
  )
}

export function generateColorRangeWithDefault<T extends string>(color: T) {
  const result = generateColorRange(color)
  return { ...result, DEFAULT: result[500] } as const
}

export function generateThemeColors() {
  return THEME_COLORS.reduce(
    (result, color) => {
      let newColor: string = color
      if (color === "primary" || color === "surface") {
        newColor = `p-${newColor}`
      }
      return {
        ...result,
        [color]: generateColorRangeWithDefault(newColor),
      }
    },
    {} as { [K in Color]: ReturnType<typeof generateColorRangeWithDefault<K>> },
  )
}

export function primevueTailWindPreset(rules) {
  const result = []
  for (const key in rules) {
    const keyz = key.replaceAll(".", "")
    result.push([keyz, rules[key]])
  }
  return result
}
