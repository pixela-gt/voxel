import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import ColorSwatchPicker from './ColorSwatchPicker.vue'

const meta: Meta<typeof ColorSwatchPicker> = {
  title: 'Color/ColorSwatchPicker',
  component: ColorSwatchPicker,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    colors: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const colors = ['#3450e8', '#10b981', '#f59e0b', '#ef4444']

const template = (args: any) => {
  const value = ref<string | string[]>(args.modelValue ?? (args.multiple ? [] : colors[0]))
  return {
    components: { ColorSwatchPicker },
    setup: () => ({ args, value }),
    template: `<ColorSwatchPicker v-bind="args" v-model="value" />`,
  }
}

export const Default: Story = {
  args: { colors, modelValue: '#3450e8' },
  render: template,
}
export const Multiple: Story = {
  args: { colors, modelValue: ['#3450e8', '#10b981'], multiple: true },
  render: template,
}
export const Disabled: Story = {
  args: { colors, modelValue: '#3450e8', disabled: true },
  render: template,
}