import type { Meta, StoryObj } from '@storybook/vue3'
import { CalendarDate } from '@internationalized/date'
import type { DateValue } from 'reka-ui'
import { ref } from 'vue'
import DateField from './DateField.vue'

const meta: Meta<typeof DateField> = {
  title: 'Components/DateField',
  component: DateField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { DateField },
  setup() {
    const value = ref<DateValue | null>(args.modelValue ?? null)
    return { args, value }
  },
  template: '<DateField v-bind="args" v-model="value" />',
})

const d = (y: number, m: number, day: number) => new CalendarDate(y, m, day)

export const Default: Story = {
  args: { modelValue: d(2025, 5, 15) },
  render: template,
}
export const Empty: Story = { args: {}, render: template }
export const Disabled: Story = {
  args: { modelValue: d(2025, 5, 15), disabled: true },
  render: template,
}
export const Readonly: Story = {
  args: { modelValue: d(2025, 5, 15), readonly: true },
  render: template,
}
