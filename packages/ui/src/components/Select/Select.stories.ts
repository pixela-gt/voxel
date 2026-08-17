import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Select from './Select.vue'

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    defaultValue: { control: 'text' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
    name: { control: 'text' },
    defaultOpen: { control: 'boolean' },
    // not wired in the component (dead props) — hide to avoid misleading controls
    value: { table: { disable: true } },
    open: { table: { disable: true } },
    variant: { table: { disable: true } },
    density: { table: { disable: true } },
    focusEffect: { table: { disable: true } },
    errorMessage: { table: { disable: true } },
    items: { table: { disable: true } },
    class: { table: { disable: true } },
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
    return { args, value, fruits }
  },
  template: `
    <div>
      <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }}</p>
      <Select v-bind="args" v-model="value" :items="fruits" placeholder="Pick a fruit" style="width:200px" />
    </div>
  `,
})

export const Default: Story = { args: {}, render: template }
export const Preselected: Story = { args: { modelValue: 'banana' }, render: template }
export const Disabled: Story = { args: { disabled: true, modelValue: 'apple' }, render: template }
export const Small: Story = { args: { size: 'small' }, render: template }
export const Large: Story = { args: { size: 'large' }, render: template }

export const Multiple: Story = {
  args: { multiple: true, modelValue: ['apple'] },
  render: (args: any) => ({
    components: { Select },
    setup() {
      const value = ref<string[]>(args.modelValue ?? [])
      return { args, value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value }}</p>
        <Select v-bind="args" v-model="value" :items="fruits" placeholder="Pick fruits" style="width:200px" />
      </div>
    `,
  }),
}

export const WithGroups: Story = {
  args: {},
  render: (args: any) => ({
    components: { Select },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value, groupedFruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }}</p>
        <Select v-bind="args" v-model="value" :items="groupedFruits" placeholder="Pick a fruit" style="width:200px" />
      </div>
    `,
  }),
}

export const Uncontrolled: Story = {
  args: { defaultValue: 'banana', placeholder: 'Pick a fruit' },
  render: (args: any) => ({
    components: { Select },
    setup() {
      return { args, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">No v-model — value is managed internally (defaultValue).</p>
        <Select v-bind="args" :items="fruits" style="width:200px" />
      </div>
    `,
  }),
}

export const UncontrolledOpen: Story = {
  args: { defaultOpen: true, placeholder: 'Pick a fruit' },
  render: (args: any) => ({
    components: { Select },
    setup() {
      return { args, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">No v-model:open — open state is managed internally (defaultOpen).</p>
        <Select v-bind="args" :items="fruits" style="width:200px" />
      </div>
    `,
  }),
}

export const Controlled: Story = {
  args: { placeholder: 'Pick a fruit' },
  render: (args: any) => ({
    components: { Select },
    setup() {
      const value = ref('')
      const isOpen = ref(false)
      return { args, value, isOpen, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }} | Open: {{ isOpen }}</p>
        <Select
          v-bind="args"
          v-model="value"
          v-model:open="isOpen"
          :items="fruits"
          style="width:200px"
        />
        <button
          @click="isOpen = !isOpen"
          style="margin-top: 8px; padding: 4px 8px; cursor: pointer;"
        >
          Toggle Open
        </button>
      </div>
    `,
  }),
}
