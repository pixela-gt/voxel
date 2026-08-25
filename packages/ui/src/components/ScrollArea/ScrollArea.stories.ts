import type { Meta, StoryObj } from '@storybook/vue3-vite'
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

// Shared sample content styled with documented tokens (no inline grey vars)
const frame = `width:300px;height:200px;border:1px solid var(--color-surface-light);border-radius:8px;padding:12px`
const item = `padding:8px;background:var(--color-surface-background);border-radius:6px;font-size:13px`

const longContent = (args: any) => ({
  components: { ScrollArea },
  setup() { return { args, frame, item } },
  template: `
    <ScrollArea v-bind="args" :style="frame">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div v-for="i in 30" :key="i" :style="item">Item {{ i }}</div>
      </div>
    </ScrollArea>
  `,
})

export const Default: Story = { args: { type: 'hover' }, render: longContent }
export const AlwaysVisible: Story = { args: { type: 'always' }, render: longContent }
export const Auto: Story = { args: { type: 'auto' }, render: longContent }

export const Horizontal: Story = {
  args: { type: 'always' },
  render: () => ({
    components: { ScrollArea },
    template: `
      <ScrollArea type="always" style="width:300px;height:120px;border:1px solid var(--color-surface-light);border-radius:8px;padding:12px">
        <div style="display:flex;gap:8px;width:max-content">
          <div v-for="i in 20" :key="i" style="flex-shrink:0;width:90px;padding:8px;background:var(--color-surface-background);border-radius:6px;font-size:13px">Col {{ i }}</div>
        </div>
      </ScrollArea>
    `,
  }),
}

// Demonstrates the required sizing pattern: the area's root is w-full h-full,
// so it must live inside a sized parent with a min-h-0 flex chain.
export const SizingPattern: Story = {
  args: { type: 'hover' },
  render: () => ({
    components: { ScrollArea },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;height:360px;border:1px dashed var(--color-grey-300);border-radius:8px;padding:12px">
        <p style="margin:0;font-size:13px;font-weight:600">Sized parent (h-360), flex column</p>
        <div style="flex:1;min-height:0">
          <ScrollArea type="hover" style="height:100%;border:1px solid var(--color-surface-light);border-radius:8px;padding:12px">
            <div style="display:flex;flex-direction:column;gap:8px">
              <div v-for="i in 40" :key="i" style="padding:8px;background:var(--color-surface-background);border-radius:6px;font-size:13px">Row {{ i }}</div>
            </div>
          </ScrollArea>
        </div>
      </div>
    `,
  }),
}
