import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Star, Heart } from '@lucide/vue'
import { SelectableCard } from './index'

const meta: Meta<typeof SelectableCard> = {
  title: 'Surfaces/SelectableCard',
  component: SelectableCard,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
    selectedIcon: { control: false },
    elevation: { control: 'select', options: ['flat', 'sm', 'md', 'lg', 'xl', '2xl'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const cardContent = `
  <div style="padding:16px">
    <h3 style="margin:0 0 4px;font-size:16px;font-weight:600;color:var(--color-text-primary)">Card title</h3>
    <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">Click to select this card.</p>
  </div>
`

export const Default: Story = {
  render: () => ({
    components: { SelectableCard },
    template: `<SelectableCard>${cardContent}</SelectableCard>`,
  }),
}

export const SelectedByDefault: Story = {
  render: () => ({
    components: { SelectableCard },
    template: `<SelectableCard :default-selected="true">${cardContent}</SelectableCard>`,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { SelectableCard },
    setup() {
      const selected = ref(false)
      return { selected }
    },
    template: `
      <div>
        <SelectableCard v-model="selected">
          <div style="padding:16px">
            <h3 style="margin:0 0 4px;font-size:16px;font-weight:600;color:var(--color-text-primary)">Controlled card</h3>
            <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">State: {{ selected ? 'selected' : 'unselected' }}</p>
          </div>
        </SelectableCard>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { SelectableCard },
    template: `<SelectableCard disabled>${cardContent}</SelectableCard>`,
  }),
}

export const WithElevation: Story = {
  render: () => ({
    components: { SelectableCard },
    template: `<SelectableCard elevation="md">${cardContent}</SelectableCard>`,
  }),
}

export const MultipleCards: Story = {
  render: () => ({
    components: { SelectableCard },
    setup() {
      const selected = ref<string | null>('pro')
      return { selected }
    },
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <SelectableCard :model-value="selected === 'free'" @update:model-value="selected = $event ? 'free' : null">
          <div style="padding:16px">
            <h3 style="margin:0 0 4px;font-size:16px;font-weight:600;color:var(--color-text-primary)">Free</h3>
            <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">Basic features</p>
          </div>
        </SelectableCard>
        <SelectableCard :model-value="selected === 'pro'" @update:model-value="selected = $event ? 'pro' : null">
          <div style="padding:16px">
            <h3 style="margin:0 0 4px;font-size:16px;font-weight:600;color:var(--color-text-primary)">Pro</h3>
            <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">Advanced features</p>
          </div>
        </SelectableCard>
        <SelectableCard :model-value="selected === 'team'" @update:model-value="selected = $event ? 'team' : null">
          <div style="padding:16px">
            <h3 style="margin:0 0 4px;font-size:16px;font-weight:600;color:var(--color-text-primary)">Team</h3>
            <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">For organizations</p>
          </div>
        </SelectableCard>
      </div>
    `,
  }),
}

export const CustomSelectedIcon: Story = {
  render: () => ({
    components: { SelectableCard },
    setup() {
      return { Star, Heart }
    },
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
        <SelectableCard :default-selected="true" :selected-icon="Star">
          <div style="padding:16px">
            <h3 style="margin:0 0 4px;font-size:16px;font-weight:600;color:var(--color-text-primary)">Star icon</h3>
            <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">Uses Star instead of Check</p>
          </div>
        </SelectableCard>
        <SelectableCard :default-selected="true" :selected-icon="Heart">
          <div style="padding:16px">
            <h3 style="margin:0 0 4px;font-size:16px;font-weight:600;color:var(--color-text-primary)">Heart icon</h3>
            <p style="margin:0;font-size:14px;color:var(--color-text-secondary)">Uses Heart instead of Check</p>
          </div>
        </SelectableCard>
      </div>
    `,
  }),
}
