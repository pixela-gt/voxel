import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ClickableCard from './ClickableCard.vue'

const meta: Meta<typeof ClickableCard> = {
  title: 'Surfaces/ClickableCard',
  component: ClickableCard,
  tags: ['autodocs'],
  argTypes: {
    elevation: { control: 'select', options: ['flat', 'sm', 'md', 'lg', 'xl', '2xl'] },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    target: { control: 'text' },
    tag: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { elevation: 'flat' },
  render: (args) => ({
    components: { ClickableCard },
    setup() {
      const onClick = () => window.alert('clicked!')
      return { args, onClick }
    },
    template: `
      <ClickableCard v-bind="args" style="max-width:300px" @click="onClick">
        <strong style="font-size:14px">Clickable Card</strong>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:8px 0 0">Click me or press Enter/Space to activate.</p>
      </ClickableCard>
    `,
  }),
}

export const WithElevation: Story = {
  args: { elevation: 'md' },
  render: (args) => ({
    components: { ClickableCard },
    setup() { return { args } },
    template: `
      <ClickableCard v-bind="args" style="max-width:300px">
        <strong style="font-size:14px">Elevated Card</strong>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:8px 0 0">Has a medium shadow elevation.</p>
      </ClickableCard>
    `,
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { ClickableCard },
    setup() { return { args } },
    template: `
      <ClickableCard v-bind="args" style="max-width:300px">
        <strong style="font-size:14px">Disabled Card</strong>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:8px 0 0">This card cannot be interacted with.</p>
      </ClickableCard>
    `,
  }),
}

export const AsLink: Story = {
  args: { href: 'https://example.com', target: '_blank', elevation: 'sm' },
  render: (args) => ({
    components: { ClickableCard },
    setup() { return { args } },
    template: `
      <ClickableCard v-bind="args" style="max-width:300px">
        <strong style="font-size:14px">Link Card</strong>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:8px 0 0">Renders as an anchor tag. Opens in new tab.</p>
      </ClickableCard>
    `,
  }),
}

export const AsRouterLink: Story = {
  args: { to: '/products/123', elevation: 'sm' },
  render: (args) => ({
    components: { ClickableCard },
    setup() { return { args } },
    template: `
      <ClickableCard v-bind="args" style="max-width:300px">
        <strong style="font-size:14px">Router Link Card</strong>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:8px 0 0">Renders as RouterLink when available (Nuxt/Vue Router).</p>
      </ClickableCard>
    `,
  }),
}
