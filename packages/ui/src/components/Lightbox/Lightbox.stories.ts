import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Lightbox } from './index'

const meta: Meta<typeof Lightbox> = {
  title: 'Overlays/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    src: { control: 'text' },
    alt: { control: 'text' },
    caption: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const placeholder = (w: number, h: number, color: string, text: string) =>
  `https://placehold.co/${w}x${h}/${color.replace('#', '')}/ffffff?text=${encodeURIComponent(text)}`

export const SingleImage: Story = {
  render: () => ({
    components: { Lightbox },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button
          @click="open = true"
          style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer"
        >
          Open lightbox
        </button>
        <Lightbox
          v-model:open="open"
          src="${placeholder(800, 600, '#6366f1', 'Lightbox')}"
          alt="Sample image"
        />
      </div>
    `,
  }),
}

export const Gallery: Story = {
  render: () => ({
    components: { Lightbox },
    setup() {
      const open = ref(false)
      const images = [
        { src: placeholder(800, 600, '#6366f1', '1'), alt: 'First image', caption: 'First image caption' },
        { src: placeholder(800, 600, '#8b5cf6', '2'), alt: 'Second image', caption: 'Second image caption' },
        { src: placeholder(800, 600, '#a855f7', '3'), alt: 'Third image', caption: 'Third image caption' },
      ]
      return { open, images }
    },
    template: `
      <div>
        <button
          @click="open = true"
          style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer"
        >
          Open gallery
        </button>
        <Lightbox v-model:open="open" :images="images" />
      </div>
    `,
  }),
}

export const OpenByDefault: Story = {
  render: () => ({
    components: { Lightbox },
    template: `
      <Lightbox
        :default-open="true"
        src="${placeholder(800, 600, '#8b5cf6', 'Open')}"
        alt="Already open"
        caption="Lightbox open by default"
      />
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { Lightbox },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button
          @click="open = !open"
          style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer"
        >
          {{ open ? 'Close' : 'Open' }} lightbox
        </button>
        <Lightbox
          v-model:open="open"
          src="${placeholder(800, 600, '#a855f7', 'Controlled')}"
          alt="Controlled lightbox"
        />
      </div>
    `,
  }),
}

export const WithCaption: Story = {
  render: () => ({
    components: { Lightbox },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button
          @click="open = true"
          style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer"
        >
          Open with caption
        </button>
        <Lightbox
          v-model:open="open"
          src="${placeholder(800, 600, '#d946ef', 'Caption')}"
          alt="Image with caption"
          caption="This is a descriptive caption for the image shown in the lightbox."
        />
      </div>
    `,
  }),
}
