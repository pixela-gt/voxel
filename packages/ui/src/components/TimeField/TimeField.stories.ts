import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Time } from '@internationalized/date'
import type { TimeValue } from 'reka-ui'
import { ref } from 'vue'
import TimeField from './TimeField.vue'

const meta: Meta<typeof TimeField> = {
  title: 'Components/TimeField',
  component: TimeField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { TimeField },
  setup() {
    const value = ref<TimeValue | null>(args.modelValue ?? null)
    return { args, value }
  },
  template: '<TimeField v-bind="args" v-model="value" />',
})

const t = (h: number, m: number) => new Time(h, m, 0)

export const Default: Story = {
  args: { modelValue: t(14, 30) },
  render: template,
}
export const Empty: Story = { args: {}, render: template }
export const Disabled: Story = {
  args: { modelValue: t(14, 30), disabled: true },
  render: template,
}
export const Readonly: Story = {
  args: { modelValue: t(14, 30), readonly: true },
  render: template,
}
