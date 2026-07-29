import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Select from './Select.vue'

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
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
]

const groupedFruits = [
  { label: 'Citrus', items: [{ value: 'orange', label: 'Orange' }, { value: 'lemon', label: 'Lemon' }] },
  { label: 'Berries', items: [{ value: 'strawberry', label: 'Strawberry' }, { value: 'blueberry', label: 'Blueberry' }] },
]

const template = (args: any) => ({
  components: { Select },
  setup() {
    const value = ref(args.modelValue ?? '')
    return { args, value }
  },
  template: '<Select v-bind="args" v-model="value" style="width:200px" />',
})

export const Default: Story = { args: { items: fruits, placeholder: 'Pick a fruit' }, render: template }
export const Preselected: Story = { args: { items: fruits, modelValue: 'banana' }, render: template }
export const WithGroups: Story = { args: { items: groupedFruits }, render: template }
export const Multiple: Story = {
  args: { items: fruits, multiple: true, modelValue: ['apple'] },
  render: () => ({
    components: { Select },
    setup() {
      const value = ref<string[]>(['apple'])
      return { value, fruits }
    },
    template: '<Select v-model="value" :items="fruits" multiple style="width:200px" />',
  }),
}
export const Disabled: Story = { args: { items: fruits, disabled: true }, render: template }
export const Small: Story = { args: { items: fruits, size: 'small' }, render: template }
export const Large: Story = { args: { items: fruits, size: 'large' }, render: template }
