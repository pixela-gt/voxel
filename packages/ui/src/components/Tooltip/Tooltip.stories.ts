import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Heart } from '@lucide/vue'
import Tooltip from './Tooltip.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Action/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    position: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    disabled: { control: 'boolean' },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    sideOffset: { control: 'number' },
    delayDuration: { control: 'number' },
    disableHoverableContent: { control: 'boolean' },
    disableClosingTrigger: { control: 'boolean' },
    ignoreNonKeyboardFocus: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const button = `<button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Hover me</button>`

const template = (args: any) => ({
  components: { Tooltip },
  setup() { return { args } },
  template: `<Tooltip v-bind="args">${button}</Tooltip>`,
})

export const Default: Story = { args: { text: 'Tooltip text', position: 'top' }, render: template }
export const Top: Story = { args: { text: 'Top tooltip', position: 'top' }, render: template }
export const Right: Story = { args: { text: 'Right tooltip', position: 'right' }, render: template }
export const Bottom: Story = { args: { text: 'Bottom tooltip', position: 'bottom' }, render: template }
export const Left: Story = { args: { text: 'Left tooltip', position: 'left' }, render: template }
export const Disabled: Story = { args: { text: 'Disabled', position: 'top', disabled: true }, render: template }

export const WithContentSlot: Story = {
  render: () => ({
    components: { Tooltip, Heart },
    setup() { return { Heart } },
    template: `
      <Tooltip>
        ${button}
        <template #content>
          <div style="display:flex;align-items:center;gap:6px">
            <Heart :size="14" />
            <span>Rich content with icons</span>
          </div>
        </template>
      </Tooltip>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { Tooltip },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <Tooltip v-model:open="open" text="Controlled by v-model">
          ${button}
        </Tooltip>
        <button @click="open = !open" style="padding:6px 12px;border:1px solid var(--color-grey-200);border-radius:8px;cursor:pointer">
          {{ open ? 'Hide' : 'Show' }} tooltip
        </button>
      </div>
    `,
  }),
}
