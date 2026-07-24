import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import Collapsible from './Collapsible.vue'

const meta: Meta<typeof Collapsible> = {
  title: 'Surfaces/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Collapsible },
  setup() { return { args } },
  template: `
    <Collapsible v-bind="args" style="width:300px">
      <template #trigger>
        <span>Toggle details</span>
      </template>
      <div style="padding:8px 0;font-size:13px;color:var(--color-text-secondary)">
        Hidden content revealed when expanded. Useful for show/hide sections.
      </div>
    </Collapsible>
  `,
})

export const Default: Story = { render: template }
export const Open: Story = { args: { defaultOpen: true }, render: template }
export const Disabled: Story = { args: { disabled: true }, render: template }
export const Interactive: Story = {
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('Toggle details')
    await userEvent.click(trigger)
    await expect(canvas.getByText(/Hidden content/)).toBeVisible()
  },
}
