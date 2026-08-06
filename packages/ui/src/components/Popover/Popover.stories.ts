import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import Popover from './Popover.vue'

const meta: Meta<typeof Popover> = {
  title: 'Action/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Popover },
  setup() { return { args } },
  template: `
    <Popover v-bind="args">
      <template #trigger>
        <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Open popover</button>
      </template>
      <div>
        <p style="margin:0 0 8px;font-size:14px;font-weight:500">Popover content</p>
        <p style="margin:0;font-size:13px;color:var(--color-text-secondary)">Use this slot for body content.</p>
      </div>
    </Popover>
  `,
})

export const Default: Story = { render: template }
export const Open: Story = { args: { defaultOpen: true }, render: template }
export const Modal: Story = { args: { modal: true }, render: template }

export const Interactive: Story = {
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }))
    await expect(await within(document.body).findByText('Popover content')).toBeInTheDocument()
  },
}
