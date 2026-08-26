import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Info, AlertTriangle, XCircle, CheckCircle2 } from '@lucide/vue'
import AlertDialog from './AlertDialog.vue'

const meta: Meta<typeof AlertDialog> = {
  title: 'Surfaces/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'select', options: ['info', 'warning', 'error', 'success'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { AlertDialog },
  setup() { return { args } },
  template: `
    <AlertDialog v-bind="args">
      <template #trigger>
        <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Open alert</button>
      </template>
      <template #footer>
        <button style="padding:6px 12px;border-radius:6px;background:transparent;border:1px solid var(--color-grey-300);cursor:pointer">Cancel</button>
      </template>
      <template #action>
        <button style="padding:6px 12px;border-radius:6px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Confirm</button>
      </template>
      <p>This is the alert body content. Use the footer slot for actions.</p>
    </AlertDialog>
  `,
})

export const Default: Story = {
  args: { title: 'Are you sure?', description: 'This action cannot be undone.', variant: 'info', icon: Info },
  render: template,
}
export const Open: Story = {
  args: { defaultOpen: true, title: 'Confirm action', description: 'Open by default for visual demo', variant: 'info', icon: Info },
  render: template,
}
export const Warning: Story = {
  args: { title: 'Warning', description: 'Proceed with caution.', variant: 'warning', icon: AlertTriangle },
  render: template,
}
export const Error: Story = {
  args: { title: 'Error', description: 'Something went wrong.', variant: 'error', icon: XCircle },
  render: template,
}
export const Success: Story = {
  args: { title: 'Success', description: 'Operation completed.', variant: 'success', icon: CheckCircle2 },
  render: template,
}
