import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import MaskedInput from './MaskedInput.vue'
import { FormField } from '../FormField'

const meta: Meta<typeof MaskedInput> = {
  title: 'Forms/MaskedInput',
  component: MaskedInput,
  tags: ['autodocs'],
  argTypes: {
    mask: { control: 'text' },
    type: { control: 'select', options: ['text', 'tel', 'number'] },
    density: { control: 'select', options: ['default', 'dense'] },
    variant: { control: 'select', options: ['outlined', 'underlined', 'ghost'] },
    focusEffect: { control: 'select', options: ['border', 'elevation', 'glow'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { MaskedInput },
  setup() {
    const value = ref(args.modelValue ?? '')
    return { args, value }
  },
  template: '<MaskedInput v-bind="args" v-model="value" />',
})

export const PhoneUS: Story = {
  args: { mask: '(###) ###-####', placeholder: '(555) 123-4567' },
  render: template,
}

export const SSN: Story = {
  args: { mask: '###-##-####', placeholder: '123-45-6789' },
  render: template,
}

export const Date: Story = {
  args: { mask: '##/##/####', placeholder: 'MM/DD/YYYY' },
  render: template,
}

export const Letters: Story = {
  args: { mask: 'AAA-AAA', placeholder: 'ABC-XYZ' },
  render: template,
}

export const Alphanumeric: Story = {
  args: { mask: '****-****', placeholder: 'A1B2-C3D4' },
  render: template,
}

export const Underlined: Story = {
  args: { mask: '(###) ###-####', variant: 'underlined' },
  render: template,
}

export const Dense: Story = {
  args: { mask: '(###) ###-####', density: 'dense' },
  render: template,
}

export const Disabled: Story = {
  args: { mask: '(###) ###-####', disabled: true, modelValue: '5551234567' },
  render: template,
}

export const WithError: Story = {
  args: { mask: '(###) ###-####', errorMessage: 'Invalid phone number' },
  render: template,
}

export const InFormField: Story = {
  args: { mask: '(###) ###-####' },
  render: (args) => ({
    components: { FormField, MaskedInput },
    setup() { const value = ref(''); return { args, value } },
    template: `
      <FormField label="Phone" hint="US format" required>
        <MaskedInput v-bind="args" v-model="value" />
      </FormField>
    `,
  }),
}

export const Interactive: Story = {
  args: { mask: '(###) ###-####', placeholder: 'Type digits' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Type digits')
    await userEvent.type(input, '5551234567')
    await expect(input).toHaveValue('(555) 123-4567')
  },
}

export const Ghost: Story = {
  args: { mask: '(###) ###-####', variant: 'ghost', placeholder: '(555) 123-4567' },
  render: template,
}
