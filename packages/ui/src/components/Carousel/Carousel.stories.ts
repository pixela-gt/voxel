import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Carousel, CarouselSlide } from './index'

const meta: Meta<typeof Carousel> = {
  title: 'Media/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number' },
    slidesPerView: { control: 'number', min: 1, max: 5 },
    gap: { control: 'number', min: 0, max: 32 },
    showArrows: { control: 'boolean' },
    showDots: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const slideStyle = 'width:100%;height:200px;display:flex;align-items:center;justify-content:center;border-radius:12px;font-size:18px;font-weight:600;color:white'

const slideContent = (label: string, color: string) => `
  <CarouselSlide>
    <div style="${slideStyle};background:${color}">${label}</div>
  </CarouselSlide>
`

export const Default: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel>
        ${slideContent('Slide 1', '#6366f1')}
        ${slideContent('Slide 2', '#8b5cf6')}
        ${slideContent('Slide 3', '#a855f7')}
        ${slideContent('Slide 4', '#d946ef')}
      </Carousel>
    `,
  }),
}

export const TwoPerView: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel :slides-per-view="2">
        ${slideContent('Slide 1', '#3b82f6')}
        ${slideContent('Slide 2', '#06b6d4')}
        ${slideContent('Slide 3', '#10b981')}
        ${slideContent('Slide 4', '#f59e0b')}
        ${slideContent('Slide 5', '#ef4444')}
      </Carousel>
    `,
  }),
}

export const ThreePerView: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel :slides-per-view="3">
        ${slideContent('Slide 1', '#6366f1')}
        ${slideContent('Slide 2', '#8b5cf6')}
        ${slideContent('Slide 3', '#a855f7')}
        ${slideContent('Slide 4', '#d946ef')}
        ${slideContent('Slide 5', '#ec4899')}
        ${slideContent('Slide 6', '#f43f5e')}
      </Carousel>
    `,
  }),
}

export const ThreePerViewWithDots: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel :slides-per-view="3" show-dots>
        ${slideContent('Slide 1', '#3b82f6')}
        ${slideContent('Slide 2', '#8b5cf6')}
        ${slideContent('Slide 3', '#a855f7')}
        ${slideContent('Slide 4', '#d946ef')}
        ${slideContent('Slide 5', '#ec4899')}
      </Carousel>
    `,
  }),
}

export const CustomGap: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel :slides-per-view="2" :gap="32">
        ${slideContent('Slide 1', '#10b981')}
        ${slideContent('Slide 2', '#f59e0b')}
        ${slideContent('Slide 3', '#ef4444')}
        ${slideContent('Slide 4', '#8b5cf6')}
      </Carousel>
    `,
  }),
}

export const WithDots: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel show-dots>
        ${slideContent('Slide 1', '#3b82f6')}
        ${slideContent('Slide 2', '#06b6d4')}
        ${slideContent('Slide 3', '#10b981')}
        ${slideContent('Slide 4', '#f59e0b')}
      </Carousel>
    `,
  }),
}

export const WithoutArrows: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel :show-arrows="false" show-dots>
        ${slideContent('Slide 1', '#ef4444')}
        ${slideContent('Slide 2', '#f97316')}
        ${slideContent('Slide 3', '#eab308')}
      </Carousel>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    setup() {
      const current = ref(0)
      return { current }
    },
    template: `
      <div>
        <Carousel v-model="current" show-dots>
          ${slideContent('Slide 1', '#6366f1')}
          ${slideContent('Slide 2', '#8b5cf6')}
          ${slideContent('Slide 3', '#a855f7')}
        </Carousel>
        <p style="margin-top:12px;font-size:14px;color:var(--color-text-secondary)">Current slide: {{ current + 1 }}</p>
      </div>
    `,
  }),
}

export const ManySlides: Story = {
  render: () => ({
    components: { Carousel, CarouselSlide },
    template: `
      <Carousel :slides-per-view="3" show-dots>
        ${Array.from({ length: 9 }, (_, i) => slideContent(`Slide ${i + 1}`, `hsl(${i * 40}, 70%, 50%)`)).join('\n        ')}
      </Carousel>
    `,
  }),
}
