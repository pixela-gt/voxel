import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Kbd from './Kbd.vue'

const meta: Meta<typeof Kbd> = {
  title: 'Content/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { Kbd },
    template: `<Kbd>K</Kbd>`,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex items-center gap-2">
        <Kbd size="small">A</Kbd>
        <Kbd size="default">B</Kbd>
        <Kbd size="large">C</Kbd>
      </div>
    `,
  }),
}

export const Combo: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex items-center gap-1">
        <Kbd>Ctrl</Kbd>
        <span class="text-[var(--color-text-secondary)]">+</span>
        <Kbd>K</Kbd>
      </div>
    `,
  }),
}

export const CmdCombo: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex items-center gap-1">
        <Kbd>Cmd</Kbd>
        <span class="text-[var(--color-text-secondary)]">+</span>
        <Kbd>Shift</Kbd>
        <span class="text-[var(--color-text-secondary)]">+</span>
        <Kbd>P</Kbd>
      </div>
    `,
  }),
}
