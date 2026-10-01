import type { ClassValue } from '../../types/shared'

export interface CarouselProps {
  modelValue?: number
  slidesPerView?: number
  gap?: number
  showArrows?: boolean
  showDots?: boolean
  class?: ClassValue
}
