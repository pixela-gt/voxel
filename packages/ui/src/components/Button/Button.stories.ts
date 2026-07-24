import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { ArrowLeft, ArrowRight, Clock } from '@lucide/vue'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    buttonStyle: {
      control: 'select',
      options: ['default', 'outline', 'tonal', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    density: {
      control: 'select',
      options: ['default', 'dense'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const render = (label: string) => (args: any) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: `<Button v-bind="args">${label}</Button>`,
})

export const Default: Story = { render: render('Button') }
export const Outline: Story = { args: { buttonStyle: 'outline' }, render: render('Outline') }
export const Tonal: Story = { args: { buttonStyle: 'tonal' }, render: render('Tonal') }
export const Text: Story = { args: { buttonStyle: 'text' }, render: render('Text') }
export const Secondary: Story = { args: { color: 'secondary' }, render: render('Secondary') }
export const Small: Story = { args: { size: 'small' }, render: render('Small') }
export const Large: Story = { args: { size: 'large' }, render: render('Large') }
export const Disabled: Story = { args: { disabled: true }, render: render('Disabled') }
export const Loading: Story = { args: { loading: true }, render: render('Loading') }

export const WithPrependIcon: Story = {
  args: { prependIcon: ArrowLeft },
  render: render('Back'),
}

export const WithAppendIcon: Story = {
  args: { appendIcon: ArrowRight },
  render: render('Next'),
}

export const WithBothIcons: Story = {
  args: { prependIcon: Clock, appendIcon: ArrowRight },
  render: render('Schedule'),
}

export const InteractiveClick: Story = {
  args: { disabled: false, loading: false },
  render: render('Click me'),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })
    await expect(button).toBeEnabled()
    await userEvent.click(button)
  },
}
