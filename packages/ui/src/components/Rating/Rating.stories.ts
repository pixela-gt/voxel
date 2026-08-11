import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import Rating from './Rating.vue'

const meta: Meta<typeof Rating> = {
  title: 'Forms/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 0, max: 10 } },
    defaultValue: { control: { type: 'number', min: 0, max: 10 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Rating },
  setup() {
    const value = ref(args.modelValue ?? args.defaultValue ?? 0)
    return { args, value }
  },
  template: '<Rating v-bind="args" v-model="value" />',
})

export const Default: Story = { args: { modelValue: 3 }, render: template }
export const Empty: Story = { args: { modelValue: 0 }, render: template }
export const Full: Story = { args: { modelValue: 5 }, render: template }
export const Max10: Story = { args: { modelValue: 7, max: 10 }, render: template }
export const Disabled: Story = { args: { modelValue: 4, disabled: true }, render: template }
export const Small: Story = { args: { modelValue: 3, size: 'small' }, render: template }
export const Large: Story = { args: { modelValue: 3, size: 'large' }, render: template }

export const Interactive: Story = {
  args: { modelValue: 0, max: 5 },
  render: template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const items = canvas.getAllByRole('radio')
    await userEvent.click(items[2])
    await expect(items[2]).toHaveAttribute('data-state', 'active')
  },
}
