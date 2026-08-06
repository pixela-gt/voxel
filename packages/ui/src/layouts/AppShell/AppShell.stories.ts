import type { Meta, StoryObj } from '@storybook/vue3'
import AppShell from './AppShell.vue'

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'boxy', 'inset'],
    },
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args:any) => ({
    components: { AppShell },
    setup() {
      return { args }
    },
    template: `
      <AppShell v-bind="args" style="height:400px;border:1px solid var(--color-surface-light);border-radius:8px">
        <template #header>
          <div style="padding:12px 16px;background:var(--color-surface-base); var(--color-surface-light);font-weight:600">Header</div>
        </template>
        <template #sidebar>
          <div style="width:200px;padding:16px;background:var(--color-surface-base);var(--color-surface-light)">Sidebar</div>
        </template>
        <div style="padding:16px">Main content area</div>
      </AppShell>
    `,
  }),
}

export const HeaderOnly: Story = {
  render: (args:any) => ({
    components: { AppShell },
    template: `
      <AppShell v-bind="args" style="height:400px;border:1px solid var(--color-surface-light);border-radius:8px">
        <template #header>
          <div style="padding:12px 16px;background:var(--color-surface-base);border-bottom:1px solid var(--color-surface-light);font-weight:600">Header</div>
        </template>
        <div style="padding:16px">Content without sidebar</div>
      </AppShell>
    `,
  }),
}

export const SidebarOnly: Story = {
  render: () => ({
    components: { AppShell },
    template: `
      <AppShell style="height:400px;border:1px solid var(--color-surface-light);border-radius:8px">
        <template #sidebar>
          <div style="width:200px;padding:16px;background:var(--color-surface-base);border-right:1px solid var(--color-surface-light)">Sidebar</div>
        </template>
        <div style="padding:16px">Content without header</div>
      </AppShell>
    `,
  }),
}

export const ContentOnly: Story = {
  render: () => ({
    components: { AppShell },
    template: `
      <AppShell style="height:400px;border:1px solid var(--color-surface-light);border-radius:8px">
        <div style="padding:16px">Just content, no header or sidebar</div>
      </AppShell>
    `,
  }),
}
