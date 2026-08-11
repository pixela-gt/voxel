import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Plus, X, Check, ChevronRight } from '@lucide/vue'
import IconButton from './IconButton.vue'

const meta: Meta<typeof IconButton> = {
  title: 'Action/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline', 'tonal', 'text'] },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'error', 'warning', 'neutral'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    density: { control: 'select', options: ['default', 'dense'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { icon: Plus, 'aria-label': 'Add' } }
export const Outline: Story = { args: { icon: Plus, style: 'outline', 'aria-label': 'Add' } }
export const Tonal: Story = { args: { icon: Plus, style: 'tonal', 'aria-label': 'Add' } }
export const Text: Story = { args: { icon: Plus, style: 'text', 'aria-label': 'Add' } }
export const Secondary: Story = { args: { icon: Check, color: 'secondary', 'aria-label': 'Confirm' } }
export const Success: Story = { args: { icon: Check, color: 'success', 'aria-label': 'Success' } }
export const Info: Story = { args: { icon: Plus, color: 'info', 'aria-label': 'Info' } }
export const Error: Story = { args: { icon: X, color: 'error', 'aria-label': 'Error' } }
export const Warning: Story = { args: { icon: X, color: 'warning', 'aria-label': 'Warning' } }
export const Neutral: Story = { args: { icon: X, color: 'neutral', 'aria-label': 'Neutral' } }
export const Small: Story = { args: { icon: ChevronRight, size: 'small', 'aria-label': 'Next' } }
export const Large: Story = { args: { icon: ChevronRight, size: 'large', 'aria-label': 'Next' } }
export const Disabled: Story = { args: { icon: X, disabled: true, 'aria-label': 'Close' } }
export const Loading: Story = { args: { icon: X, loading: true, 'aria-label': 'Loading' } }
