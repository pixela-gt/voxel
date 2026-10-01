import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stack from './Stack.vue'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    gap: { control: 'text' },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] },
    wrap: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: { orientation: 'horizontal', gap: '12px' },
  render: (args) => ({
    components: { Stack },
    setup() { return { args } },
    template: `
      <Stack v-bind="args">
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">A</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">B</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">C</div>
      </Stack>
    `,
  }),
}

export const Vertical: Story = {
  args: { orientation: 'vertical', gap: '8px' },
  render: (args) => ({
    components: { Stack },
    setup() { return { args } },
    template: `
      <Stack v-bind="args">
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px">Item 1</div>
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px">Item 2</div>
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px">Item 3</div>
      </Stack>
    `,
  }),
}

export const WithWrap: Story = {
  args: { orientation: 'horizontal', gap: '12px', wrap: true },
  render: (args) => ({
    components: { Stack },
    setup() { return { args } },
    template: `
      <Stack v-bind="args">
        <div style="background:var(--color-warning-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 1</div>
        <div style="background:var(--color-warning-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 2</div>
        <div style="background:var(--color-warning-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 3</div>
        <div style="background:var(--color-warning-lighten-1);padding:12px;border-radius:8px;min-width:150px">Item 4</div>
      </Stack>
    `,
  }),
}

export const Centered: Story = {
  args: { orientation: 'horizontal', gap: '16px', align: 'center', justify: 'center' },
  render: (args) => ({
    components: { Stack },
    setup() { return { args } },
    template: `
      <Stack v-bind="args" style="min-height:120px;background:var(--color-surface-light);border-radius:8px">
        <div style="background:var(--color-error-lighten-1);padding:12px;border-radius:8px">Centered</div>
        <div style="background:var(--color-error-lighten-1);padding:24px;border-radius:8px">Taller</div>
      </Stack>
    `,
  }),
}

export const SpaceBetween: Story = {
  args: { orientation: 'horizontal', justify: 'space-between', align: 'center' },
  render: (args) => ({
    components: { Stack },
    setup() { return { args } },
    template: `
      <Stack v-bind="args" style="background:var(--color-surface-light);border-radius:8px;padding:12px">
        <div style="background:var(--color-info-lighten-1);padding:8px;border-radius:8px">Left</div>
        <div style="background:var(--color-info-lighten-1);padding:8px;border-radius:8px">Center</div>
        <div style="background:var(--color-info-lighten-1);padding:8px;border-radius:8px">Right</div>
      </Stack>
    `,
  }),
}

export const ResponsiveGap: Story = {
  args: { orientation: 'horizontal', gap: { base: '4px', md: '12px', lg: '24px' } },
  render: (args) => ({
    components: { Stack },
    setup() { return { args } },
    template: `
      <Stack v-bind="args">
        <div style="background:var(--color-secondary-lighten-1);padding:12px;border-radius:8px">A</div>
        <div style="background:var(--color-secondary-lighten-1);padding:12px;border-radius:8px">B</div>
        <div style="background:var(--color-secondary-lighten-1);padding:12px;border-radius:8px">C</div>
      </Stack>
    `,
  }),
}
