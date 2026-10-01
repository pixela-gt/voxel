import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { SegmentedControl, SegmentedControlItem } from './index'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Action/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { SegmentedControl, SegmentedControlItem },
  setup() {
    const value = ref(args.modelValue ?? 'center')
    return { args, value }
  },
  template: `
    <SegmentedControl v-bind="args" v-model="value">
      <SegmentedControlItem value="left">Left</SegmentedControlItem>
      <SegmentedControlItem value="center">Center</SegmentedControlItem>
      <SegmentedControlItem value="right">Right</SegmentedControlItem>
    </SegmentedControl>
  `,
})

export const Default: Story = { args: { modelValue: 'center' }, render: template }
export const Small: Story = { args: { size: 'small' }, render: template }
export const Large: Story = { args: { size: 'large' }, render: template }
export const Disabled: Story = { args: { disabled: true }, render: template }

export const Controlled: Story = {
  render: () => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      const value = ref('day')
      return { value }
    },
    template: `
      <div>
        <SegmentedControl v-model="value">
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
          <SegmentedControlItem value="year">Year</SegmentedControlItem>
        </SegmentedControl>
        <p style="margin-top:12px;font-size:14px;color:var(--color-text-secondary)">Selected: {{ value }}</p>
      </div>
    `,
  }),
}

export const ViewportOptions: Story = {
  render: () => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      const value = ref('list')
      return { value }
    },
    template: `
      <SegmentedControl v-model="value">
        <SegmentedControlItem value="list">List</SegmentedControlItem>
        <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
        <SegmentedControlItem value="board">Board</SegmentedControlItem>
      </SegmentedControl>
    `,
  }),
}
