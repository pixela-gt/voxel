import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import Textarea from './Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
    variant: { control: 'select', options: ['outlined', 'underlined', 'ghost'] },
    focusEffect: { control: 'select', options: ['border', 'elevation', 'glow'] },
    errorMessage: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Textarea },
  setup() {
    const value = ref(args.modelValue ?? '')
    return { args, value }
  },
  template: '<Textarea v-bind="args" v-model="value" />',
})

export const Default: Story = { args: { placeholder: 'Tell us about yourself' }, render: template }
export const WithValue: Story = { args: { modelValue: 'Some longer text\nspans multiple lines\nand keeps going.', rows: 5 }, render: template }
export const CustomRows: Story = { args: { rows: 8, placeholder: '8 rows' }, render: template }
export const WithError: Story = { args: { errorMessage: 'Required', placeholder: 'Bio' }, render: template }
export const Disabled: Story = { args: { disabled: true, modelValue: 'Cannot edit', placeholder: 'Disabled' }, render: template }

export const Interactive: Story = {
  args: { placeholder: 'Type here' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const ta = canvas.getByPlaceholderText('Type here')
    await userEvent.type(ta, 'Multi-line input test')
    await expect(ta).toHaveValue('Multi-line input test')
  },
}

export const Ghost: Story = {
  args: { variant: 'ghost', placeholder: 'Ghost textarea' },
  render: template,
}

export const Underlined: Story = {
  args: { variant: 'underlined', placeholder: 'Underlined textarea' },
  render: template,
}
