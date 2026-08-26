import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { ToggleGroup, ToggleGroupItem } from './index'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Action/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    type: { control: 'select', options: ['single', 'multiple'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const singleTemplate = (args: any) => ({
  components: { ToggleGroup, ToggleGroupItem },
  setup() {
    const value = ref(args.modelValue ?? 'center')
    return { args, value }
  },
  template: `
    <ToggleGroup v-bind="args" v-model="value">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  `,
})

const multipleTemplate = (args: any) => ({
  components: { ToggleGroup, ToggleGroupItem },
  setup() {
    const value = ref<string[]>(args.modelValue ?? ['bold'])
    return { args, value }
  },
  template: `
    <ToggleGroup v-bind="args" v-model="value" type="multiple">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  `,
})

export const Default: Story = { args: { type: 'single', modelValue: 'center' }, render: singleTemplate }
export const Multiple: Story = { args: { type: 'multiple', modelValue: ['bold'] }, render: multipleTemplate }
export const Vertical: Story = {
  args: { type: 'single', orientation: 'vertical' },
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup() {
      const value = ref('top')
      return { value }
    },
    template: `
      <ToggleGroup v-model="value" type="single" orientation="vertical">
        <ToggleGroupItem value="top">Top</ToggleGroupItem>
        <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
        <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}
export const Small: Story = { args: { type: 'single', size: 'small' }, render: singleTemplate }
export const Large: Story = { args: { type: 'single', size: 'large' }, render: singleTemplate }
export const Disabled: Story = { args: { type: 'single', disabled: true }, render: singleTemplate }
