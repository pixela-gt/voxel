import type { Meta, StoryObj } from '@storybook/vue3'
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from './index'

const meta: Meta<typeof SplitterGroup> = {
  title: 'Surfaces/Splitter',
  component: SplitterGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    keyboardResizeBy: { control: { type: 'number' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { SplitterGroup, SplitterPanel, SplitterResizeHandle },
  setup() { return { args } },
  template: `
    <SplitterGroup v-bind="args" style="height:200px;width:100%;border:1px solid var(--color-grey-200);border-radius:8px;overflow:hidden">
      <SplitterPanel :default-size="40" style="padding:12px;background:var(--color-grey-50)">
        <p style="margin:0;font-size:13px">Left panel (40%)</p>
      </SplitterPanel>
      <SplitterResizeHandle />
      <SplitterPanel style="padding:12px">
        <p style="margin:0;font-size:13px">Right panel (60%)</p>
      </SplitterPanel>
    </SplitterGroup>
  `,
})

export const Horizontal: Story = { args: { direction: 'horizontal' }, render: template }
export const Vertical: Story = {
  args: { direction: 'vertical' },
  render: () => ({
    components: { SplitterGroup, SplitterPanel, SplitterResizeHandle },
    template: `
      <SplitterGroup direction="vertical" style="height:300px;width:300px;border:1px solid var(--color-grey-200);border-radius:8px;overflow:hidden">
        <SplitterPanel :default-size="30" style="padding:12px;background:var(--color-grey-50)">
          <p style="margin:0;font-size:13px">Top</p>
        </SplitterPanel>
        <SplitterResizeHandle />
        <SplitterPanel style="padding:12px">
          <p style="margin:0;font-size:13px">Bottom</p>
        </SplitterPanel>
      </SplitterGroup>
    `,
  }),
}
export const ThreePanels: Story = {
  args: { direction: 'horizontal' },
  render: () => ({
    components: { SplitterGroup, SplitterPanel, SplitterResizeHandle },
    template: `
      <SplitterGroup direction="horizontal" style="height:200px;width:100%;border:1px solid var(--color-grey-200);border-radius:8px;overflow:hidden">
        <SplitterPanel :default-size="25" style="padding:12px;background:var(--color-grey-50)">
          <p style="margin:0;font-size:13px">Nav (25%)</p>
        </SplitterPanel>
        <SplitterResizeHandle />
        <SplitterPanel :default-size="50" style="padding:12px">
          <p style="margin:0;font-size:13px">Main (50%)</p>
        </SplitterPanel>
        <SplitterResizeHandle />
        <SplitterPanel style="padding:12px;background:var(--color-grey-50)">
          <p style="margin:0;font-size:13px">Aside</p>
        </SplitterPanel>
      </SplitterGroup>
    `,
  }),
}
