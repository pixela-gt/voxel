import type { Meta, StoryObj } from '@storybook/vue3'
import { Check, X as XIcon, ArrowRight } from '@lucide/vue'
import Icon from './Icon.vue'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = { args: { icon: Check, size: 'small' } }
export const Default: Story = { args: { icon: Check, size: 'default' } }
export const Large: Story = { args: { icon: Check, size: 'large' } }

export const X: Story = { args: { icon: XIcon } }
export const ArrowRightIcon: Story = { args: { icon: ArrowRight } }
