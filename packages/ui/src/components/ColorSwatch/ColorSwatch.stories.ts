import type { Meta, StoryObj } from '@storybook/vue3'
import ColorSwatch from './ColorSwatch.vue'

// ponytail: placeholder
const meta: Meta<typeof ColorSwatch> = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui color API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithRamp: Story = {}
