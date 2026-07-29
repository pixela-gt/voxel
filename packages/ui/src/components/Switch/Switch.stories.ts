import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import Switch from './Switch.vue'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Switch },
  setup() {
    const value = ref(args.modelValue)
    return { args, value }
  },
  template: '<Switch v-bind="args" v-model="value" />',
})

export const Default: Story = { args: {}, render: template }
export const On: Story = { args: { modelValue: true }, render: template }
export const WithLabel: Story = { args: { label: 'Enable notifications' }, render: template }
export const OnWithLabel: Story = { args: { modelValue: true, label: 'Enabled' }, render: template }
export const Disabled: Story = { args: { disabled: true, label: 'Disabled' }, render: template }
export const Small: Story = { args: { size: 'small', label: 'Small' }, render: template }
export const Large: Story = { args: { size: 'large', label: 'Large' }, render: template }

export const Interactive: Story = {
  args: { label: 'Toggle me' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole('switch')
    await expect(sw).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(sw)
    await expect(sw).toHaveAttribute('data-state', 'checked')
  },
}
