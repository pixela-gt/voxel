import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import PinInput from './PinInput.vue'

const meta: Meta<typeof PinInput> = {
  title: 'Forms/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    length: { control: { type: 'number', min: 1, max: 10 } },
    type: { control: 'select', options: ['text', 'number'] },
    mask: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { PinInput },
  setup() {
    const value = ref<string[]>(args.modelValue ?? [])
    return { args, value }
  },
  template: '<PinInput v-bind="args" v-model="value" />',
})

export const Default: Story = { args: { length: 4, modelValue: ['', '', '', ''] }, render: template }
export const Length6: Story = { args: { length: 6 }, render: template }
export const Number: Story = { args: { type: 'number', length: 4 }, render: template }
export const Masked: Story = { args: { length: 4, mask: true }, render: template }
export const Disabled: Story = { args: { length: 4, disabled: true, modelValue: ['1', '2', '3', '4'] }, render: template }
export const WithPlaceholder: Story = { args: { length: 4, placeholder: '○' }, render: template }
