import type { Meta, StoryObj } from '@storybook/vue3'
import Avatar from './Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Content/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    style: { control: 'select', options: ['default', 'main'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Main: Story = { args: { style: 'main' } }
export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=12', alt: 'User avatar' },
}
export const MainWithImage: Story = {
  args: { style: 'main', src: 'https://i.pravatar.cc/150?img=32', alt: 'User avatar' },
}
export const WithInitials: Story = {
  args: {},
  render: () => ({
    components: { Avatar },
    template: '<Avatar><span style="color:white;font-size:11px;font-weight:600">JD</span></Avatar>',
  }),
}
