import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Editable from './Editable.vue'

const meta: Meta<typeof Editable> = {
  title: 'Forms/Editable',
  component: Editable,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    submitMode: { control: 'select', options: ['blur', 'enter', 'both', 'none'] },
    activationMode: { control: 'select', options: ['focus', 'dblclick', 'none'] },
    selectOnFocus: { control: 'boolean' },
    startWithEditMode: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Editable },
  setup() {
    const value = ref(args.modelValue ?? args.defaultValue ?? 'Click to edit')
    return { args, value }
  },
  template: '<Editable v-bind="args" v-model="value" style="min-width:280px" />',
})

export const Default: Story = { args: { defaultValue: 'Click to edit' }, render: template }
export const Empty: Story = { args: { placeholder: 'Enter your name' }, render: template }
export const Disabled: Story = { args: { defaultValue: 'Locked value', disabled: true }, render: template }
export const DblClickToEdit: Story = {
  args: { defaultValue: 'Double-click me', activationMode: 'dblclick' },
  render: template,
}
export const SelectOnFocus: Story = {
  args: { defaultValue: 'Selected on focus', selectOnFocus: true },
  render: template,
}
export const Small: Story = { args: { defaultValue: 'Small', size: 'small' }, render: template }
export const Large: Story = { args: { defaultValue: 'Large', size: 'large' }, render: template }
