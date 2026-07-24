import type { Meta, StoryObj } from '@storybook/vue3'
import MonthRangePicker from './MonthRangePicker.vue'

// ponytail: placeholder
const meta: Meta<typeof MonthRangePicker> = {
  title: 'Components/MonthRangePicker',
  component: MonthRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
