import type { Meta, StoryObj } from '@storybook/vue3'
import ColorArea from './ColorArea.vue'

// ponytail: placeholder
const meta: Meta<typeof ColorArea> = {
  title: 'Components/ColorArea',
  component: ColorArea,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui color API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithAlpha: Story = {}
