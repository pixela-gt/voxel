import type { Meta, StoryObj } from '@storybook/vue3'
import Progress from './Progress.vue'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 0, max: 100 } },
    max: { control: { type: 'number', min: 1 } },
    indeterminate: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { modelValue: 50 } }
export const TwentyFive: Story = { args: { modelValue: 25 } }
export const SeventyFive: Story = { args: { modelValue: 75 } }
export const Complete: Story = { args: { modelValue: 100 } }
export const Small: Story = { args: { modelValue: 60, size: 'small' } }
export const Large: Story = { args: { modelValue: 60, size: 'large' } }
export const Indeterminate: Story = { args: { indeterminate: true } }
