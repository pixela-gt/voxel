import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Grid from './Grid.vue'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: { control: 'number' },
    rows: { control: 'number' },
    gap: { control: 'text' },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const cell = (text: string) =>
  `<div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">${text}</div>`

export const Default: Story = {
  args: { cols: 3, gap: '12px' },
  render: (args) => ({
    components: { Grid },
    setup() { return { args } },
    template: `
      <Grid v-bind="args" style="min-height:200px">
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">1</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">2</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">3</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">4</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">5</div>
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">6</div>
      </Grid>
    `,
  }),
}

export const TwoColumns: Story = {
  args: { cols: 2, gap: '16px' },
  render: (args) => ({
    components: { Grid },
    setup() { return { args } },
    template: `
      <Grid v-bind="args">
        <div style="background:var(--color-info-lighten-1);padding:12px;border-radius:8px">A</div>
        <div style="background:var(--color-info-lighten-1);padding:12px;border-radius:8px">B</div>
      </Grid>
    `,
  }),
}

export const Responsive: Story = {
  args: { cols: '{ base: 1, md: 3 }', gap: '12px' },
  render: (args) => ({
    components: { Grid },
    setup() { return { args } },
    template: `
      <Grid v-bind="args" style="min-height:200px">
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px">1</div>
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px">2</div>
        <div style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px">3</div>
      </Grid>
    `,
  }),
}
