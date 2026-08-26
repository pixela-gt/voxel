import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Loading from './Loading.vue'

const meta: Meta<typeof Loading> = {
  title: 'Primitives/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 'default' } }
export const Small: Story = { args: { size: 'small' } }
export const Large: Story = { args: { size: 'large' } }
export const OnPrimary: Story = {
  args: { size: 'default', class: 'text-white' },
  render: (args) => ({
    components: { Loading },
    setup() { return { args } },
    template: `<div style="background:var(--color-primary-base);padding:12px;border-radius:8px"><Loading v-bind="args" /></div>`,
  }),
}
export const InButton: Story = {
  args: { size: 'default' },
  render: (args) => ({
    components: { Loading },
    setup() { return { args } },
    template: `<button style="background:var(--color-primary-base);color:white;border:none;padding:8px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:8px;cursor:not-allowed" disabled><Loading v-bind="args" />Loading...</button>`,
  }),
}
