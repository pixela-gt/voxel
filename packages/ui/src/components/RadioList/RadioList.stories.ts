import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RadioList from './RadioList.vue'

const meta: Meta<typeof RadioList> = {
  title: 'Inputs/RadioList',
  component: RadioList,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const plans = [
  { value: 'free', label: 'Free', description: 'Basic features with limited usage' },
  { value: 'pro', label: 'Pro', description: 'Advanced features for professionals' },
  { value: 'enterprise', label: 'Enterprise', description: 'Full features with priority support' },
]

export const Default: Story = {
  args: { items: plans },
}

export const WithModelValue: Story = {
  args: { items: plans, modelValue: 'pro' },
}

export const WithDescriptions: Story = {
  args: {
    items: [
      { value: 'email', label: 'Email', description: 'Receive email notifications' },
      { value: 'push', label: 'Push Notifications', description: 'Receive push notifications on your device' },
      { value: 'sms', label: 'SMS', description: 'Receive text message notifications' },
    ],
  },
}

export const DisabledItems: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Available option' },
      { value: 'option2', label: 'Disabled option', disabled: true, description: 'This option is not available' },
      { value: 'option3', label: 'Another available option' },
    ],
  },
}

export const ErrorState: Story = {
  args: { items: plans, error: true },
}

export const Small: Story = {
  args: { items: plans, size: 'small' },
}

export const Large: Story = {
  args: { items: plans, size: 'large' },
}
