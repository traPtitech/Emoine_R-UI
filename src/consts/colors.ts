export const textColors = [
  '#000000',
  '#FF007F',
  '#00FFFF',
  '#00FF00',
  '#FFFF00',
  '#FFFFFF'
] as const

export type TextColor = (typeof textColors)[number]
