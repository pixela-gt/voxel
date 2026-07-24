import type { Meta, StoryObj } from '@storybook/vue3'
import YearPicker from './YearPicker.vue'

// ponytail: placeholder
const meta: Meta<typeof YearPicker> = {
  title: 'Components/YearPicker',
  component: YearPicker,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '**Placeholder** — renders `TODO` until reka-ui date API stabilizes.' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
