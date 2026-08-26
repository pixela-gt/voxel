import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorSlider from './ColorSlider.vue'

const meta: Meta<typeof ColorSlider> = {
  title: 'Color/ColorSlider',
  component: ColorSlider,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { channel: 'hue' } }
export const Disabled: Story = { args: { channel: 'hue', disabled: true } }