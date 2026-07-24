import type { Meta, StoryObj } from '@storybook/vue3'
import YearRangePicker from './YearRangePicker.vue'

// ponytail: placeholder
const meta: Meta<typeof YearRangePicker> = {
  title: 'Components/YearRangePicker',
  component: YearRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
