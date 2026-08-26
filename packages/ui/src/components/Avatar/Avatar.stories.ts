import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor, within } from 'storybook/test'
import Avatar from './Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Content/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    style: { control: 'select', options: ['default', 'main'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    shape: { control: 'select', options: ['rounded', 'circle'] },
    name: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'error', 'warning', 'neutral'],
    },
    status: { control: 'select', options: ['online', 'away', 'busy', 'offline'] },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'Jane Doe', status: 'online' },
}
export const Main: Story = {
  args: { style: 'main', name: 'John Smith' },
}
export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=12', alt: 'User avatar' },
}
export const MainWithImage: Story = {
  args: {
    style: 'main',
    src: 'https://i.pravatar.cc/150?img=32',
    alt: 'User avatar',
    status: 'away',
  },
}
export const WithSlotContent: Story = {
  args: {},
  render: () => ({
    components: { Avatar },
    template: '<Avatar><span class="text-[11px] font-semibold text-white">JD</span></Avatar>',
  }),
}

export const Circles: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Grace Hopper" shape="circle" />
        <Avatar src="https://i.pravatar.cc/150?img=5" alt="Circle avatar" shape="circle" />
        <Avatar name="Alan Turing" shape="circle" style="main" />
      </div>
    `,
  }),
}

export const SizesMatrix: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Ada Lovelace" size="small" shape="circle" />
        <Avatar name="Ada Lovelace" size="default" shape="circle" />
        <Avatar name="Ada Lovelace" size="large" shape="circle" />
      </div>
    `,
  }),
}

export const LetterAvatars: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Cher" />
        <Avatar name="maria goeppert mayer" />
      </div>
    `,
  }),
}

export const ColorOverride: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Ada Lovelace" color="error" />
        <Avatar name="Ada Lovelace" color="secondary" />
        <Avatar name="Ada Lovelace" color="neutral" />
      </div>
    `,
  }),
}

export const StatusDots: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Online User" status="online" />
        <Avatar name="Away User" status="away" />
        <Avatar name="Busy User" status="busy" />
        <Avatar name="Offline User" status="offline" />
      </div>
    `,
  }),
}

export const FallbackChain: Story = {
  args: {
    src: 'https://broken.example.com/nope.jpg',
    name: 'Fallback User',
    alt: 'Broken image',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(() => expect(canvas.getByText('FU')).toBeInTheDocument())
  },
}

export const NoNameFallsBackToIcon: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvasElement.querySelector('.voxel-avatar__icon')).toBeInTheDocument()
    expect(canvas.queryByText(/^[A-Z]{1,2}$/)).toBeNull()
  },
}

export const NoStatusRendersNoDot: Story = {
  args: { name: 'No Status' },
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelector('.voxel-avatar__status')).toBeNull()
  },
}

export const DeterministicColor: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div>
        <Avatar name="Same Name" data-testid="a1" />
        <Avatar name="Same Name" data-testid="a2" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const first = canvasElement.querySelector('[data-testid="a1"] .voxel-avatar__fallback')
    const second = canvasElement.querySelector('[data-testid="a2"] .voxel-avatar__fallback')
    await expect(first?.className).toBe(second?.className)
  },
}
