import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Skeleton from './Skeleton.vue'

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rect', 'text', 'circle'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    count: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Rect: Story = {}
export const Text: Story = { args: { variant: 'text' } }
export const Circle: Story = { args: { variant: 'circle' } }
export const MultipleText: Story = { args: { variant: 'text', count: 3 } }
export const MultipleRect: Story = { args: { variant: 'rect', count: 4 } }
export const CustomSize: Story = { args: { width: '200px', height: '40px' } }
export const CircleWithSize: Story = { args: { variant: 'circle', width: '64px', height: '64px' } }
export const CardSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div style="width:300px;border:1px solid var(--color-surface-light);border-radius:8px;padding:16px;display:flex;flex-direction:column;gap:12px">
        <Skeleton variant="rect" height="180px" />
        <Skeleton variant="text" :count="3" />
      </div>
    `,
  }),
}
