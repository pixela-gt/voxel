import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageHeader from './PageHeader.vue'
import Button from '../../components/Button/Button.vue'

const meta: Meta<typeof PageHeader> = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dashboard',
  },
}

export const WithDescription: Story = {
  args: {
    title: 'Users',
    description: 'Manage your team members and their roles.',
  },
}

export const WithActions: Story = {
  args: {
    title: 'Projects',
    description: 'All your projects in one place.',
  },
  render: (args) => ({
    components: { PageHeader, Button },
    setup() { return { args } },
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <Button variant="outline">Cancel</Button>
          <Button>New Project</Button>
        </template>
      </PageHeader>
    `,
  }),
}

export const WithPrepend: Story = {
  args: {
    title: 'Settings',
  },
  render: (args) => ({
    components: { PageHeader, Button },
    setup() { return { args } },
    template: `
      <PageHeader v-bind="args">
        <template #prepend>
          <Button variant="text" size="small">Back</Button>
        </template>
      </PageHeader>
    `,
  }),
}

export const FullExample: Story = {
  args: {
    title: 'Analytics',
    description: 'View your site traffic and engagement metrics.',
  },
  render: (args) => ({
    components: { PageHeader, Button },
    setup() { return { args } },
    template: `
      <PageHeader v-bind="args">
        <template #prepend>
          <Button variant="text" size="small">Back</Button>
        </template>
        <template #actions>
          <Button variant="outline">Export</Button>
          <Button>Refresh</Button>
        </template>
      </PageHeader>
    `,
  }),
}
