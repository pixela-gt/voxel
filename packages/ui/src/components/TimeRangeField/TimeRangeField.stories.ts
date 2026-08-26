import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Time } from '@internationalized/date'
import { ref } from 'vue'
import type { TimeRangeValue } from './TimeRangeField.types'
import TimeRangeField from './TimeRangeField.vue'

const meta: Meta<typeof TimeRangeField> = {
  title: 'Components/TimeRangeField',
  component: TimeRangeField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { TimeRangeField },
  setup() {
    const value = ref<TimeRangeValue | null>(args.modelValue ?? null)
    return { args, value }
  },
  template: '<TimeRangeField v-bind="args" v-model="value" />',
})

const t = (h: number, m: number) => new Time(h, m, 0)

export const Default: Story = {
  args: { modelValue: { start: t(9, 0), end: t(17, 30) } },
  render: template,
}
export const Empty: Story = { args: {}, render: template }
export const Disabled: Story = {
  args: { modelValue: { start: t(9, 0), end: t(17, 30) }, disabled: true },
  render: template,
}
export const Readonly: Story = {
  args: { modelValue: { start: t(9, 0), end: t(17, 30) }, readonly: true },
  render: template,
}
