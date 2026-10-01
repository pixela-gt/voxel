import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Search, X, Mail } from '@lucide/vue'
import InputGroup from './InputGroup.vue'
import { Input } from '../Input'
import { Icon } from '../Icon'

const meta: Meta<typeof InputGroup> = {
  title: 'Inputs/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const LeadingIcon: Story = {
  render: () => ({
    components: { InputGroup, Input, Icon },
    setup() {
      return { Search }
    },
    template: `
      <InputGroup style="max-width:400px">
        <template #leading>
          <Icon :icon="Search" size="small" />
        </template>
        <Input placeholder="Search..." />
      </InputGroup>
    `,
  }),
}

export const TrailingButton: Story = {
  render: () => ({
    components: { InputGroup, Input, Icon },
    setup() {
      return { X }
    },
    template: `
      <InputGroup style="max-width:400px">
        <Input placeholder="Type and press clear..." />
        <template #trailing>
          <button type="button" class="p-1 hover:text-[var(--color-text-primary)]" aria-label="Clear">
            <Icon :icon="X" size="small" />
          </button>
        </template>
      </InputGroup>
    `,
  }),
}

export const BothSides: Story = {
  render: () => ({
    components: { InputGroup, Input, Icon },
    setup() {
      return { Mail, X }
    },
    template: `
      <InputGroup style="max-width:400px">
        <template #leading>
          <Icon :icon="Mail" size="small" />
        </template>
        <Input placeholder="Email address..." type="email" />
        <template #trailing>
          <button type="button" class="p-1 hover:text-[var(--color-text-primary)]" aria-label="Clear">
            <Icon :icon="X" size="small" />
          </button>
        </template>
      </InputGroup>
    `,
  }),
}

export const TextAddon: Story = {
  render: () => ({
    components: { InputGroup, Input },
    template: `
      <InputGroup style="max-width:400px">
        <template #leading>
          <span class="text-xs text-[var(--color-text-secondary)] pl-3 pr-1">https://</span>
        </template>
        <Input placeholder="example.com" />
      </InputGroup>
    `,
  }),
}

export const Dense: Story = {
  render: () => ({
    components: { InputGroup, Input, Icon },
    setup() {
      return { Search }
    },
    template: `
      <InputGroup style="max-width:400px">
        <template #leading>
          <Icon :icon="Search" size="small" />
        </template>
        <Input placeholder="Dense search..." density="dense" />
      </InputGroup>
    `,
  }),
}
