import type { Component } from 'vue'
import type { ComponentSize } from '../../types/shared'

export type IconValue = Component

export interface IconProps {
  icon: IconValue
  size?: ComponentSize
}
