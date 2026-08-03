// Shared design system types

import type { Component } from 'vue'

export type ComponentSize = 'small' | 'default' | 'large'

export type AccentColor = 'primary' | 'secondary' | 'success' | 'info' | 'error' | 'warning' | 'neutral'

export type Density = 'default' | 'dense'

export type ButtonStyle = 'default' | 'outline' | 'tonal' | 'text'

export type ClassValue = string | string[] | Record<string, boolean>

export type IconValue = Component
