import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import HoverCard from './HoverCard.vue'

const meta: Meta<typeof HoverCard> = {
  title: 'Action/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    openDelay: { control: { type: 'number' } },
    closeDelay: { control: { type: 'number' } },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    showArrow: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { HoverCard },
  setup() { return { args } },
  template: `
    <HoverCard v-bind="args">
      <template #trigger>
        <span style="text-decoration:underline dotted;color:var(--color-primary-base);cursor:pointer">@username</span>
      </template>
      <div style="display:flex;gap:8px;align-items:center">
        <div style="width:40px;height:40px;border-radius:50%;background:var(--color-surface-light);flex-shrink:0" />
        <div>
          <p style="margin:0;font-size:13px;font-weight:600">Display Name</p>
          <p style="margin:0;font-size:12px;color:var(--color-text-secondary)">@username · Bio line</p>
        </div>
      </div>
    </HoverCard>
  `,
})

export const Default: Story = { render: template }
export const Open: Story = { args: { defaultOpen: true }, render: template }
export const FastOpen: Story = { args: { openDelay: 100, closeDelay: 50 }, render: template }
export const BottomSide: Story = {
  args: { defaultOpen: true, side: 'bottom', align: 'end' },
  render: template,
}

export const NoArrow: Story = {
  args: { defaultOpen: true, showArrow: false },
  render: template,
}

export const Controlled: Story = {
  render: () => ({
    components: { HoverCard },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <p style="margin:0;font-size:13px">External state: {{ open ? 'open' : 'closed' }}</p>
        <HoverCard v-model:open="open">
          <template #trigger>
            <span style="text-decoration:underline dotted;color:var(--color-primary-base);cursor:pointer">@controlled</span>
          </template>
          <p style="margin:0;font-size:13px">Controlled hover card content.</p>
        </HoverCard>
        <button @click="open = !open" style="padding:6px 12px;border:1px solid var(--color-surface-light);border-radius:8px;cursor:pointer">
          Toggle externally
        </button>
      </div>
    `,
  }),
}
