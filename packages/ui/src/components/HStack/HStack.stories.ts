import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HStack from './HStack.vue'

const meta: Meta<typeof HStack> = {
  title: 'Layout/HStack',
  component: HStack,
  tags: ['autodocs'],
  argTypes: {
    gap: { control: 'text' },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] },
    wrap: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { gap: '12px' },
  render: (args) => ({
    components: { HStack },
    setup() { return { args } },
    template: `
      <HStack v-bind="args">
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">A</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">B</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">C</div>
      </HStack>
    `,
  }),
}

export const WithWrap: Story = {
  args: { gap: '12px', wrap: true },
  render: (args) => ({
    components: { HStack },
    setup() { return { args } },
    template: `
      <HStack v-bind="args">
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 1</div>
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 2</div>
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 3</div>
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 4</div>
      </HStack>
    `,
  }),
}

export const Centered: Story = {
  args: { gap: '16px', align: 'center', justify: 'center' },
  render: (args) => ({
    components: { HStack },
    setup() { return { args } },
    template: `
      <HStack v-bind="args" style="min-height:120px;background:var(--color-surface-light);border-radius:8px">
        <div style="background:var(--color-warning-lighten-1);padding:12px;border-radius:8px">Centered</div>
        <div style="background:var(--color-warning-lighten-1);padding:24px;border-radius:8px">Taller</div>
      </HStack>
    `,
  }),
}
