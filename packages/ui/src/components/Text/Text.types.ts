export type TextCategory = 'display' | 'headline' | 'title' | 'body' | 'label' | 'text'

export type TextSize =
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'

export type TextVariant = `${TextCategory}-${TextSize}`

export type TextWeight = 'normal' | 'medium' | 'bold'
export type TextAlign = 'left' | 'center' | 'right'
export type TextColor = 'primary' | 'secondary' | 'inverse' | 'muted'

export interface TextProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  variant?: TextVariant
  weight?: TextWeight
  color?: TextColor
  class?: string
}