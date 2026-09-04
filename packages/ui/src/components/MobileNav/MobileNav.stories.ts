import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MobileNav from './MobileNav.vue'
import MobileNavToggle from './MobileNavToggle.vue'

const meta: Meta<typeof MobileNav> = {
  title: 'Navigation/MobileNav',
  component: MobileNav,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    breakpoint: { control: 'text' },
    width: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { MobileNav, MobileNavToggle },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <MobileNavToggle @click="open = !open" />
        <MobileNav title="Navigation" breakpoint="9999px" v-model:open="open">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0;"><a href="#">Home</a></li>
              <li style="padding: 8px 0;"><a href="#">Products</a></li>
              <li style="padding: 8px 0;"><a href="#">About</a></li>
              <li style="padding: 8px 0;"><a href="#">Contact</a></li>
            </ul>
          </nav>
        </MobileNav>
      </div>
    `,
  }),
}

export const WithCustomWidth: Story = {
  render: () => ({
    components: { MobileNav, MobileNavToggle },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <MobileNavToggle @click="open = !open" />
        <MobileNav title="Navigation" width="300px" breakpoint="9999px" v-model:open="open">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0;"><a href="#">Home</a></li>
              <li style="padding: 8px 0;"><a href="#">Products</a></li>
              <li style="padding: 8px 0;"><a href="#">About</a></li>
            </ul>
          </nav>
        </MobileNav>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { MobileNav, MobileNavToggle },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <MobileNavToggle @click="open = !open" />
        <MobileNav title="Navigation" breakpoint="9999px" v-model:open="open">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0;"><a href="#">Home</a></li>
              <li style="padding: 8px 0;"><a href="#">Products</a></li>
              <li style="padding: 8px 0;"><a href="#">About</a></li>
            </ul>
          </nav>
          <template #footer>
            <button style="padding: 8px 16px; background: var(--color-primary-base); color: white; border: none; border-radius: 6px; cursor: pointer;">
              Sign Out
            </button>
          </template>
        </MobileNav>
      </div>
    `,
  }),
}
