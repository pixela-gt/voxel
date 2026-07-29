import type { Meta, StoryObj } from '@storybook/vue3'
import { Folder, FileText, Inbox } from '@lucide/vue'
import EmptyState from './EmptyState.vue'
import Button from '../../components/Button/Button.vue'
import Icon from '../../components/Icon/Icon.vue'

const meta: Meta<typeof EmptyState> = {
  title: 'Patterns/EmptyState',
  component: EmptyState,
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
    title: 'No results',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
}

export const WithIcon: Story = {
  args: {
    title: 'No files yet',
    description: 'Upload your first file to get started.',
  },
  render: (args) => ({
    components: { EmptyState, Icon },
    setup() { return { args, Folder } },
    template: `
      <EmptyState v-bind="args">
        <template #icon>
          <Icon :icon="Folder" size="large" />
        </template>
      </EmptyState>
    `,
  }),
}

export const WithAction: Story = {
  args: {
    title: 'No projects',
    description: 'Create your first project to start organizing your work.',
  },
  render: (args) => ({
    components: { EmptyState, Button, Icon },
    setup() { return { args, Inbox } },
    template: `
      <EmptyState v-bind="args">
        <template #icon>
          <Icon :icon="Inbox" size="large" />
        </template>
        <template #action>
          <Button>Create Project</Button>
        </template>
      </EmptyState>
    `,
  }),
}

export const WithCustomContent: Story = {
  args: {
    title: 'No data',
    description: 'Import data to populate this view.',
  },
  render: (args) => ({
    components: { EmptyState, Button, Icon },
    setup() { return { args, FileText } },
    template: `
      <EmptyState v-bind="args">
        <template #icon>
          <Icon :icon="FileText" size="large" />
        </template>
        <div style="display:flex;gap:8px">
          <Button variant="outline">Import CSV</Button>
          <Button>Import JSON</Button>
        </div>
      </EmptyState>
    `,
  }),
}

export const Minimal: Story = {
  args: {
    title: 'Nothing here',
  },
}
