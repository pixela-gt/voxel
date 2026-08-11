import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Combobox from './Combobox.vue'

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
]

const groupedFruits = [
  {
    label: 'Citrus',
    items: [
      { value: 'orange', label: 'Orange' },
      { value: 'lemon', label: 'Lemon' },
      { value: 'lime', label: 'Lime' },
    ],
  },
  {
    label: 'Berries',
    items: [
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'raspberry', label: 'Raspberry' },
    ],
  },
]

const template = (args: any) => ({
  components: { Combobox },
  setup() {
    const value = ref(args.modelValue ?? '')
    return { args, value }
  },
  template: '<Combobox v-bind="args" v-model="value" style="width:280px" />',
})

export const Default: Story = {
  args: { items: fruits, modelValue: '', placeholder: 'Pick a fruit...' },
  render: template,
}
export const Preselected: Story = {
  args: { items: fruits, modelValue: 'apple' },
  render: template,
}
export const WithGroups: Story = {
  args: { items: groupedFruits, modelValue: '' },
  render: template,
}
export const Multiple: Story = {
  args: { items: fruits, modelValue: ['apple', 'cherry'], multiple: true },
  render: () => ({
    components: { Combobox },
    setup() {
      const value = ref<string[]>(['apple', 'cherry'])
      return { value, fruits }
    },
    template: '<Combobox v-model="value" :items="fruits" multiple style="width:280px" />',
  }),
}
export const Disabled: Story = { args: { items: fruits, disabled: true }, render: template }
export const Small: Story = { args: { items: fruits, size: 'small' }, render: template }
export const Large: Story = { args: { items: fruits, size: 'large' }, render: template }
