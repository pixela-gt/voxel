import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FieldStatus from './FieldStatus.vue'
import { FormField } from '../FormField'
import { Input } from '../Input'

const meta: Meta<typeof FieldStatus> = {
  title: 'Inputs/FieldStatus',
  component: FieldStatus,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['error', 'warning', 'success', 'info'] },
    message: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: { status: 'error', message: 'This field is required' },
}

export const Warning: Story = {
  args: { status: 'warning', message: 'Password is weak' },
}

export const Success: Story = {
  args: { status: 'success', message: 'Email is available' },
}

export const Info: Story = {
  args: { status: 'info', message: 'This field is optional' },
}

export const AllStatuses: Story = {
  render: () => ({
    components: { FieldStatus },
    template: `
      <div class="flex flex-col gap-2">
        <FieldStatus status="error" message="This field is required" />
        <FieldStatus status="warning" message="Password is weak" />
        <FieldStatus status="success" message="Email is available" />
        <FieldStatus status="info" message="This field is optional" />
      </div>
    `,
  }),
}

export const InsideFormField: Story = {
  render: () => ({
    components: { FormField, Input, FieldStatus },
    template: `
      <FormField label="Email" style="max-width:400px">
        <Input placeholder="Enter email..." />
        <template #hint>
          <FieldStatus status="error" message="Please enter a valid email address" />
        </template>
      </FormField>
    `,
  }),
}

export const Standalone: Story = {
  render: () => ({
    components: { FieldStatus },
    template: `
      <div class="p-4 border border-[var(--color-grey-200)] rounded-lg" style="max-width:400px">
        <FieldStatus status="warning" message="Your session will expire in 5 minutes" />
      </div>
    `,
  }),
}

export const WithSlot: Story = {
  args: { status: 'info' },
  render: (args) => ({
    components: { FieldStatus },
    setup() { return { args } },
    template: `
      <FieldStatus v-bind="args">
        Custom slot message with <strong>emphasis</strong>
      </FieldStatus>
    `,
  }),
}
