import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import { Bold, Heart, Star } from '@lucide/vue'
import Toggle from './Toggle.vue'

const meta: Meta<typeof Toggle> = {
  title: 'Action/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    variant: { control: 'select', options: ['button', 'icon-button'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (label: string) => (args: any) => ({
  components: { Toggle },
  setup() {
    const value = ref(args.modelValue)
    return { args, value }
  },
  template: `<Toggle v-bind="args" v-model="value">${label}</Toggle>`,
})

export const Default: Story = { render: template('Toggle') }
export const Pressed: Story = { args: { modelValue: true }, render: template('Pressed') }
export const Disabled: Story = { args: { disabled: true }, render: template('Disabled') }
export const Small: Story = { args: { size: 'small' }, render: template('Small') }
export const Large: Story = { args: { size: 'large' }, render: template('Large') }

export const WithIcon: Story = {
  render: () => ({
    components: { Toggle, Bold },
    setup() {
      const value = ref(false)
      return { value, Bold }
    },
    template: '<Toggle v-model="value"><Bold :size="14" />Bold</Toggle>',
  }),
}

export const Icon: Story = {
  render: () => ({
    components: { Toggle, Heart },
    setup() {
      const value = ref(false)
      return { value, Heart }
    },
    template: '<Toggle v-model="value" variant="icon-button"><Heart :size="18" /></Toggle>',
  }),
}

export const IconPressed: Story = {
  render: () => ({
    components: { Toggle, Heart },
    setup() {
      const value = ref(true)
      return { value, Heart }
    },
    template: '<Toggle v-model="value" variant="icon-button"><Heart :size="18" /></Toggle>',
  }),
}

export const Interactive: Story = {
  render: template('Click me'),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole('button', { name: 'Click me' })
    await expect(btn).toHaveAttribute('data-state', 'off')
    await userEvent.click(btn)
    await expect(btn).toHaveAttribute('data-state', 'on')
  },
}
