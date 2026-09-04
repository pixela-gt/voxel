import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
    leading: { control: 'boolean' },
    trailing: { control: 'boolean' },
  },
  args: {
    separator: '/',
    leading: true,
    trailing: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Breadcrumb, BreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem active>Widget</BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
}

export const CustomSeparator: Story = {
  args: { separator: '>' },
  render: (args) => ({
    components: { Breadcrumb, BreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem active>Widget</BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
}

export const NoLeadingSeparator: Story = {
  args: { leading: false },
  render: (args) => ({
    components: { Breadcrumb, BreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem active>Widget</BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
}

export const NoTrailingSeparator: Story = {
  args: { trailing: false },
  render: (args) => ({
    components: { Breadcrumb, BreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem active>Widget</BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
}

export const NoLeadingOrTrailing: Story = {
  args: { leading: false, trailing: false },
  render: (args) => ({
    components: { Breadcrumb, BreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem active>Widget</BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
}

export const RouterLinks: Story = {
  render: (args) => ({
    components: { Breadcrumb, BreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/products">Products</BreadcrumbItem>
        <BreadcrumbItem active>Widget</BreadcrumbItem>
      </Breadcrumb>
    `,
  }),
}
