import type { Meta, StoryObj } from '@storybook/vue3-vite'
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
    open: { control: 'boolean' },
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

export const Default: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }}</p>
        <Select v-model="value" :items="fruits" placeholder="Pick a fruit" style="width:200px" />
      </div>
    `,
  }),
}

export const Preselected: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('banana')
      return { value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value }}</p>
        <Select v-model="value" :items="fruits" style="width:200px" />
      </div>
    `,
  }),
}

export const WithGroups: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, groupedFruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }}</p>
        <Select v-model="value" :items="groupedFruits" placeholder="Pick a fruit" style="width:200px" />
      </div>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref<string[]>(['apple'])
      return { value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value }}</p>
        <Select v-model="value" :items="fruits" multiple placeholder="Pick fruits" style="width:200px" />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('apple')
      return { value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value }}</p>
        <Select v-model="value" :items="fruits" disabled style="width:200px" />
      </div>
    `,
  }),
}

export const Small: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }}</p>
        <Select v-model="value" :items="fruits" size="small" placeholder="Pick a fruit" style="width:200px" />
      </div>
    `,
  }),
}

export const Large: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }}</p>
        <Select v-model="value" :items="fruits" size="large" placeholder="Pick a fruit" style="width:200px" />
      </div>
    `,
  }),
}

// VeeValidate compatibility: using value prop instead of modelValue
export const WithValueProp: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('apple')
      return { value, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value }}</p>
        <Select :value="value" @change="(v) => value = v" :items="fruits" placeholder="Pick a fruit" style="width:200px" />
      </div>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      const isOpen = ref(false)
      return { value, isOpen, fruits }
    },
    template: `
      <div>
        <p style="margin-bottom: 8px; font-size: 14px;">Selected: {{ value || '(none)' }}</p>
        <p style="margin-bottom: 8px; font-size: 14px;">Open: {{ isOpen }}</p>
        <Select
          v-model="value"
          v-model:open="isOpen"
          :items="fruits"
          placeholder="Pick a fruit"
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
