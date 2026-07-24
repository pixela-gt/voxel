import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from 'storybook/test'
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

export const A11yHidden: Story = {
  args: { icon: Check },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const svg = canvas.getByRole('presentation', { hidden: true })
    await expect(svg).toHaveAttribute('aria-hidden', 'true')
  },
}
