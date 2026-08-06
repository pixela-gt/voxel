import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Listbox from './Listbox.vue'

const meta: Meta<typeof Listbox> = {
  title: 'Surfaces/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid' },
]

const grouped = [
  { label: 'Frontend', items: [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }] },
  { label: 'Backend', items: [{ value: 'node', label: 'Node' }, { value: 'go', label: 'Go' }] },
]

const template = (args: any) => ({
  components: { Listbox },
  setup() {
    const value = ref(args.modelValue ?? 'vue')
    return { args, value }
  },
  template: '<Listbox v-bind="args" v-model="value" style="width:240px" />',
})

export const Default: Story = { args: { items }, render: template }
export const Preselected: Story = { args: { items, modelValue: 'react' }, render: template }
export const WithGroups: Story = { args: { items: grouped }, render: template }
export const Multiple: Story = {
  args: { items, multiple: true, modelValue: ['react', 'vue'] },
  render: () => ({
    components: { Listbox },
    setup() {
      const value = ref<string[]>(['react', 'vue'])
      return { value, items }
    },
    template: '<Listbox v-model="value" :items="items" multiple style="width:240px" />',
  }),
}
export const Disabled: Story = { args: { items, disabled: true }, render: template }
export const Small: Story = { args: { items, size: 'small' }, render: template }
export const Large: Story = { args: { items, size: 'large' }, render: template }
