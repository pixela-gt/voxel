import type { Meta, StoryObj } from '@storybook/vue3'
import ScrollArea from './ScrollArea.vue'

const meta: Meta<typeof ScrollArea> = {
  title: 'Surfaces/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['auto', 'always', 'scroll', 'hover'] },
    scrollHideDelay: { control: { type: 'number', min: 0 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const longContent = (args: any) => ({
  components: { ScrollArea },
  setup() { return { args } },
  template: `
    <ScrollArea v-bind="args" style="width:300px;height:200px;border:1px solid var(--color-grey-200);border-radius:8px;padding:12px">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div v-for="i in 30" :key="i" style="padding:8px;background:var(--color-grey-50);border-radius:6px;font-size:13px">Item {{ i }}</div>
      </div>
    </ScrollArea>
  `,
})

export const Default: Story = { args: { type: 'hover' }, render: longContent }
export const AlwaysVisible: Story = { args: { type: 'always' }, render: longContent }
export const Auto: Story = { args: { type: 'auto' }, render: longContent }
