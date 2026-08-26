import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColorSwatch from './ColorSwatch.vue'

const meta: Meta<typeof ColorSwatch> = {
  title: 'Color/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'color' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { value: '#3450e8' } }
export const Disabled: Story = { args: { value: '#3450e8', disabled: true } }