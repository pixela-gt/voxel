import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AspectRatio from './AspectRatio.vue'

const meta: Meta<typeof AspectRatio> = {
  title: 'Surfaces/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: { type: 'number', min: 0.1, max: 4, step: 0.1 } },
    preset: { control: 'select', options: ['square', 'video', 'photo', 'portrait', 'wide'] },
    asChild: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const frame = 'w-72 rounded-lg bg-[var(--color-surface-light)] overflow-hidden'

const img = (seed: string, w = 640, h = 360) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const Square: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio preset="square" class="${frame}">
        <img src="${img('voxel-square', 480, 480)}" alt="Square sample" class="size-full object-cover" />
      </AspectRatio>
    `,
  }),
}

export const Video: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio preset="video" class="w-96 rounded-lg overflow-hidden">
        <img src="${img('voxel-video')}" alt="Video sample" class="size-full object-cover" />
      </AspectRatio>
    `,
  }),
}

export const Photo: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio preset="photo" class="w-80 rounded-lg overflow-hidden">
        <img src="${img('voxel-photo', 640, 480)}" alt="Photo sample" class="size-full object-cover" />
      </AspectRatio>
    `,
  }),
}

export const Portrait: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio preset="portrait" class="w-56 rounded-lg overflow-hidden">
        <img src="${img('voxel-portrait', 480, 640)}" alt="Portrait sample" class="size-full object-cover" />
      </AspectRatio>
    `,
  }),
}

export const Wide: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio preset="wide" class="w-[28rem] rounded-lg overflow-hidden">
        <img src="${img('voxel-wide', 840, 360)}" alt="Wide sample" class="size-full object-cover" />
      </AspectRatio>
    `,
  }),
}

export const ArbitraryRatio: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio :ratio="1.618" class="w-80 rounded-lg overflow-hidden">
        <div class="size-full grid place-items-center text-[var(--color-text-secondary)] text-xs">ratio 1.618</div>
      </AspectRatio>
    `,
  }),
}

export const NumericWinsOverPreset: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio preset="video" :ratio="1" class="w-64 rounded-lg overflow-hidden">
        <div class="size-full grid place-items-center text-[var(--color-text-secondary)] text-xs">preset video + ratio 1 → square</div>
      </AspectRatio>
    `,
  }),
}

export const AsChild: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <AspectRatio asChild preset="video" class="w-96 rounded-lg overflow-hidden">
        <img src="${img('voxel-aschild')}" alt="asChild applied directly to img" class="w-full object-cover" />
      </AspectRatio>
    `,
  }),
}
