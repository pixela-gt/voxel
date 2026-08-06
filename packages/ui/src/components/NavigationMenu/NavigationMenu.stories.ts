import type { Meta, StoryObj } from '@storybook/vue3'
import NavigationMenu from './NavigationMenu.vue'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    value: 'products',
    label: 'Products',
    items: [
      { value: 'product-a', label: 'Product A', description: 'First product', href: '#' },
      { value: 'product-b', label: 'Product B', description: 'Second product', href: '#' },
    ],
  },
  {
    value: 'resources',
    label: 'Resources',
    items: [
      { value: 'docs', label: 'Documentation', href: '#' },
      { value: 'blog', label: 'Blog', href: '#' },
    ],
  },
  { value: 'pricing', label: 'Pricing', href: '#' },
  { value: 'about', label: 'About', href: '#' },
]

const template = (args: any) => ({
  components: { NavigationMenu },
  setup() { return { args, items } },
  template: '<NavigationMenu v-bind="args" :items="items" />',
})

export const Default: Story = { args: { orientation: 'horizontal' }, render: template }
export const Vertical: Story = { args: { orientation: 'vertical' }, render: template }
export const Minimal: Story = {
  args: {},
  render: () => ({
    components: { NavigationMenu },
    setup() {
      return { items: [{ value: 'home', label: 'Home', href: '#' }, { value: 'about', label: 'About', href: '#' }] }
    },
    template: '<NavigationMenu :items="items" />',
  }),
}
