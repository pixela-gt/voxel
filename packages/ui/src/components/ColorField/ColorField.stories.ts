import type { Meta, StoryObj } from '@storybook/vue3'
import ColorField from './ColorField.vue'

// ponytail: placeholder
const meta: Meta<typeof ColorField> = {
  title: 'Components/ColorField',
  component: ColorField,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui color API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithAlpha: Story = {}
export const Disabled: Story = {}
