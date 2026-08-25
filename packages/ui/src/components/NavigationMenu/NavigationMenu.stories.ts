import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
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

// Regression guard for BUG-003: the panel must anchor to whichever trigger
// opened it (previously it rendered at a fixed offset from the menu root).
export const AnchorsToTrigger: Story = {
  args: { orientation: 'horizontal' },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const productsTrigger = canvas.getByRole('button', { name: /products/i })
    await userEvent.hover(productsTrigger)

    const panel = await within(document.body).findByText('Product A')
    const panelBox = panel.closest('.voxel-navigation-menu__content')!.getBoundingClientRect()
    const triggerBox = productsTrigger.getBoundingClientRect()
    const viewport = panel.closest('.voxel-navigation-menu__viewport') as HTMLElement

    // The shared viewport must be sized/positioned via reka's CSS vars so that
    // it sits under the active trigger — not stretched across the whole bar.
    expect(viewport.style.getPropertyValue('--reka-navigation-menu-viewport-width')).toBeTruthy()
    expect(panelBox.left).toBeGreaterThanOrEqual(triggerBox.left - viewport.offsetWidth)
    expect(panelBox.right).toBeLessThanOrEqual(triggerBox.right + viewport.offsetWidth + 1)

    // Switching triggers moves the anchored panel.
    await userEvent.hover(canvas.getByRole('button', { name: /resources/i }))
    expect(await within(document.body).findByText('Documentation')).toBeTruthy()

    await userEvent.keyboard('{Escape}')
  },
}
