import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AspectRatio from './AspectRatio.vue'

const meta: Meta<typeof AspectRatio> = {
  title: 'Surfaces/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: { type: 'number', min: 0.1, max: 4, step: 0.1 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sample = (ratio: number) => ({
  components: { AspectRatio },
  setup() { return { ratio } },
  template: `
    <AspectRatio :ratio="ratio" style="width:280px;background:var(--color-grey-200);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary);font-size:12px">
      {{ ratio }}
    </AspectRatio>
  `,
})

export const Default: Story = {
  args: { ratio: 1 },
  render: () => sample(1),
}
export const Square: Story = { args: { ratio: 1 }, render: () => sample(1) }
export const Wide: Story = { args: { ratio: 16 / 9 }, render: () => sample(16 / 9) }
export const Standard: Story = { args: { ratio: 4 / 3 }, render: () => sample(4 / 3) }
export const Portrait: Story = { args: { ratio: 3 / 4 }, render: () => sample(3 / 4) }
