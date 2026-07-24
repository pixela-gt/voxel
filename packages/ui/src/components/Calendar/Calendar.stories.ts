import type { Meta, StoryObj } from '@storybook/vue3'
import Calendar from './Calendar.vue'

// ponytail: placeholder
const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Multiple: Story = {}
export const Range: Story = {}
export const Disabled: Story = {}
export const FixedWeeks: Story = {}
