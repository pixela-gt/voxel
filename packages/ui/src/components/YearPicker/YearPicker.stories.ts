import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YearPicker from './YearPicker.vue'

const meta: Meta<typeof YearPicker> = {
  title: 'Components/YearPicker',
  component: YearPicker,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }