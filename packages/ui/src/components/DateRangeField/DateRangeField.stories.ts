import type { Meta, StoryObj } from '@storybook/vue3'
import DateRangeField from './DateRangeField.vue'

// ponytail: placeholder
const meta: Meta<typeof DateRangeField> = {
  title: 'Components/DateRangeField',
  component: DateRangeField,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = {}
