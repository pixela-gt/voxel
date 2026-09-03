import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import NavigationMenu from './NavigationMenu.vue'
import NavigationMenuList from './NavigationMenuList.vue'
import NavigationMenuItem from './NavigationMenuItem.vue'
import NavigationMenuTrigger from './NavigationMenuTrigger.vue'
import NavigationMenuContent from './NavigationMenuContent.vue'
import NavigationMenuLink from './NavigationMenuLink.vue'

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

export const Default: Story = {
  args: { orientation: 'horizontal' },
  render: () => ({
    components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink },
    template: `
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="voxel-navigation-menu__sub-list">
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Product A</div>
                  </NavigationMenuLink>
                </li>
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Product B</div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="voxel-navigation-menu__sub-list">
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Documentation</div>
                  </NavigationMenuLink>
                </li>
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Blog</div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" class="voxel-navigation-menu__link--inline">
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    `,
  }),
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: () => ({
    components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink },
    template: `
      <NavigationMenu orientation="vertical">
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="voxel-navigation-menu__sub-list">
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Product A</div>
                  </NavigationMenuLink>
                </li>
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Product B</div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" class="voxel-navigation-menu__link--inline">
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    `,
  }),
}

export const Minimal: Story = {
  render: () => ({
    components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink },
    template: `
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    `,
  }),
}

// Regression guard for BUG-003: the panel must anchor to whichever trigger
// opened it (previously it rendered at a fixed offset from the menu root).
export const AnchorsToTrigger: Story = {
  args: { orientation: 'horizontal' },
  render: () => ({
    components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink },
    template: `
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="voxel-navigation-menu__sub-list">
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Product A</div>
                  </NavigationMenuLink>
                </li>
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Product B</div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="voxel-navigation-menu__sub-list">
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Documentation</div>
                  </NavigationMenuLink>
                </li>
                <li class="voxel-navigation-menu__sub-item">
                  <NavigationMenuLink href="#">
                    <div class="voxel-navigation-menu__link-label">Blog</div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const productsTrigger = canvas.getByRole('button', { name: /products/i })
    await userEvent.hover(productsTrigger)

    const panel = await within(document.body).findByText('Product A')
    // Wait for viewport to measure content (async via requestAnimationFrame)
    await new Promise(r => setTimeout(r, 500))
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
