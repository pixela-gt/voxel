import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Slider from './Slider.vue'

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    inverted: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const singleTemplate = (args: any) => ({
  components: { Slider },
  setup() {
    const value = ref(args.modelValue ?? [30])
    return { args, value }
  },
  template: '<Slider v-bind="args" v-model="value" style="width:300px" />',
})

const rangeTemplate = (args: any) => ({
  components: { Slider },
  setup() {
    const value = ref(args.modelValue ?? [20, 80])
    return { args, value }
  },
  template: '<Slider v-bind="args" v-model="value" style="width:300px" />',
})

export const Default: Story = { args: { modelValue: [30] }, render: singleTemplate }
export const Range: Story = { args: { modelValue: [20, 80] }, render: rangeTemplate }
export const MinMax: Story = { args: { modelValue: [5], min: 0, max: 10, step: 1 }, render: singleTemplate }
export const Step10: Story = { args: { modelValue: [50], step: 10 }, render: singleTemplate }
export const Disabled: Story = { args: { modelValue: [40], disabled: true }, render: singleTemplate }
export const Inverted: Story = { args: { modelValue: [70], inverted: true }, render: singleTemplate }
export const Vertical: Story = {
  args: { modelValue: [30], orientation: 'vertical' },
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([30])
      return { value }
    },
    template: '<Slider v-model="value" orientation="vertical" style="height:200px" />',
  }),
}
