import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import { Search, X } from '@lucide/vue'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'date', 'search', 'tel', 'url'] },
    density: { control: 'select', options: ['default', 'dense'] },
    variant: { control: 'select', options: ['outlined', 'underlined', 'ghost'] },
    focusEffect: { control: 'select', options: ['border', 'elevation', 'glow'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Input },
  setup() {
    const value = ref(args.modelValue ?? '')
    return { args, value }
  },
  template: '<Input v-bind="args" v-model="value" />',
})

export const Default: Story = { args: { placeholder: 'Enter text' }, render: template }
export const WithValue: Story = { args: { modelValue: 'hello@example.com' }, render: template }
export const Password: Story = { args: { type: 'password', placeholder: 'Password' }, render: template }
export const Number: Story = { args: { type: 'number', placeholder: '0' }, render: template }
export const Date: Story = { args: { type: 'date' }, render: template }

export const Underlined: Story = {
  args: { variant: 'underlined', placeholder: 'Underlined' },
  render: template,
}
export const Dense: Story = {
  args: { density: 'dense', placeholder: 'Dense' },
  render: template,
}
export const DenseUnderlined: Story = {
  args: { density: 'dense', variant: 'underlined', placeholder: 'Dense + underlined' },
  render: template,
}

export const WithError: Story = {
  args: { errorMessage: 'This field is required', placeholder: 'Error state' },
  render: template,
}

export const Disabled: Story = {
  args: { disabled: true, modelValue: 'Disabled', placeholder: 'Disabled' },
  render: template,
}

export const WithPrepend: Story = {
  args: { placeholder: 'Search' },
  render: () => ({
    components: { Input, Search },
    setup() { const value = ref(''); return { value, Search } },
    template: '<Input v-model="value" placeholder="Search"><template #prepend><Search :size="20" /></template></Input>',
  }),
}

export const WithAppend: Story = {
  args: { placeholder: 'Type to clear' },
  render: () => ({
    components: { Input, X },
    setup() { const value = ref('clear me'); return { value, X, clear: () => { value.value = '' } } },
    template: '<Input v-model="value" placeholder="Type to clear"><template #append><button @click="clear" aria-label="Clear"><X :size="20" /></button></template></Input>',
  }),
}

export const WithPrependAndAppend: Story = {
  render: () => ({
    components: { Input, Search, X },
    setup() { const value = ref(''); return { value, Search, X } },
    template: '<Input v-model="value" placeholder="Search"><template #prepend><Search :size="20" /></template><template #append><X :size="20" /></template></Input>',
  }),
}

export const Interactive: Story = {
  args: { placeholder: 'Type here' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Type here')
    await expect(input).toBeInTheDocument()
    await userEvent.type(input, 'hello world')
    await expect(input).toHaveValue('hello world')
  },
}

export const Ghost: Story = {
  args: { variant: 'ghost', placeholder: 'Ghost variant' },
  render: template,
}

export const FocusBorder: Story = {
  args: { focusEffect: 'border', placeholder: 'Focus border' },
  render: template,
}

export const FocusElevation: Story = {
  args: { focusEffect: 'elevation', placeholder: 'Focus elevation' },
  render: template,
}

export const FocusGlow: Story = {
  args: { focusEffect: 'glow', placeholder: 'Focus glow' },
  render: template,
}
