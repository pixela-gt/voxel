import type { Meta, StoryObj } from '@storybook/vue3'
import ColorSlider from './ColorSlider.vue'

// ponytail: placeholder
const meta: Meta<typeof ColorSlider> = {
  title: 'Components/ColorSlider',
  component: ColorSlider,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui color API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Hue: Story = {}
export const Alpha: Story = {}
