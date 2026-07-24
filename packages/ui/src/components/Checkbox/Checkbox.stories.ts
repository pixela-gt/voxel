import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import { Check } from '@lucide/vue'
import Checkbox from './Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
  components: { Checkbox },
  setup() {
    const value = ref(args.modelValue)
    return { args, value }
  },
  template: '<Checkbox v-bind="args" v-model="value" />',
})

export const Default: Story = { args: {}, render: template }
export const Checked: Story = { args: { modelValue: true }, render: template }
export const WithLabel: Story = { args: { label: 'Accept terms' }, render: template }
export const Disabled: Story = { args: { disabled: true, label: 'Disabled' }, render: template }
export const CheckedDisabled: Story = { args: { modelValue: true, disabled: true, label: 'Locked' }, render: template }
export const Small: Story = { args: { size: 'small', label: 'Small' }, render: template }
export const Large: Story = { args: { size: 'large', label: 'Large' }, render: template }
export const WithCustomIcon: Story = { args: { icon: Check, label: 'Custom icon' }, render: template }

export const Interactive: Story = {
  args: { label: 'Click me' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}
