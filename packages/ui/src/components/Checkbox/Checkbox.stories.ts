import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import { Star } from '@lucide/vue'
import Checkbox from './Checkbox.vue'
import FormField from '../FormField/FormField.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Checkbox },
  setup() {
    const value = ref(args.modelValue ?? false)
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
export const WithCustomIcon: Story = {
  // Icon components must NOT travel via args (non-serializable across the
  // Storybook iframe transport) — bind them from module/setup scope instead,
  // exactly like Drawer/IconButton/Button stories do.
  // Star (not a check) makes it visually obvious the custom icon took effect.
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { checked, Star }
    },
    template: `<Checkbox v-model="checked" label="Custom icon" :icon="Star" />`,
  }),
}

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
    // Toggling from indeterminate checks it
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const WithError: Story = {
  args: { error: true, label: 'Accept terms' },
  render: template,
}

export const InsideFormField: Story = {
  render: () => ({
    components: { Checkbox, FormField },
    template: `
      <FormField label="Terms" error-message="You must accept the terms">
        <Checkbox label="I accept" />
      </FormField>
    `,
  }),
}

export const InsideFormFieldIndeterminate: Story = {
  render: () => ({
    components: { Checkbox, FormField },
    template: `
      <FormField label="Select items" error-message="Selection required">
        <Checkbox label="Select all" :indeterminate="true" />
      </FormField>
    `,
  }),
}

export const Interactive: Story = {
  args: { label: 'Click me' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    // Keyboard parity: Space toggles
    await userEvent.keyboard(' ')
    await expect(checkbox).not.toBeChecked()
  },
}
