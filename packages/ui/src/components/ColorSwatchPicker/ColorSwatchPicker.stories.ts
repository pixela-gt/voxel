import type { Meta, StoryObj } from '@storybook/vue3'
import ColorSwatchPicker from './ColorSwatchPicker.vue'

// ponytail: placeholder
const meta: Meta<typeof ColorSwatchPicker> = {
  title: 'Components/ColorSwatchPicker',
  component: ColorSwatchPicker,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui color API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Multiple: Story = {}
