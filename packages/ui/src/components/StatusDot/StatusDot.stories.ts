import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatusDot from './StatusDot.vue'

const meta: Meta<typeof StatusDot> = {
  title: 'Content/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['online', 'offline', 'away', 'busy'] },
    pulse: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Online: Story = {
  args: { status: 'online', label: 'User is online' },
}

export const Away: Story = {
  args: { status: 'away', label: 'User is away' },
}

export const Busy: Story = {
  args: { status: 'busy', label: 'User is busy' },
}

export const Offline: Story = {
  args: { status: 'offline', label: 'User is offline' },
}

export const AllStatuses: Story = {
  render: () => ({
    components: { StatusDot },
    template: `
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2"><StatusDot status="online" /> Online</div>
        <div class="flex items-center gap-2"><StatusDot status="away" /> Away</div>
        <div class="flex items-center gap-2"><StatusDot status="busy" /> Busy</div>
        <div class="flex items-center gap-2"><StatusDot status="offline" /> Offline</div>
      </div>
    `,
  }),
}

export const WithPulse: Story = {
  args: { status: 'online', pulse: true, label: 'Online (pulsing)' },
  render: (args) => ({
    components: { StatusDot },
    setup() { return { args } },
    template: `<div class="flex items-center gap-2"><StatusDot v-bind="args" /> Online</div>`,
  }),
}

export const WithSRLabel: Story = {
  args: { status: 'busy', label: 'User is busy' },
  render: (args) => ({
    components: { StatusDot },
    setup() { return { args } },
    template: `<div class="flex items-center gap-2"><StatusDot v-bind="args" /> User is busy</div>`,
  }),
}
