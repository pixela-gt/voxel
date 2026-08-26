import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import Pagination from './Pagination.vue'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    defaultPage: { control: { type: 'number', min: 1 } },
    total: { control: { type: 'number', min: 1 } },
    itemsPerPage: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 5 } },
    showEdges: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { total: 100, itemsPerPage: 10 } }
export const ManyPages: Story = { args: { total: 500, itemsPerPage: 10 } }
export const WithEdges: Story = { args: { total: 200, itemsPerPage: 10, showEdges: true } }
export const Small: Story = { args: { total: 100, itemsPerPage: 10, size: 'small' } }
export const Large: Story = { args: { total: 100, itemsPerPage: 10, size: 'large' } }
export const Disabled: Story = { args: { total: 100, itemsPerPage: 10, disabled: true } }
export const FewSiblings: Story = { args: { total: 100, itemsPerPage: 10, siblingCount: 1 } }

export const Controlled: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      return { page }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <p style="margin:0;font-size:13px">External state: page {{ page }}</p>
        <Pagination v-model:page="page" :total="100" :items-per-page="10" />
      </div>
    `,
  }),
}

export const SinglePage: Story = { args: { total: 5, itemsPerPage: 10 } }
export const EmptyData: Story = { args: { total: 0, itemsPerPage: 10 } }
export const HugeTotal: Story = { args: { total: 100000, itemsPerPage: 10, showEdges: true } }
export const ZeroSiblings: Story = { args: { total: 100, itemsPerPage: 10, siblingCount: 0 } }

export const LiveData: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      const photos = ref<Array<{ id: string; author: string; download_url: string }>>([])
      const loading = ref(false)

      // ponytail: picsum caps the list at 10 pages of 100 — total is a demo value
      async function load(p: number) {
        loading.value = true
        try {
          const res = await fetch(`https://picsum.photos/v2/list?page=${p}&limit=5`)
          photos.value = await res.json()
        } finally {
          loading.value = false
        }
      }

      watch(page, load, { immediate: true })
      return { page, photos, loading }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <p style="margin:0;font-size:13px;color:var(--color-text-secondary)">
          Live data from picsum.photos — page {{ page }}
        </p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;min-height:96px" v-if="!loading">
          <figure v-for="photo in photos" :key="photo.id" style="margin:0;width:104px">
            <img
              :src="photo.download_url"
              :alt="'Photo by ' + photo.author"
              loading="lazy"
              style="width:100%;height:72px;object-fit:cover;border-radius:6px;display:block;background:var(--color-surface-light)"
            />
            <figcaption style="font-size:11px;color:var(--color-text-muted);margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
              {{ photo.author }}
            </figcaption>
          </figure>
        </div>
        <p v-else style="margin:0;font-size:13px;color:var(--color-text-secondary)">Loading…</p>
        <Pagination v-model:page="page" :total="100" :items-per-page="5" />
      </div>
    `,
  }),
}
