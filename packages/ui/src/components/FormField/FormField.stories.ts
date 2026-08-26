import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { FormField } from './index'
import { Input } from '../Input'
import { Textarea } from '../Textarea'
import { Select } from '../Select'

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    required: { control: 'boolean' },
    density: { control: 'select', options: ['default', 'dense'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithInput: Story = {
  args: { label: 'Email', hint: 'We will never share it' },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref(''); return { args, value } },
    template: '<FormField v-bind="args"><Input v-model="value" type="email" /></FormField>',
  }),
}

export const Required: Story = {
  args: { label: 'Password', required: true },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref(''); return { args, value } },
    template: '<FormField v-bind="args"><Input v-model="value" type="password" /></FormField>',
  }),
}

export const WithError: Story = {
  args: { label: 'Email', errorMessage: 'Email is required' },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref(''); return { args, value } },
    template: '<FormField v-bind="args"><Input v-model="value" type="email" /></FormField>',
  }),
}

export const WithHintAndError: Story = {
  args: { label: 'Username', hint: 'Letters and numbers only', errorMessage: 'Already taken' },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref('admin'); return { args, value } },
    template: '<FormField v-bind="args"><Input v-model="value" /></FormField>',
  }),
}

export const WithTextarea: Story = {
  args: { label: 'Bio', hint: 'A short description' },
  render: (args) => ({
    components: { FormField, Textarea },
    setup() { const value = ref(''); return { args, value } },
    template: '<FormField v-bind="args"><Textarea v-model="value" :rows="3" /></FormField>',
  }),
}

export const WithSelect: Story = {
  args: { label: 'Country' },
  render: (args) => ({
    components: { FormField, Select },
    setup() { const value = ref(''); return { args, value } },
    template: `
      <FormField v-bind="args">
        <Select v-model="value" placeholder="Select a country" :items="[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'jp', label: 'Japan' }
        ]" />
      </FormField>
    `,
  }),
}

export const CustomId: Story = {
  args: { label: 'Custom id', id: 'my-email' },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref(''); return { args, value } },
    template: '<FormField v-bind="args"><Input v-model="value" /></FormField>',
  }),
}

export const Dense: Story = {
  args: { label: 'Dense form field', hint: 'Smaller label and hint', density: 'dense' },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref(''); return { args, value } },
    template: '<FormField v-bind="args"><Input v-model="value" density="dense" /></FormField>',
  }),
}

export const DenseWithError: Story = {
  args: { label: 'Dense error', density: 'dense', errorMessage: 'Required' },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref(''); return { args, value } },
    template: '<FormField v-bind="args"><Input v-model="value" density="dense" /></FormField>',
  }),
}

export const WithCustomHint: Story = {
  args: { label: 'Tags' },
  render: (args) => ({
    components: { FormField, Input },
    setup() { const value = ref(''); return { args, value } },
    template: `
      <FormField v-bind="args">
        <Input v-model="value" />
        <template #hint>
          <span style="font-size: 11px;">{{ value.length }} / 50 characters</span>
        </template>
      </FormField>
    `,
  }),
}
