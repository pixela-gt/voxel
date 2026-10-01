import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Center from './Center.vue'

const meta: Meta<typeof Center> = {
  title: 'Layout/Center',
  component: Center,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    inline: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Center },
    template: `
      <Center style="height:120px;background:var(--color-surface-light);border-radius:8px">
        <div style="background:var(--color-primary-lighten-1);padding:12px;border-radius:8px">Centered</div>
      </Center>
    `,
  }),
}

export const Inline: Story = {
  render: () => ({
    components: { Center },
    template: `
      <div>
        <Center inline style="background:var(--color-success-lighten-1);padding:12px;border-radius:8px">
          Inline Centered
        </Center>
      </div>
    `,
  }),
}

export const WithDifferentSizes: Story = {
  render: () => ({
    components: { Center },
    template: `
      <Center style="min-height:120px;background:var(--color-surface-light);border-radius:8px;gap:8px">
        <div style="background:var(--color-warning-lighten-1);padding:8px;border-radius:8px">Small</div>
        <div style="background:var(--color-error-lighten-1);padding:24px;border-radius:8px">Large</div>
        <div style="background:var(--color-info-lighten-1);padding:12px;border-radius:8px">Medium</div>
      </Center>
    `,
  }),
}

export const AsSpan: Story = {
  render: () => ({
    components: { Center },
    template: `
      <Center as="span" style="display:inline-flex;background:var(--color-secondary-lighten-1);padding:8px;border-radius:8px">
        As span
      </Center>
    `,
  }),
}
