import type { Meta, StoryObj } from '@storybook/vue3'
import RangeCalendar from './RangeCalendar.vue'

// ponytail: placeholder
const meta: Meta<typeof RangeCalendar> = {
  title: 'Components/RangeCalendar',
  component: RangeCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
