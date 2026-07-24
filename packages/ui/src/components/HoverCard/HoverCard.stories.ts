import type { Meta, StoryObj } from '@storybook/vue3'
import HoverCard from './HoverCard.vue'

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    openDelay: { control: { type: 'number' } },
    closeDelay: { control: { type: 'number' } },
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
        <div style="width:40px;height:40px;border-radius:50%;background:var(--color-grey-300);flex-shrink:0" />
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
export const WithUser: Story = { render: template }
export const FastOpen: Story = { args: { openDelay: 100, closeDelay: 50 }, render: template }
