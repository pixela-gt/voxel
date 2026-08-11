import type { Meta, StoryObj } from '@storybook/vue3'
import { CalendarDate } from '@internationalized/date'
import type { DateRange } from 'reka-ui'
import { ref } from 'vue'
import DateRangeField from './DateRangeField.vue'

const meta: Meta<typeof DateRangeField> = {
  title: 'Components/DateRangeField',
  component: DateRangeField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { DateRangeField },
  setup() {
    const value = ref<DateRange | null>(args.modelValue ?? null)
    return { args, value }
  },
  template: '<DateRangeField v-bind="args" v-model="value" />',
})

const d = (y: number, m: number, day: number) => new CalendarDate(y, m, day)

export const Default: Story = {
  args: { modelValue: { start: d(2025, 5, 10), end: d(2025, 5, 15) } },
  render: template,
}
export const Empty: Story = { args: {}, render: template }
export const Disabled: Story = {
  args: { modelValue: { start: d(2025, 5, 10), end: d(2025, 5, 15) }, disabled: true },
  render: template,
}
export const Readonly: Story = {
  args: { modelValue: { start: d(2025, 5, 10), end: d(2025, 5, 15) }, readonly: true },
  render: template,
}
