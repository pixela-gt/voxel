import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import Radio from './Radio.vue'
import { RadioItem } from './index'

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Radio },
  setup() {
    const value = ref(args.modelValue ?? 'option1')
    return { args, value }
  },
  template: `
    <Radio v-bind="args" v-model="value" :items="[
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ]" />
  `,
})

const itemTemplate = (args: any) => ({
  components: { RadioItem },
  setup() {
    const value = ref(args.modelValue ?? 'a')
    return { args, value }
  },
  template: `
    <div style="display:flex;flex-direction:column;gap:8px">
      <RadioItem v-bind="args" value="a" label="Choice A" v-model="value" />
      <RadioItem value="b" label="Choice B" v-model="value" />
      <RadioItem value="c" label="Choice C" v-model="value" />
    </div>
  `,
})

export const Default: Story = { args: { modelValue: 'option1' }, render: template }
export const SecondSelected: Story = { args: { modelValue: 'option2' }, render: template }
export const Small: Story = { args: { size: 'small', modelValue: 'option1' }, render: template }
export const Large: Story = { args: { size: 'large', modelValue: 'option1' }, render: template }
export const Disabled: Story = { args: { disabled: true, modelValue: 'option1' }, render: template }
export const WithItems: Story = { args: { modelValue: 'a' }, render: itemTemplate }

export const Interactive: Story = {
  args: { modelValue: 'option1' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const opt2 = canvas.getByText('Option 2')
    await userEvent.click(opt2)
  },
}
