import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import Dialog from './Dialog.vue'

const meta: Meta<typeof Dialog> = {
  title: 'Surfaces/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Dialog },
  setup() { return { args } },
  template: `
    <Dialog v-bind="args">
      <template #trigger>
        <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Open dialog</button>
      </template>
      <template #content>
        <p style="margin:0;font-size:14px">Dialog body content goes here.</p>
      </template>
      <template #footer>
        <button style="padding:6px 12px;border-radius:6px;background:transparent;border:1px solid var(--color-grey-300);cursor:pointer">Cancel</button>
        <button style="padding:6px 12px;border-radius:6px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Confirm</button>
      </template>
    </Dialog>
  `,
})

export const Default: Story = {
  args: { title: 'Dialog title', description: 'Optional description' },
  render: template,
}
export const Open: Story = {
  args: { title: 'Already open', description: 'For visual demo' },
  render: () => ({
    components: { Dialog },
    template: `
      <Dialog :default-open="true" title="Already open" description="Demonstrates the open state">
        <template #content>
          <p>Open by default. The trigger is unused here.</p>
        </template>
        <template #footer>
          <button>OK</button>
        </template>
      </Dialog>
    `,
  }),
}
export const WithFooter: Story = { render: template }
export const LongContent: Story = {
  args: { title: 'Long content' },
  render: () => ({
    components: { Dialog },
    template: `
      <Dialog title="Long content">
        <template #trigger>
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Open long</button>
        </template>
        <template #content>
          ${'<p style="margin:0 0 8px">A paragraph.</p>'.repeat(10)}
        </template>
      </Dialog>
    `,
  }),
}
export const Interactive: Story = {
  args: { title: 'Click to open' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }))
    await expect(await within(document.body).findByRole('dialog')).toBeInTheDocument()
  },
}
