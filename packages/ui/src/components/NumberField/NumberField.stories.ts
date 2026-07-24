import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NumberField from './NumberField.vue'

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { NumberField },
  setup() {
    const value = ref(args.modelValue ?? 0)
    return { args, value }
  },
  template: '<NumberField v-bind="args" v-model="value" />',
})

export const Default: Story = { args: { modelValue: 0 }, render: template }
export const WithValue: Story = { args: { modelValue: 42 }, render: template }
export const MinMax: Story = { args: { modelValue: 5, min: 0, max: 10 }, render: template }
export const StepFive: Story = { args: { modelValue: 0, step: 5, min: 0, max: 100 }, render: template }
export const Disabled: Story = { args: { modelValue: 10, disabled: true }, render: template }
export const Small: Story = { args: { modelValue: 0, size: 'small' }, render: template }
export const Large: Story = { args: { modelValue: 0, size: 'large' }, render: template }
