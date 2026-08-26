import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DataTableServer from './DataTableServer.vue'
import type { ColumnDef } from '../DataTable/DataTable.types'

const meta: Meta<typeof DataTableServer> = {
  title: 'Patterns/DataTableServer',
  component: DataTableServer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const columns: ColumnDef[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', align: 'right' },
]

const allData = [
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

export const Default: Story = {
  render: () => ({
    components: { DataTableServer },
    setup() {
      const page = ref(1)
      const pageSize = 5
      const items = ref(allData.slice(0, 5))
      const total = ref(allData.length)

      function onPageChange(newPage: number) {
        page.value = newPage
        const start = (newPage - 1) * pageSize
        items.value = allData.slice(start, start + pageSize)
      }

      return { columns, items, total, page, pageSize, onPageChange }
    },
    template: `
      <DataTableServer
        :columns="columns"
        :items="items"
        :total="total"
        v-model:page="page"
        :page-size="pageSize"
        @page-change="onPageChange"
      />
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { DataTableServer },
    setup() {
      const page = ref(1)
      return { columns, items: [], total: 0, page, pageSize: 5, loading: true }
    },
    template: `
      <DataTableServer
        :columns="columns"
        :items="items"
        :total="total"
        v-model:page="page"
        :page-size="pageSize"
        :loading="loading"
      />
    `,
  }),
}

export const Empty: Story = {
  render: () => ({
    components: { DataTableServer },
    setup() {
      const page = ref(1)
      return { columns, items: [], total: 0, page, pageSize: 5 }
    },
    template: `
      <DataTableServer
        :columns="columns"
        :items="items"
        :total="total"
        v-model:page="page"
        :page-size="pageSize"
      />
    `,
  }),
}

export const WithCellSlot: Story = {
  render: () => ({
    components: { DataTableServer },
    setup() {
      const page = ref(1)
      const pageSize = 5
      const items = ref(allData.slice(0, 5))
      const total = ref(allData.length)

      function onPageChange(newPage: number) {
        page.value = newPage
        const start = (newPage - 1) * pageSize
        items.value = allData.slice(start, start + pageSize)
      }

      return { columns, items, total, page, pageSize, onPageChange }
    },
    template: `
      <DataTableServer
        :columns="columns"
        :items="items"
        :total="total"
        v-model:page="page"
        :page-size="pageSize"
        @page-change="onPageChange"
      >
        <template #cell-role="{ value }">
          <span :style="{
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 500,
            backgroundColor: value === 'Admin' ? 'var(--color-primary-lighten-1)' : 'var(--color-surface-light)',
            color: value === 'Admin' ? 'var(--color-primary-darken-1)' : 'var(--color-text-secondary)',
          }">{{ value }}</span>
        </template>
      </DataTableServer>
    `,
  }),
}

export const PageChangeEvent: Story = {
  render: () => ({
    components: { DataTableServer },
    setup() {
      const page = ref(1)
      const pageSize = 5
      const items = ref(allData.slice(0, 5))
      const total = ref(allData.length)
      const lastEvent = ref('')

      function onPageChange(newPage: number) {
        page.value = newPage
        const start = (newPage - 1) * pageSize
        items.value = allData.slice(start, start + pageSize)
        lastEvent.value = `Page changed to ${newPage}`
      }

      return { columns, items, total, page, pageSize, onPageChange, lastEvent }
    },
    template: `
      <div>
        <DataTableServer
          :columns="columns"
          :items="items"
          :total="total"
          v-model:page="page"
          :page-size="pageSize"
          @page-change="onPageChange"
        />
        <p v-if="lastEvent" style="margin-top:12px;font-size:13px;color:var(--color-text-secondary)">{{ lastEvent }}</p>
      </div>
    `,
  }),
}
