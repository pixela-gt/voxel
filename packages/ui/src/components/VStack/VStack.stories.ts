import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VStack from './VStack.vue'

const meta: Meta<typeof VStack> = {
  title: 'Layout/VStack',
  component: VStack,
  tags: ['autodocs'],
  argTypes: {
    gap: { control: 'text' },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { gap: '12px' },
  render: (args) => ({
    components: { VStack },
    setup() { return { args } },
    template: `
      <VStack v-bind="args">
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">First</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">Second</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">Third</div>
      </VStack>
    `,
  }),
}

export const Centered: Story = {
  args: { gap: '16px', align: 'center', justify: 'center' },
  render: (args) => ({
    components: { VStack },
    setup() { return { args } },
    template: `
      <VStack v-bind="args" style="min-height:200px;width:200px;background:var(--color-surface-light);border-radius:8px">
        <div style="background:var(--color-info-lighten-1);padding:12px;border-radius:8px">Centered</div>
        <div style="background:var(--color-info-lighten-1);padding:12px;border-radius:8px">Content</div>
      </VStack>
    `,
  }),
}
