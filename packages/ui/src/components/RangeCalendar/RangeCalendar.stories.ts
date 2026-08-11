import type { Meta, StoryObj } from '@storybook/vue3'
import RangeCalendar from './RangeCalendar.vue'

const meta: Meta<typeof RangeCalendar> = {
  title: 'Components/RangeCalendar',
  component: RangeCalendar,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }