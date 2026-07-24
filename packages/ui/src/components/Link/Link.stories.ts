import type { Meta, StoryObj } from '@storybook/vue3'
import { ExternalLink, ArrowRight } from '@lucide/vue'
import Link from './Link.vue'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    style: { control: 'select', options: ['default', 'underlined'] },
    color: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    density: { control: 'select', options: ['default', 'dense'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const text = (t: string) => (args: any) => ({
  components: { Link },
  setup() { return { args } },
  template: `<Link v-bind="args" href="#">${t}</Link>`,
})

export const Default: Story = { render: text('Link') }
export const Underlined: Story = { args: { style: 'underlined' }, render: text('Underlined link') }
export const Secondary: Story = { args: { color: 'secondary' }, render: text('Secondary') }
export const Small: Story = { args: { size: 'small' }, render: text('Small link') }
export const Large: Story = { args: { size: 'large' }, render: text('Large link') }
export const Disabled: Story = { args: { disabled: true }, render: text('Disabled') }
export const WithIcon: Story = { args: { icon: ExternalLink }, render: text('External') }
export const WithTrailingIcon: Story = { args: { icon: ArrowRight }, render: text('Continue') }
