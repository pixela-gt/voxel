import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TopNav from './TopNav.vue'
import TopNavItem from './TopNavItem.vue'
import TopNavHeading from './TopNavHeading.vue'

const meta: Meta<typeof TopNav> = {
  title: 'Navigation/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'boxy'] },
    dense: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    dense: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { TopNav, TopNavItem, TopNavHeading },
    setup() {
      return { args }
    },
    template: `
      <TopNav v-bind="args">
        <template #start>
          <TopNavHeading>My App</TopNavHeading>
        </template>
        <TopNavItem href="/" active>Home</TopNavItem>
        <TopNavItem href="/products">Products</TopNavItem>
        <TopNavItem href="/about">About</TopNavItem>
        <template #end>
          <TopNavItem href="/login">Login</TopNavItem>
        </template>
      </TopNav>
    `,
  }),
}

export const Boxy: Story = {
  args: { variant: 'boxy' },
  render: (args) => ({
    components: { TopNav, TopNavItem, TopNavHeading },
    setup() {
      return { args }
    },
    template: `
      <TopNav v-bind="args">
        <template #start>
          <TopNavHeading>My App</TopNavHeading>
        </template>
        <TopNavItem href="/" active>Home</TopNavItem>
        <TopNavItem href="/products">Products</TopNavItem>
        <TopNavItem href="/about">About</TopNavItem>
        <template #end>
          <TopNavItem href="/login">Login</TopNavItem>
        </template>
      </TopNav>
    `,
  }),
}

export const Dense: Story = {
  args: { dense: true },
  render: (args) => ({
    components: { TopNav, TopNavItem, TopNavHeading },
    setup() {
      return { args }
    },
    template: `
      <TopNav v-bind="args">
        <template #start>
          <TopNavHeading>My App</TopNavHeading>
        </template>
        <TopNavItem href="/" active>Home</TopNavItem>
        <TopNavItem href="/products">Products</TopNavItem>
        <TopNavItem href="/about">About</TopNavItem>
        <template #end>
          <TopNavItem href="/login">Login</TopNavItem>
        </template>
      </TopNav>
    `,
  }),
}

export const BoxyDense: Story = {
  args: { variant: 'boxy', dense: true },
  render: (args) => ({
    components: { TopNav, TopNavItem, TopNavHeading },
    setup() {
      return { args }
    },
    template: `
      <TopNav v-bind="args">
        <template #start>
          <TopNavHeading>My App</TopNavHeading>
        </template>
        <TopNavItem href="/" active>Home</TopNavItem>
        <TopNavItem href="/products">Products</TopNavItem>
        <TopNavItem href="/about">About</TopNavItem>
        <template #end>
          <TopNavItem href="/login">Login</TopNavItem>
        </template>
      </TopNav>
    `,
  }),
}

export const WithRouterLinks: Story = {
  render: (args) => ({
    components: { TopNav, TopNavItem, TopNavHeading },
    setup() {
      return { args }
    },
    template: `
      <TopNav v-bind="args">
        <template #start>
          <TopNavHeading>My App</TopNavHeading>
        </template>
        <TopNavItem to="/" active>Home</TopNavItem>
        <TopNavItem to="/products">Products</TopNavItem>
        <TopNavItem to="/about">About</TopNavItem>
        <template #end>
          <TopNavItem to="/login">Login</TopNavItem>
        </template>
      </TopNav>
    `,
  }),
}

export const WithActions: Story = {
  render: (args) => ({
    components: { TopNav, TopNavItem, TopNavHeading },
    setup() {
      return { args }
    },
    template: `
      <TopNav v-bind="args">
        <template #start>
          <TopNavHeading>My App</TopNavHeading>
        </template>
        <TopNavItem href="/" active>Home</TopNavItem>
        <TopNavItem href="/products">Products</TopNavItem>
        <TopNavItem href="/about">About</TopNavItem>
        <template #end>
          <button style="padding: 8px 16px; background: var(--color-primary-base); color: white; border: none; border-radius: 6px; cursor: pointer;">
            Sign Up
          </button>
        </template>
      </TopNav>
    `,
  }),
}
