import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { expect, userEvent, within } from 'storybook/test'
import Popover from './Popover.vue'

const meta: Meta<typeof Popover> = {
  title: 'Surfaces/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const button = `<button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Open popover</button>`

const content = `
  <div>
    <p style="margin:0 0 8px;font-size:14px;font-weight:500">Popover content</p>
    <p style="margin:0;font-size:13px;color:var(--color-text-secondary)">Use this slot for body content.</p>
  </div>
`

const template = (args: any) => ({
  components: { Popover },
  setup() { return { args } },
  template: `
    <Popover v-bind="args">
      ${button}
      <template #content>${content}</template>
    </Popover>
  `,
})

export const Default: Story = { render: template }
export const Open: Story = { args: { defaultOpen: true }, render: template }
export const Modal: Story = { args: { modal: true }, render: template }
export const NoClose: Story = { args: { defaultOpen: true, showClose: false }, render: template }
export const BottomPlacement: Story = {
  args: { defaultOpen: true, side: 'bottom', align: 'end' },
  render: template,
}

export const Interactive: Story = {
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }))
    const content = await within(document.body).findByText('Popover content')
    expect(content).toBeTruthy()
  },
}

export const Controlled: Story = {
  render: () => ({
    components: { Popover },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <Popover v-model:open="open">
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Toggle popover</button>
          <template #content>
            <div>
              <p style="margin:0 0 8px;font-size:14px;font-weight:500">Controlled popover</p>
              <p style="margin:0;font-size:13px;color:var(--color-text-secondary)">Toggle via external button.</p>
            </div>
          </template>
        </Popover>
        <button @click="open = !open" style="padding:6px 12px;border:1px solid var(--color-surface-light);border-radius:8px;cursor:pointer">
          {{ open ? 'Close' : 'Open' }} popover
        </button>
      </div>
    `,
  }),
}
