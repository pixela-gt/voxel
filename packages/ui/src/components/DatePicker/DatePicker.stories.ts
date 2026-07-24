import type { Meta, StoryObj } from '@storybook/vue3'
import DatePicker from './DatePicker.vue'

// ponytail: placeholder
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithTime: Story = {}
export const Disabled: Story = {}
