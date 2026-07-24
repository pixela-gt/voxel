import type { Meta, StoryObj } from '@storybook/vue3'
import TimeField from './TimeField.vue'

// ponytail: placeholder
const meta: Meta<typeof TimeField> = {
  title: 'Components/TimeField',
  component: TimeField,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const TwelveHour: Story = {}
export const Disabled: Story = {}
