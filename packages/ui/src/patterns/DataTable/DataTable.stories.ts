import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DataTable from './DataTable.vue'
import type { ColumnDef } from './DataTable.types'

const meta: Meta<typeof DataTable> = {
  title: 'Patterns/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Editor' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Admin' },
  { id: 9, name: 'Ivy Chen', email: 'ivy@example.com', role: 'Viewer' },
  { id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'Editor' },
  { id: 11, name: 'Karen White', email: 'karen@example.com', role: 'Admin' },
  { id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Viewer' },
]

const columns: ColumnDef[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true, align: 'right' },
]

export const Default: Story = {
  args: {
    columns,
    items: sampleData,
  },
}

export const SmallDataset: Story = {
  args: {
    columns,
    items: sampleData.slice(0, 3),
  },
}

export const Empty: Story = {
  args: {
    columns,
    items: [],
  },
}

export const Loading: Story = {
  args: {
    columns,
    items: [],
    loading: true,
  },
}

export const CustomPageSize: Story = {
  args: {
    columns,
    items: sampleData,
    pageSize: 5,
  },
}

export const WithCellSlot: Story = {
  args: {
    columns,
    items: sampleData.slice(0, 5),
  },
  render: (args) => ({
    components: { DataTable },
    setup() { return { args } },
    template: `
      <DataTable v-bind="args">
        <template #cell-role="{ value }">
          <span :style="{
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 500,
            backgroundColor: value === 'Admin' ? 'var(--color-primary-lighten-1)' : value === 'Editor' ? 'var(--color-success-lighten-1)' : 'var(--color-surface-light)',
            color: value === 'Admin' ? 'var(--color-primary-darken-1)' : value === 'Editor' ? 'var(--color-success-darken-1)' : 'var(--color-text-secondary)',
          }">{{ value }}</span>
        </template>
      </DataTable>
    `,
  }),
}

export const NonSortable: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
    items: sampleData.slice(0, 5),
  },
}

export const MixedAlignment: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name', align: 'left' },
      { key: 'email', label: 'Email', align: 'center' },
      { key: 'role', label: 'Role', align: 'right' },
    ],
    items: sampleData.slice(0, 5),
  },
}
