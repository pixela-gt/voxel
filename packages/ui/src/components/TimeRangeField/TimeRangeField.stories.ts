import type { Meta, StoryObj } from '@storybook/vue3'
import TimeRangeField from './TimeRangeField.vue'

// ponytail: placeholder
const meta: Meta<typeof TimeRangeField> = {
  title: 'Components/TimeRangeField',
  component: TimeRangeField,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = {}
