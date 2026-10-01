import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarGroup from './AvatarGroup.vue'

const meta: Meta<typeof AvatarGroup> = {
  title: 'Content/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    max: { control: 'number' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const avatars = [
  { name: 'Alice Johnson' },
  { name: 'Bob Smith' },
  { name: 'Carol Williams' },
  { name: 'David Brown' },
  { name: 'Eve Davis' },
  { name: 'Frank Miller' },
  { name: 'Grace Wilson' },
]

export const Default: Story = {
  args: { items: avatars.slice(0, 3) },
}

export const WithOverflow: Story = {
  args: { items: avatars, max: 3 },
}

export const MaxTwo: Story = {
  args: { items: avatars, max: 2 },
}

export const Small: Story = {
  args: { items: avatars.slice(0, 4), max: 4, size: 'small' },
}

export const Large: Story = {
  args: { items: avatars.slice(0, 4), max: 4, size: 'large' },
}

export const CircleShape: Story = {
  args: {
    items: avatars.slice(0, 4).map(a => ({ ...a, shape: 'circle' as const })),
    max: 4,
  },
}

export const WithStatus: Story = {
  args: {
    items: [
      { name: 'Alice', status: 'online' as const },
      { name: 'Bob', status: 'away' as const },
      { name: 'Carol', status: 'busy' as const },
      { name: 'David', status: 'offline' as const },
    ],
    max: 4,
  },
}

export const WithImages: Story = {
  args: {
    items: [
      { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
      { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
      { src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
      { src: 'https://i.pravatar.cc/150?img=4', alt: 'User 4' },
      { src: 'https://i.pravatar.cc/150?img=5', alt: 'User 5' },
    ],
    max: 3,
  },
}
